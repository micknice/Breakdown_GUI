import logo from './logo.svg';
import './App.css';
import WebSocketClientComponent from './components/PatrolDisplay.jsx';
import MapboxMap from './components/MapboxMap';
import MapboxMap2 from './components/MapboxMap2';


const App = () => {
  return (
    <div>
      <MapboxMap2 />
      {/* <WebSocketClientComponent /> */}
    </div>
  );
};

export default App;
