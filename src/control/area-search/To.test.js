import React from 'react'
import renderer from 'react-test-renderer'
import To from './To'

describe('<To/>', ()=> {
  test('should render', ()=> {
    const c = renderer
      .create(<To/>)
      .toJSON()

    expect(c).toMatchSnapshot()
  })
})