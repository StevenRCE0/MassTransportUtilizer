import React from 'react'
import {Dashboard, Trends} from './widgets'
import MapFuture from "./Map";
function App() {
  return (
      <div>
        <Dashboard />
        <Trends />
        <MapFuture />
      </div>
  );
}

export default App;
