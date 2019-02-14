import React from 'react'
import '../../layout/AreaSearch.css'

const fromLoc =(props)=> {

  return (
    <div className="ui input">
      <input
          type="text"
          placeholder="From..."
          defaultValue={ props.address } />
    </div>
  )
}

export default fromLoc