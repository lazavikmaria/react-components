import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { fontSize } from '../theme'

const ButtonV2 = styled.button`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  border-radius: ${props => (props.round ? '100px' : '8px')};

  ${props =>
    props.large &&
    css`
      font-size: ${fontSize('medium')};
      height: 56px;
      padding: 0 1.6em;
    `};

  ${props =>
    props.small &&
    css`
      font-size: ${fontSize('default')};
      height: auto;
      padding: 0.4em 1.6em;
    `};

  ${props =>
    props.black &&
    css`
      border: 1px solid black;
      background: white;
      color: black;

      ${!props.disabled &&
      `&:hover {
        color: ${props.theme.colors.core.primary};
        border-color: ${props.theme.colors.core.primary};
      }`}
    `};

  ${props =>
    props.white &&
    css`
      border: 1px solid white;
      color: white;
    `};

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: default;
    `}
`

ButtonV2.propTypes = {
  round: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  black: PropTypes.bool,
  white: PropTypes.bool
}

ButtonV2.defaultProps = {
  large: true,
  black: true
}

export default ButtonV2
