import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Activities from '../Activities'
import JobType from  './JobType'

configure({ adapter: new Adapter() })

describe('<Activities/>', ()=> {
  it('should render 3', ()=> {
    const wrap = shallow(<Activities/>)

    expect(wrap.find(JobType)).toHaveLength(3)
  })
})