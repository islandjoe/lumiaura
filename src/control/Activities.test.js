import React from 'react'
import renderer from 'react-test-renderer'
import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Activities from './Activities'

configure({ adapter: new Adapter() })

describe('<Activities/>', ()=> {

  test('should render', ()=> {
    const c = renderer
      .create(<Activities/>)
      .toJSON()

    expect(c).toMatchSnapshot()
  })

})