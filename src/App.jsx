// App.js
import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import BarChart from './Components/BarChart';
import NavBar from './Components/NavBar';
import Table from './Components/Table';
import Statistics from './Components/Statistics';


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="p-8">
          <Routes>
            <Route path="/barchart" element={<BarChart />} />
            <Route path="/table" element={<Table />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/" element={<BarChart />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;