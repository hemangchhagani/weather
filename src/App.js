import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Create from './components/Create';
import WeatherForecast from './components/WeatherForecast';


const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Create/>}/>
          <Route exact path="/weatherforecast" element={<WeatherForecast/>}/>
        </Routes>
    </Router>
  );
}

export default App;
