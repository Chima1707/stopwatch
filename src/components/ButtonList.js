import React from 'react'
import ActionButton from '../containers/ActionButton'

const ButtonList = () => (
  <div className='center-contents'>
    <ActionButton text={'start'} />
    <ActionButton text={'resume'} />
    <ActionButton text={'reset'} />
    <ActionButton text={'stop'} />
    <ActionButton text={'lap'} />
  </div>
)

export default ButtonList
