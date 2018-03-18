import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

function setup(text, show = true) {
  const actions = {
    show,
    text,
    onClick: jest.fn()
  }
  const component = shallow(
    <Button {...actions} />
  )

  return {
    actions: actions,
    button: component.find('button')
  }
}

describe('Button component', () => {
  it('should display button with right label', () => {
    const { button } = setup('start')
    expect(button.text()).toEqual('start')
  })

  it('should hide button', () => {
    const { button } = setup('start', false)
    expect(button.prop('style').display).toEqual('none')
  })

  it('should call action on button click', () => {
    const { button , actions} = setup('start')
    button.simulate('click')
    expect(actions.onClick).toBeCalled()
  })
})