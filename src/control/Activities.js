import React from 'react'
import JobType from './activities/JobType'
import '../layout/Activities.css'

const activities =(props)=> {
  return (
    <>
      <JobType selectJob={ props.selectJob  } type="road" label="Road"/>
      <JobType selectJob={ props.selectJob  }  type="cycling" label="Bike Lanes"/>
      <JobType selectJob={ props.selectJob  }  type="footpath" label="Pedestrian/Footpath"/>
    </>
  )
}

export default activities