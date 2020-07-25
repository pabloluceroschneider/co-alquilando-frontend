import React from 'react';
import GoogleMapReact from 'google-map-react'
import credentials from '../../util/Credentials'
import '../../assets/Icons/Icon/styles.css'
import '../../styles/Map.css'

const LocationPin = ({ text }) => (
  <div className="pin">
    <label className="icon-map-marker pin-icon">  </label>
    <p className="pin-text">{text}</p>
  </div>
)

  
const Mapa = ({ location, zoomLevel }) => (
  
  <div className="map">
    
    <div style={{ height: '350px', width: '250px' }}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: 'AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
   
    </div>
  </div>
 
)

 
export default Mapa

