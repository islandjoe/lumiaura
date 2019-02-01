import React from 'react'

import '../../layout/JobTypes.css'

const jobtypes =(props)=> {
  return (
    <fieldset className="JobTypes">
      <label>
      <input type="checkbox" name="jobtype" value="" /> Roads
      </label>
      <label>
      <input type="checkbox" name="jobtype" value="" /> Bike lanes
      <label>
      </label>
      <input type="checkbox" name="jobtype" value="" /> Pedestrian/foot paths
      </label>
    </fieldset>
  )
}

export default jobtypes