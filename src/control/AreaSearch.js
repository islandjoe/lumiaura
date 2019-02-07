import React from 'react'
import From from './area-search/From'
import To from './area-search/To'

import '../layout/AreaSearch.css'

const areaSearch =(props)=> (
  <div className="AreaSearch">
    <From address={ props.home }/>
    <To />
  </div>
)

export default areaSearch