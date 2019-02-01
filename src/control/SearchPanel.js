import React from 'react'
import AreaSearch from './AreaSearch'
import Activities from './Activities'

import '../layout/SearchPanel.css'

const searchpanel =(props)=> {
  return (
    <div>
      <AreaSearch />
      <Activities />
    </div>
  )
}

export default searchpanel