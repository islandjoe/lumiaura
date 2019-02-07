import React from 'react'

import '../../layout/JobType.css'

const jobtype =(props)=> {
  return (

  <label className="JobType ui label">
    <input
        className="ui checkbox"
        name={ props.type }
        type="checkbox"/>
      { props.label  }
  </label>

  )
}

export default jobtype