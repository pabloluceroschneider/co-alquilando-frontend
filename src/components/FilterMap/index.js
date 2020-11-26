import React, { useState } from 'react'
import './FilterMap.scss'
import { Checkbox } from 'antd';
import MapMultiple from '../MapMultiple'

const FilterMap = () => {
    const [ currentPosition , setCurrentPosition] = useState()

    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition( ({coords}) => {
            console.log(coords)
            setCurrentPosition( { lat:coords.latitude, lng: coords.longitude } ) 
        })
    }

    return (
        <div className="filter-map-wrapper">
            <div className="header">
                <label>Buscar por mi ubicación</label>
                <Checkbox onClick={getCurrentPosition}/>
            </div>

            {currentPosition ?  (
                <MapMultiple
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag"
                    // loadingElement={<div style={{ height: `100%` }} />}
                    // containerElement={<div style={{ height: `300px`, width: `300px` }} />}
                    // mapElement={<div style={{ height: `100%` }} />}
                    zoomLevel={10}
                    currentPosition={currentPosition}
                /> )
            : null}
        </div>
    )
}

export default FilterMap
