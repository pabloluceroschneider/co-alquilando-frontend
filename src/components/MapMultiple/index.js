import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


const ClickeableMap = ({google, currentPosition}) => {
    let markers = [
        { lat: "-31.3622234", lng: "-64.1719289" },
        { lat: "-31.3622215", lng: "-64.1719288" },
    ]

  return (
        <Map google={google} zoom={14} className={'map'} initialCenter={currentPosition}>
            <Marker position={{ lat: "-31.3622234", lng: "-64.1719289" }} name={'1 location'} />
            <Marker position={{ lat: "-31.3622215", lng: "-64.1719288" }} name={'2 location'} />
        </Map>
    )
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag')
})(ClickeableMap)