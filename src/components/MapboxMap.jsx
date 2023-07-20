import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWlyZm9yY2UyaGlnaCIsImEiOiJjbGtiYTZ4d2wwYXFnM2JvMHBvcXQ4dWJhIn0.hWAcsZ9TJm7MzibOfoMXDw';

function MapboxMap({ patrols }) {
    const [viewState, setViewState] = React.useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14
      });

//   useEffect(() => {
//     // Update the map's viewport when the `patrols` data changes
//     // This will trigger a re-render and update the markers on the map.
//     // If the incoming data structure changes, make sure to adjust this function accordingly.
//     updateMapMarkers();
//   }, [patrols]);

//   const updateMapMarkers = () => {
//     // Implement the logic to update the map markers based on the `patrols` data.
//     // For each patrol in the `patrols` data, create a new marker with its coordinates.
//     // For example, if `patrols` is an object of Patrol instances with `currentLocation` property:
//     // const markers = Object.values(patrols).map((patrol) => ({
//     //   latitude: patrol.currentLocation[0],
//     //   longitude: patrol.currentLocation[1],
//     // }));
//     // Then you can update the markers state with the new marker data.
//     // setMarkers(markers);
//   };

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: 800, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </Map>
  );
};

export default MapboxMap;
