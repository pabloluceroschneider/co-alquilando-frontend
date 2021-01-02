import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const ClickeableMap = ({google, properties, selected, currentPosition, seeOnMap}) => {

    return (
        <Map 
            initialCenter={currentPosition} 
            google={google} 
            zoom={15} 
            className="map"
                >
                {selected ? (
                    <Marker 
                        key={selected.id} 
                        position={ { lat: selected.address.coordinates.latitude, lng: selected.address.coordinates.length } } 
                        />
                ) : (
                    properties.map( 
                        ({ id, address : { coordinates : { latitude, length } } }) => (
                            <Marker 
                                key={id} 
                                id={id}
                                position={ { lat: latitude, lng: length } } 
                                onClick={() => seeOnMap(id, false)} 
                                />
                    ))
                )}
        </Map>
    )
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag')
})(ClickeableMap)