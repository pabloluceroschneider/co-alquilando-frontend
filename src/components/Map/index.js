import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import '../../assets/Icons/Icon/styles.css';
import '../../styles/Map.css';


console.warn = () => {} 
const Mapa = withScriptjs(withGoogleMap((props) =>

<GoogleMap
  defaultZoom={props.zoomLevel}
  defaultCenter={props.location}
>
  <Marker position={props.location} />
</GoogleMap>
))
 
 
export default Mapa;

