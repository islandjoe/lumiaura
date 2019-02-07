import React from 'react'
import JobType from './activities/JobType'
import '../layout/Activities.css'

const activities =(props)=> {
  return (
    <>
      <JobType type="road" label="Road"/>
      <JobType type="cycling" label="Bike Lanes"/>
      <JobType type="footpath" label="Pedestrian/Footpath"/>
    </>
  )
}

export default activities