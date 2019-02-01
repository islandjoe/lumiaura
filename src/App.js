import React, { Component } from 'react';
import {render} from 'react-dom'
import {Map, TileLayer} from  'react-leaflet'
// import SearchPanel from './control/SearchPanel'
// import Mapr from './control/Mapr'

import './App.css';

const tonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png'
const tonerAttrb = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const mapCenter = [39.9528, -75.1638]
const zoomLevel = 12

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map center={mapCenter}
            zoom={zoomLevel}>
          <TileLayer attribution={tonerAttrb} url={tonerTiles} />
        </Map>
      </div>
    );
  }
}

export default App;
