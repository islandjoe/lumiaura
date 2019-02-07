import React from 'react'
import renderer from 'react-test-renderer'
import {configure, shallow, render, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AreaSearch from './AreaSearch'

configure({ adapter: new Adapter() })

describe('<AreaSearch/>', ()=> {
  test('should render', ()=> {
    const tree = renderer
      .create(<AreaSearch/>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})