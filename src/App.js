import React, { Component } from 'react';
import axios from 'axios'
import {Map, TileLayer, Marker} from  'react-leaflet'
import {Sidebar, Tab} from 'react-leaflet-sidetabs'
import { FiChevronRight, FiSearch } from 'react-icons/fi'
import SearchPanel from './control/SearchPanel'

import './App.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const tonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png'
const tonerAttrb = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const mapCenter = [60.1713, 24.8280]
const zoomLevel = 12

class App extends Component {

  state = {
    collapsed: true,
    selected:'home',
    address: '',
    coordTo: [],
    showMarkerTo: false
  }

  fetchLocn =(event)=> {
    if (event.key === 'Enter') {
      axios
        .get(`https://api.digitransit.fi/geocoding/v1/search?text=${event.target.value}&size=1`)
        .then(response=> {
          let lat, lon
          [lon, lat] = response['data']['features'][0]['geometry']['coordinates']
          this.setState({
            coordTo: [lat, lon],
            showMarkerTo: true
          })

        })
        .catch (error=> {
          console.log(error)
        })
    }
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

  componentDidMount() {
    axios
      .get(`https://api.digitransit.fi/geocoding/v1/reverse?point.lat=${mapCenter[0]}&point.lon=${mapCenter[1]}&size=1&layers=address`)
      .then(response=> {
        this.setState({
          address: response['data']['features'][0]['properties']['label']
        })
      })
      .catch (error=> {
        console.log(error)
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
              header="Search"
                icon={<FiSearch />}>

             <SearchPanel
                home={ this.state.address }
                  locationTo={ this.fetchLocn } />

          </Tab>
        </Sidebar>

        <Map
          className="mapStyle sidebar-map"
            center={mapCenter}
              zoom={zoomLevel}>
          <TileLayer
            attribution={tonerAttrb}
              url={tonerTiles}/>

          <Marker position={mapCenter} />

          {
            this.state.showMarkerTo
            ? <Marker position={this.state.coordTo} />
            : null
          }

        </Map>
      </div>
    );
  }
}

export default App;
