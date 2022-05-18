import { useContext, createContext, useState, ReactElement } from 'react'
import PropTypes from 'prop-types'
import { MessagePending } from '../../../generated/graphql'
import useWallet from '../../../services/WalletProvider/useWallet'

export const PendingMsgContext = createContext<{
  messages: MessagePending[]
  pushPendingMessage: (msg: MessagePending) => void
  clearPendingMessage: (cid: string) => void
}>({
  messages: [],
  pushPendingMessage: () => {},
  clearPendingMessage: () => {}
})

type Address = string

export const PendingMessageProvider = ({
  children
}: {
  children: ReactElement
}) => {
  const [messages, setMessages] = useState<Record<Address, MessagePending[]>>(
    {}
  )

  const { address } = useWallet() as { address: Address }

  const messagesByAddress = messages?.[address] || []
  return (
    <PendingMsgContext.Provider
      value={{
        messages: messagesByAddress,
        pushPendingMessage: (msg: MessagePending) => {
          setMessages(msgs => ({
            ...msgs,
            [address]: [...messagesByAddress, msg]
          }))
        },
        clearPendingMessage: (cid: string) => {
          setMessages(msgs => ({
            ...msgs,
            [address]: messagesByAddress.filter(m => m.cid !== cid)
          }))
        }
      }}
    >
      {children}
    </PendingMsgContext.Provider>
  )
}

PendingMessageProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useSubmittedMessages = () => {
  return useContext(PendingMsgContext)
}
