import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


const ClickeableMap = (props) => {
    const [position, setPosition] = useState({ lat: -31.428029453393027, lng: -64.20570002235915 })
    
    
    const onMapClicked = (param, map, e) => {
        setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        props.onChange( {
            latitude: JSON.stringify( e.latLng.lat() ),
            length: JSON.stringify( e.latLng.lng())})
    }


    return (
        <Map google={props.google} zoom={14} className={'map'} initialCenter={position} onClick={onMapClicked}>
            <Marker position={position} name={'Current location'} />
        </Map>

    )
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag')
})(ClickeableMap)