import React from 'react'
import JobType from './activities/JobType'
import Activities from '../layout/Activities.css'

const activities =(props)=> {
  return (
    <div className={Activities}>
      <JobType type="road" label="Roads"/>
      <JobType type="cycling" label="Cycling"/>
      <JobType type="footpath" label="Footpath"/>
    </div>
  )
}

export default activities