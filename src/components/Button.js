import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ show, onClick, text }) => (
  <button
    className='btn'
    onClick={onClick}
    style={{
      display: show ? 'block' : 'none'
    }}
    >
    {text}
  </button>
)

Button.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Button
