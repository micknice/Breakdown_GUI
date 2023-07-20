import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const PatrolDisplay = () => {
  const [patrols, setPatrols] = useState({});

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('http://localhost:7071'); // The endpoint should match your Socket.IO server endpoint.

    // Listen for the 'patrolData' event and update the state when received.
    socket.on('patrolData', (data) => {
      console.log('Received updated patrols data:', data);
      setPatrols(data); // Update the state with the new data.
    });

    // Cleanup the Socket.IO client when the component unmounts.
    return () => {
      socket.disconnect();
    };
  }, []);

  // Render the patrol data or use it as needed in your component.
  return (
    <div>
      <h2>Patrol Data</h2>
      {/* Render the patrol data here */}
      {/* Example: */}
      <pre>{JSON.stringify(patrols, null, 2)}</pre>
    </div>
  );
};

export default PatrolDisplay;