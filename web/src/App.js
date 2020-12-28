import React from 'react'
import {Dashboard, DashboardOne, SimpleTrends, Trends} from './widgets'
import MapFuture from "./Map";
function App() {
  return (
      <div>
        <Dashboard />
        <DashboardOne />
        <Trends />
        <SimpleTrends />
        <MapFuture />
      </div>
  );
}

export default App;
