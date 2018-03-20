import React from 'react'
import { shallow } from 'enzyme'
import Timer from './Timer'

function setup(main = false, timeElapsed = 0) {
  const actions = {
    timeElapsed,
    main
  }
  const component = shallow(
    <Timer {...actions} />
  )

  return {
    div: component.find('div')
  }
}

describe('Timer component', () => {
  it('should display small sized timer', () => {
    const { div } = setup()
    expect(div.text()).toEqual('00:00.00')
    expect(div.prop('className')).toEqual('time')
  })
  it('should display large sized timer', () => {
    const { div } = setup(true)
    expect(div.text()).toEqual('00:00.00')
    expect(div.prop('className')).toEqual('time main')
  })
})