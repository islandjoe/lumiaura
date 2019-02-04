import React from 'react'
import '../../layout/AreaSearch.css'

const fromLoc =(props)=> {
  return (
    <div className="ui left icon input">
      <input type="text" placeholder="From..." />
      <i className="users icon"></i>
    </div>
  )
}

export default fromLoc