import React from 'react';

import './App.css';
import TopBar from './components/TopBar'
import TotalCases from './components/TotalCases'
import Map from './components/Map'

function App() {
  return (
    <div className="App">
      <TopBar />
      <TotalCases />
    </div>
  );
}

export default App;
