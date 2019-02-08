import React from 'react'
import '../../layout/JobType.css'

const toLoc =(props)=> {
  return (
    <div className="ui input">
      <input
          type="text"
          placeholder="To..."
          onKeyPress={ props.locationTo } />
    </div>
  )
}

export default toLoc