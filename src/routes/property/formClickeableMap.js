import React from 'react';
import ClickeableMap from '../../components/ClickeableMap';

const FormClikeableMap = (props) =>{
    return( <ClickeableMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        zoomLevel={15}
      />);
}

export default FormClikeableMap;