import React from 'react'
import { shallow } from 'enzyme'
import Lapses from './Lapses'

function setup(lapses = []) {
  const actions = {
    lapses
  }
  const component = shallow(
    <Lapses {...actions} />
  )

  return {
    div: component.find('div')
  }
}

describe('Lapses component', () => {
  it('should display empty lapses', () => {
    const { div } = setup()
    expect(div.length).toEqual(0)
  })

  it('should display list of lapses in a table', () => {
    const { div } = setup([{id: 1, lapTime: 0, mainTime: 0}, {id: 2, lapTime: 1000000, mainTime: 1000000}])
    expect(div.find('table tr').length).toEqual(2)

  })

})