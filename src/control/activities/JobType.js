import React from 'react'

import '../../layout/JobType.css'

const jobtype =(props)=> {
  return (
    <label className="JobType ui label">
      <input type="checkbox"
          className="ui checkbox"
            value={ props.type }
              onChange={(e)=>  props.selectJob(e.target.value) } />
        { props.label  }
    </label>
  )
}

export default jobtype