import React from 'react'

import '../../layout/JobTypes.css'

const jobtypes =(props)=> {
  return (
    <div className="ui checkbox">
      <label>
      <input
        name="road"
          type="checkbox"
            className="hidden"
              readOnly=""
                tabIndex="0"/>
      Roads</label>

      <label>
      <input
        name="cycling"
        type="checkbox"
          className="hidden"
            readOnly=""
              tabIndex="0"/>
      Cycling Path</label>

      <label>
      <input
        name="jobtype"
        type="checkbox"
          className="hidden"
            readOnly=""
              tabIndex="0"/>
      Pedestrian/Foot Path</label>
    </div>
  )
}

export default jobtypes