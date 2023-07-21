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
    height: '100%',
    latitude: 54.500000, 
    longitude: -4.2000, 
    zoom: 4.7, 
  });
  const [patrols, setPatrols] = useState({});
  const [markers, setMarkers] = useState([]); 
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
  }, [patrols]); 

  const handleStartSimulation = () => {
    console.log('handler invoked')
    const socket = io('http://localhost:7071');
    socket.emit('sim', '!!!!!')
    
  }
  const updateMapMarkers = () => {
    console.log('updateMapMarkers invoked', Date.now());

    const patrolArr = Object.values(patrols);
    if (patrolArr.length > 0) {
      const markerArr = extractLatitudeAndLongitude(patrolArr, markers).map((marker, index) => {

        const onJob = patrolArr[index].onJob;


        const color = onJob ? 'green' : 'red';

 
        return { ...marker, color };
      });

 
      setMarkers(markerArr);
      setPatData(patrolArr);
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, padding: '20px' }}>
        {/* Add your text content here */}
        <h1>AA SIMULATOR</h1>
        <p>Break it on down!!!</p>
        <button onClick={handleStartSimulation}>Start Simulation</button>
      </div>
      <div style={{ position: 'absolute', top: 0, bottom: '0', left: '0', transform: 'translateX(-50%)', zIndex: 1 }}>
        {/* Add your button here */}
      </div>

      <ReactMapGL
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        // style={{ width: 2380, height: 1200 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        >
        {/* Render the markers on the map */}
        {markers.map((marker, index) => {
          const { color, latitude, longitude } = marker;
          console.log(color)
          const patrolId = patData[index].patrolId
          return (
            <Marker key={index} latitude={latitude} longitude={longitude}>
              <div style={{ color }}>
                <svg
                  height="20"
                  viewBox="0 0 24 24"
                  style={{
                    cursor: 'pointer',
                    fill: color,
                    stroke: 'none',
                    transform: `translate(${0 / 2}px,${0}px)`,
                  }}
                  >
                  <circle cx="12" cy="12" r="10" />
                </svg>
                  
                    
              </div>
              
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
}

export default MapboxMap2;
