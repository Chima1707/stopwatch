import React from 'react'
import PropTypes from 'prop-types'

const formatElapsedTime = require('format-elapsed-time')
const Lapses = ({lapses}) => {
  if (!lapses.length) {
    return null
  }
  const sortedLapses = lapses.slice().sort((a, b) => b.id - a.id)
  return (
    <div className='center-contents'>
      <table>
        <tbody>
          {
          sortedLapses.map(({id, lapTime, mainTime}, index) => {
            const num = sortedLapses.length - 1 - index
            return (<tr key={id}>
              <td>{'0' + num}</td>
              <td>{formatElapsedTime(lapTime)} </td>
              <td>{formatElapsedTime(mainTime)} </td>
            </tr>)
          }
            )
          }
        </tbody>
      </table>
    </div>
  )
}
Lapses.propTypes = {
  lapses: PropTypes.array.isRequired
}
export default Lapses
