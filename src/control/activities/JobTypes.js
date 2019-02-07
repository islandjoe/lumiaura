import React from 'react'

import '../../layout/JobTypes.css'

const jobtypes =(props)=> {
  return (
    <div className="ui checkbox">
      <label className="ui label">
      <input
        name="road"
          type="checkbox"
            tabIndex="1"/>
      Roads</label>

      <label className="ui label">
      <input className="ui checkbox"
        name="cycling"
          type="checkbox"
              tabIndex="2"/>
      Cycling Path</label>

      <label className="ui label">
      <input className="ui checkbox"
        name="jobtype"
          type="checkbox"
            tabIndex="3"/>
      Pedestrian/Foot Path</label>
    </div>
  )
}

export default jobtypes