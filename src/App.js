import React, { Component } from 'react';
import axios from 'axios'
import {Map, TileLayer, Marker, Polyline, Circle} from  'react-leaflet'
import {Sidebar, Tab} from 'react-leaflet-sidetabs'
import { FiChevronRight, FiSearch } from 'react-icons/fi'
import SearchPanel from './control/SearchPanel'

import Mapr from './control/Mapr'

import './App.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const plowMarker = L.icon({
  iconUrl: 'plow.png',
  iconSize: [20, 20]
})

const tonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png'
const tonerAttrb = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const mapCenter = [60.1713, 24.8280]
const zoomLevel = 10

class App extends Component {

  state = {
    collapsed: true,
    selected:'home',
    locationFrom: '',
    coordTo: [],            //The coordinates to the inputted address in the 'To' field
    showMarkerTo: false,    //The 'To' location's marker
    trail: [],              //Coordinates to the plows' activity history
    hasTrail: false,        //`trail` has just been updated with coords values
    plows: [],              //All the active plows...
    plowsCoord: [],         // ...and their latest respective coordinates
    plowsReady: false       //`plows` and `plowsCoord` have just been updated with values
  }

  fetchLocn =(event)=> {
    if (event.key === 'Enter') {
      axios
        .get(`https://api.digitransit.fi/geocoding/v1/search?text=${event.target.value}&size=1`)
        .then(response=> {
          let [lon, lat] = response['data']['features'][0]['geometry']['coordinates']
          this.setState({
            coordTo: [lat, lon],
            showMarkerTo: true
          })
          console.log(this.state.coordTo)
        })
        .catch (error=> {
          console.log(error)
        })
    }
  }

  fetchActivities =()=> {
    axios
      .get('http://dev.hel.fi/aura/v1/snowplow/')
      .then(response=> {
          const coords = response.data.map((plow)=> {
            let [lo, la] = plow.last_location.coords
            return [la, lo]
          })

          this.setState({
            plows: response.data,
            plowsCoord: coords,
            plowsReady: true
          })
          // console.log('fetchActivities: ',this.state.plowsCoord)
      })
  }

  populateTrails =(coords)=> {
    return (state, props) => {
      return { trail: coords, hasTrail: true }
    }
  }
  showTrace =(jobtype)=> {

    //For each active plow doing a specific job type
    if (this.state.plowsReady) {

      const plowWithJobtype = this.state.plows.filter(p=> {
        return p.last_location.events.includes(jobtype)
      })

      // console.log(plowWithJobtype)

      //  extract their id and
      //  query API server for plow's location history
      const jobsOfType = plowWithJobtype.map(plow=>
        axios.get(`http://dev.hel.fi/aura/v1/snowplow/${plow.id}?history=900&temporal_resolution=60&since=4hours-ago`)
      )

      // console.log('jobsOfType pr: ', jobsOfType)

      axios.all(jobsOfType)
        .then(plows=> { //console.log('response', response)
        // console.log(plows[0].data.location_history[0])
          const w = plows.map(arrayOfPlows=>
            arrayOfPlows.data.location_history
          )
          const x = w.map(o=> o)
          const y = x.map(o=> o.map(p=> p))
          const z = y.map(o=>
            o.map(p=> [p.coords[1], p.coords[0]])
          )

          console.log('z: ', z)
          this.setState(()=>{
            return {
              hasTrail: true,
              trail: [...this.state.trail, z]
            }
          })
        })
        .catch(err=> console.log('catch: ', err))


      // const b = coords.map(c=> c)
      // console.log('b: ', b)
      //
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
              <>
             <SearchPanel
                home={ this.state.locationFrom }
                  locationTo={ this.fetchLocn }
                    selectJob={ this.showTrace } />
              </>

          </Tab>
        </Sidebar>

        <Map
          className="mapStyle sidebar-map"
            center={mapCenter}
              zoom={zoomLevel}
               whenReady={ this.fetchActivities }>
          <TileLayer
            attribution={tonerAttrb}
              url={tonerTiles}/>

          <Marker position={mapCenter} />

          {
            this.state.showMarkerTo
            ? <Marker position={this.state.coordTo} />
            : null
          }


          { this.state.plowsReady
            ? this.state.plowsCoord.map((p, i)=> <Marker
                position={ p }
                key={ i }
                icon={ plowMarker }/>)
            : null
          }

          { this.state.hasTrail
            ? this.state.trail.map((trail, i)=> <Polyline positions={ trail } key={i} />)
            : 'Homemm'
          }

        </Map>
      </div>
    )
  }
}

export default App;
