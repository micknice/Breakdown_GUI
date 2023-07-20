import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import io from 'socket.io-client';
import extractLatitudeAndLongitude from '../utils/utils';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWlyZm9yY2UyaGlnaCIsImEiOiJjbGtiYTZ4d2wwYXFnM2JvMHBvcXQ4dWJhIn0.hWAcsZ9TJm7MzibOfoMXDw';

function MapboxMap2(){
  const [viewState, setViewState] = useState({
    width: '100%',
    height: '1200px',
    latitude: 54.500000, // Replace with your initial map latitude
    longitude: -4.2000, // Replace with your initial map longitude
    zoom: 4.7, // Adjust the initial zoom level as needed
  });
  const [patrols, setPatrols] = useState({});
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:7071');
    socket.on('patrolData', (data) => {
      console.log('Received updated patrols data:', data, Date.now());
      setPatrols(data); 
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    updateMapMarkers();
  }, [patrols]);

  

  const updateMapMarkers = () => {
    console.log('updateMapMarkers invoked', Date.now())
    
    // // console.log('patrols!!!', patrols.patrol0.currentLocation)
    const patrolArr = Object.values(patrols);
    // console.log('patrolArr.length', patrolArr.length)
    if(patrolArr.length > 0) {
      const markerArr = extractLatitudeAndLongitude(patrolArr)
    

      setMarkers(markerArr);
  
      
    }
    // Then you can update the markers state with the new marker data.

  };

  return (
    <ReactMapGL {...viewState} 
    onMove={evt => setViewState(evt.viewState)}
    style={{width: 800, height: 600}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={MAPBOX_TOKEN}>
      {/* Render the markers on the map */}
      {/* Example: */}
      {markers.map((marker, index) => {
        return(
        <Marker key={index} latitude={marker.latitude} longitude={marker.longitude} color="red"/>
             
        )
      })}
        {/* <Marker key={index} longitude={marker.longitude} latitude={marker.latitude} color="red" /> */}
        {/* <Marker longitude={-2.936226} latitude={50.933313} color="red" />
        <Marker key={'any'} latitude={50.933313} longitude={-2.936226}>
        <img alt=''src="./pin_ting.png" />
        </Marker> */}
      
    </ReactMapGL>
  );
};

export default MapboxMap2;
