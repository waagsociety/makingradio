import React from 'react'
import MapComponent from 'mapbox-gl-react'
import { geolocation } from '../../../controller/'
import './index.css'

import events from './events'
import { Modal, LocationToggle } from '../../element/'

const errorContent = {
  title: "Uw locatie kon niet worden bepaald",
  message: "Het is helaas niet mogelijk een meting te doen zonder locatie-gegevens.",
}

const transferCoords = transfer('longitude', 'latitude')

export const Map = ({ state, dispatch }) => {

  const { requestLocation, reset } = events(dispatch, window._MAPBOX_)
  const { location, config } = state
  const { mapbox } = config
  const { data, error } = location

  const errorActions = {
    primary: { label: "OK", event: reset },
  }

  const coords = transferCoords(data && data.coords)
  const center = coords || mapbox.center

  return <section className='Map full content' hidden={state.sensor.active}>

    <MapComponent id='MapBox' 
      accessToken={mapbox.accessToken}
      style={mapbox.style}
      center={center}
      zoom={mapbox.zoom}
      eventHandlers={{ 
        load: map => {
          window._MAPBOX_ = geolocation(dispatch, map)
          dispatch.location({ ready: true })
        }
      }}
    />

    { error ? <Modal content={errorContent} {...errorActions}/> : null }

    <LocationToggle events={{ requestLocation }} location={location} />

  </section>

}

function transfer(...keys) {

  return function(object) {
    if (object) return keys.reduce(function(result, key, index) {
      result[index] = object[key]
      return result
    }, [])
  }

}