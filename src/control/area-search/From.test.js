import React from 'react'
import renderer from 'react-test-renderer'
import From from './From'

describe('<From/>', ()=> {
  test('should render', ()=> {
    const component = renderer
      .create(<From/>)
      .toJSON()

    expect(component).toMatchSnapshot()
  })
})