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
    actions: actions,
    div: component.find('div')
  }
}

describe('Timer component', () => {
  it('should display timeElapsed', () => {
    const { div } = setup()
    expect(div.text()).toEqual('00:00.00')
    expect(div.prop('className')).toEqual('time')
  })
  it('should display large timeElapsed', () => {
    const { div } = setup(true)
    expect(div.prop('className')).toEqual('time main')
  })
})