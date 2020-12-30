import React from 'react'
import {Dashboard, DashboardOne, SimpleTrends, Trends} from './widgets'
import {Dock} from "./Sheets"
import MapFuture from "./Map";
import Overview from "./Overview";
function App() {
  return (
      <div>
        <Overview />
        <Dock />
      </div>
  );
}

export default App;
