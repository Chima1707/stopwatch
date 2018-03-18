import React from 'react'
import PropTypes from 'prop-types'
const formatElapsedTime = require('format-elapsed-time')

const Timer = ({ timeElapsed, main }) => (
  <div className={main ? 'time main' : 'time'}>
    {formatElapsedTime(timeElapsed)}
  </div>
)

Timer.propTypes = {
  timeElapsed: PropTypes.number.isRequired,
  main: PropTypes.bool
}

export default Timer
