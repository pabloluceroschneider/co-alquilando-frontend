import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const ClickeableMap = ({google, currentPosition}) => {
    let marks = [
        { lat: "-31.3624851", lng: "-64.172951" },
        { lat: "-31.3627595", lng: "-64.1726473" },
        { lat: "-31.3626215", lng: "-64.1723123" },
    ]
    console.log('currentPosition:', currentPosition)
    
  return (
        <Map initialCenter={currentPosition} google={google} zoom={14} className="map">
            { marks.map((mark, index) => (
                <Marker 
                    key={index} 
                    position={mark} 
                    onClick={() => console.log(index)} 
                    />
            ))}
        </Map>
    )
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag')
})(ClickeableMap)