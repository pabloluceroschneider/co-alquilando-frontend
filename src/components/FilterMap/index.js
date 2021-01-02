import React, { useState, useEffect } from 'react';
import './FilterMap.scss';
import { Checkbox } from 'antd';
import MapMultiple from '../MapMultiple';

const FilterMap = ({properties, selected, onFilter, seeOnMap}) => {
    const [ currentPosition, setCurrentPosition ] = useState({ lat: null, lng:null});
    const [ loadingMap, setLoadingMap ] = useState(false)

	const getCurrentPosition = () => {
        setLoadingMap(true)
        if (currentPosition.lat && currentPosition.lng ) {
            setCurrentPosition({ lat: null, lng:null})
            setLoadingMap(false);
            return
        }
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			console.log(coords);
			setCurrentPosition({ lat: coords.latitude, lng: coords.longitude });
            setLoadingMap(false);
            onFilter({ lat: (coords.latitude).toFixed(2) });
            // onFilter({ lat: (coords.latitude).toFixed(2), lng: (coords.longitude.toFixed(2)) });
            // onFilter({
            //     lat: -31.44872900235405.toFixed(2),
            //     lng: -64.17921968243677.toFixed(2)
            // })
        });
	};

	return (
        <>
		<div className="filter-map-wrapper">
			<div className="header">
				<label>Buscar por mi ubicación</label>
				<Checkbox onClick={getCurrentPosition} />
			</div>

            {loadingMap ? (<p>Cargando mapa...</p>) : null}

			{currentPosition.lat && currentPosition.lng ? (
                <div className="map-wrapper">
                    <MapMultiple
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `auto`, width: `auto` }} />}
                        mapElement={<div style={{ height: `auto` }} />}
                        zoomLevel={10}
                        currentPosition={currentPosition}
                        properties={properties}
                        selected={selected}
                        seeOnMap={seeOnMap}
                    />
                </div>
			) : null}
		</div>
        </>
	);
};

export default FilterMap;
