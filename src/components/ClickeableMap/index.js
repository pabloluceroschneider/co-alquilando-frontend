import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


const ClickeableMap = ({onChange, google, latitude, length, notClickeable}) => {
    const [position, setPosition] = useState({ lat: latitude, lng: length })  

    const onMapClicked = (param, map, e) => {
        if (notClickeable) return;
        setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        onChange( {
            latitude: JSON.stringify( e.latLng.lat() ),
            length: JSON.stringify( e.latLng.lng())})
    }


    return (
        <Map google={google} zoom={14} className={'map'} initialCenter={position} onClick={onMapClicked}>
            <Marker position={position} name={'Current location'} />
        </Map>
    )
}

ClickeableMap.defaultProps = {
    latitude: -31.4284129,
    length: -64.1847776
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag')
})(ClickeableMap)