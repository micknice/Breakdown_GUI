import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import io from 'socket.io-client';
import extractLatitudeAndLongitude from '../utils/utils';
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWlyZm9yY2UyaGlnaCIsImEiOiJjbGtiYTZ4d2wwYXFnM2JvMHBvcXQ4dWJhIn0.hWAcsZ9TJm7MzibOfoMXDw';

function MapboxMap2() {
  const [viewState, setViewState] = useState({
    width: '100%',
    height: '1200px',
    latitude: 54.500000, // Replace with your initial map latitude
    longitude: -4.2000, // Replace with your initial map longitude
    zoom: 4.7, // Adjust the initial zoom level as needed
  });
  const [patrols, setPatrols] = useState({});
  const [markers, setMarkers] = useState([]); // Modify initial state to an empty array
  const [patData, setPatData] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:7071');
    socket.on('patrolData', (data) => {
      console.log('Received updated patrols data:', data, Date.now());
      console.log(data);
      setPatrols(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    updateMapMarkers();
  }, [patrols, patData]); // Add patData to the dependency array

  const updateMapMarkers = () => {
    console.log('updateMapMarkers invoked', Date.now());

    const patrolArr = Object.values(patrols);
    if (patrolArr.length > 0) {
      const markerArr = extractLatitudeAndLongitude(patrolArr, markers).map((marker, index) => {

        const onJob = patrolArr[index].onJob;


        const color = onJob ? 'red' : 'green';

 
        return { ...marker, color };
      });

 
      setMarkers(markerArr);
      setPatData(patrolArr);
    }
  };

  return (
    <ReactMapGL
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: 800, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {/* Render the markers on the map */}
      {markers.map((marker, index) => {
        const { color, latitude, longitude } = marker;
        const popup = new mapboxgl.Popup().setHTML(`<h1>${patData[index].patrolId}</h1>`);
        return (
          <Marker key={index} latitude={latitude} longitude={longitude} color={color} popup={popup} />
        );
      })}
    </ReactMapGL>
  );
}

export default MapboxMap2;
