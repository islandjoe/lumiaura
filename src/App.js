import React, { Component } from 'react';
// import {render} from 'react-dom'
import {Map, TileLayer} from  'react-leaflet'
import {Sidebar, Tab} from 'react-leaflet-sidetabs'
import { FiHome, FiChevronRight, FiSearch, FiSettings } from 'react-icons/fi'
import SearchPanel from './control/SearchPanel'

import 'leaflet/dist/leaflet.css'
import './App.css'

const tonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png'
const tonerAttrb = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const mapCenter = [60.1713, 24.8280]
const zoomLevel = 12

class App extends Component {

  state = {
    collapsed: true,
    selected:'home'
  }

  onClose() {
    this.setState({collapsed: true});
  }

  onOpen(id) {
    this.setState({
      collapsed: false,
      selected: id,
    })
  }

  render() {
    return (
      <div className="App">
        <Sidebar
            id="sidebar"
            position="left"
            collapsed={this.state.collapsed}
            closeIcon={<FiChevronRight />}
            selected={this.state.selected}
            onOpen={this.onOpen.bind(this)}
            onClose={this.onClose.bind(this)}>
          <Tab
              id="search"
              header="Search" icon={<FiSearch />}>

            <SearchPanel />

          </Tab>
        </Sidebar>

        <Map
            className="mapStyle sidebar-map"
            center={mapCenter}
            zoom={zoomLevel}>
          <TileLayer
            attribution={tonerAttrb}
            url={tonerTiles}
          />
        </Map>
      </div>
    );
  }
}

export default App;
