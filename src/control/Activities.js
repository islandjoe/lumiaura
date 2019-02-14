import React from 'react'
import JobType from './activities/JobType'
import '../layout/Activities.css'

const activities =(props)=> {
  const jobtypes = [
    {type: 'su', label: 'Road'},
    {type: 'kv', label: 'Cycling Paths'},
    {type: 'hi', label: 'Pedestrian/Footpaths'}
  ]

  return jobtypes.map(j=> (
    <JobType
        key={ j.type }
          type={ j.type }
            label={ j.label }
              selectJob={ props.selectJob } />
  ))
}

export default activities