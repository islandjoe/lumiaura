import React from 'react'
import '../../layout/JobTypes.css'

const toLoc =(props)=> {
  return (
    <div className="ui left icon input">
      <input type="text" placeholder="To..." />
      <i className="users icon"></i>
    </div>
  )
}

export default toLoc