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
    plowsCoord: [],         //   and their latest respective coordinates
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
    // const plows = this.state.plows.filter(e=> e.last_location.events.includes(jobtype.target.value))

    axios
      .get('http://dev.hel.fi/aura/v1/snowplow/400638?history=3000&temporal_resolution=60&since=4hours-ago')
      .then((response)=> {
        return response.data.location_history.map(e=> [e.coords[1], e.coords[0]])
      })
      .then(coords=> { console.log('abc: ', coords)
        this.setState(this.populateTrails(coords))
        console.log('def: ', this.state.trail)
      })
      .catch((err)=>  {
        console.log('catch: ', err)
      })

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
            ? <Polyline positions={ [ [ 60.1988150456005, 24.9709520739903 ],
              [ 60.1987826312131, 24.9703606626523 ],
              [ 60.1988934108582, 24.9686087743786 ],
              [ 60.2016455480369, 24.963763591992 ],
              [ 60.2031830734995, 24.9653774201416 ],
              [ 60.2079474096094, 24.9682660666851 ],
              [ 60.2088592295827, 24.9685592208782 ],
              [ 60.208854108283, 24.9654760757581 ],
              [ 60.2124921641064, 24.9595970396306 ],
              [ 60.2169571958161, 24.9596630210831 ],
              [ 60.2203805351104, 24.9624996186343 ],
              [ 60.222536685315, 24.9649292587049 ],
              [ 60.2267790218703, 24.9676286133695 ],
              [ 60.2280804853157, 24.9670421991099 ],
              [ 60.2279022719717, 24.9663902694517 ],
              [ 60.2273228452304, 24.965274841821 ],
              [ 60.2267395613808, 24.9640986083718 ],
              [ 60.2264401360133, 24.9636228921855 ],
              [ 60.2259073509063, 24.9625505292568 ],
              [ 60.2252386052714, 24.9612312708279 ],
              [ 60.2246227585708, 24.9598230305714 ],
              [ 60.2241362713278, 24.9584868193482 ],
              [ 60.2235867461232, 24.9569950010939 ],
              [ 60.2228853098254, 24.9557674976393 ],
              [ 60.2223460740752, 24.9543846943158 ],
              [ 60.2218370315795, 24.9527028110236 ],
              [ 60.2212805675122, 24.9511022755077 ],
              [ 60.220842055664, 24.9495463090745 ],
              [ 60.2204889801089, 24.9480151154068 ],
              [ 60.2198715585727, 24.9464553103293 ],
              [ 60.2198076977397, 24.9462989711822 ],
              [ 60.2202204144837, 24.9473288208253 ],
              [ 60.2208398666199, 24.9496021946897 ],
              [ 60.221427230617, 24.9515839911556 ],
              [ 60.2219534469247, 24.9532987430005 ],
              [ 60.2225683607232, 24.95513858824 ],
              [ 60.2232918531845, 24.9562843319833 ],
              [ 60.2239312833632, 24.9579262708538 ],
              [ 60.2245728638805, 24.9597066543749 ],
              [ 60.2253414214565, 24.9614539466027 ],
              [ 60.2261435924004, 24.9630218662036 ],
              [ 60.2268684752085, 24.9643572938009 ],
              [ 60.2275391329151, 24.9657190503491 ],
              [ 60.2281398038829, 24.9669156216161 ],
              [ 60.2270694180458, 24.964763070069 ],
              [ 60.2243382140818, 24.9590677221477 ],
              [ 60.2220756256559, 24.9537475703993 ],
              [ 60.2208260147349, 24.949068146817 ],
              [ 60.2196470872638, 24.9458734771425 ],
              [ 60.2188833548461, 24.944048535539 ],
              [ 60.2179116000541, 24.9435624090538 ],
              [ 60.2155031380183, 24.9402206317733 ],
              [ 60.2145569128498, 24.9395522445505 ],
              [ 60.2139735773233, 24.9377237865761 ],
              [ 60.2126029342888, 24.9371582986737 ],
              [ 60.2115404266623, 24.9359399974997 ],
              [ 60.2106268017072, 24.9364114472809 ],
              [ 60.2098511693865, 24.9352029386234 ],
              [ 60.2087537188455, 24.9349149495512 ],
              [ 60.2077683880859, 24.9339459675229 ],
              [ 60.2066723704743, 24.9332652040581 ],
              [ 60.2053698448338, 24.9327065362675 ],
              [ 60.2042358442497, 24.9325277938045 ],
              [ 60.2031189209214, 24.9326352391397 ],
              [ 60.2022757511008, 24.932896932416 ],
              [ 60.2015089581041, 24.9331727481997 ],
              [ 60.2014077670199, 24.9332208904034 ],
              [ 60.2020311339062, 24.9329741982191 ],
              [ 60.2028039211976, 24.9327767616489 ],
              [ 60.2040371003631, 24.9325046952481 ],
              [ 60.2055254465352, 24.9327418250276 ],
              [ 60.2071403542081, 24.9334341019677 ],
              [ 60.2085680422154, 24.9349478094232 ],
              [ 60.2098224900302, 24.93515961586 ],
              [ 60.2112029515337, 24.9360623458984 ],
              [ 60.2122447375976, 24.9367316774259 ],
              [ 60.2135548250805, 24.9375614441902 ],
              [ 60.2143952268066, 24.9392041575535 ],
              [ 60.2155031380183, 24.9402206317733 ],
              [ 60.2170908598235, 24.9430863398261 ],
              [ 60.2182855741181, 24.9440548393833 ],
              [ 60.2194960008486, 24.9452709309568 ],
              [ 60.219402671431, 24.9450549952071 ],
              [ 60.2181457978717, 24.9438674031268 ],
              [ 60.2173844285208, 24.9432600568504 ],
              [ 60.2155031380183, 24.9402206317733 ],
              [ 60.2150046654441, 24.9395404226942 ],
              [ 60.214287132251, 24.9379966127999 ],
              [ 60.2135735195487, 24.9375767115957 ],
              [ 60.2128741641377, 24.9371044583929 ],
              [ 60.2120131622831, 24.9363799085955 ],
              [ 60.2114038963468, 24.9359337746817 ],
              [ 60.2106815002012, 24.9364201358053 ],
              [ 60.209857008373, 24.9352267313137 ],
              [ 60.2090793733193, 24.9348912904388 ],
              [ 60.2081495899993, 24.935024082468 ],
              [ 60.2074624986573, 24.933615612194 ],
              [ 60.2063865650613, 24.9331136470145 ],
              [ 60.2034482423064, 24.9325157494043 ],
              [ 60.1995414325037, 24.934080811284 ]] }/>
            : 'Homemm'
          }

        </Map>
      </div>
    );
  }
}

export default App;
