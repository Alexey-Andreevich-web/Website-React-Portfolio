import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contacts from './pages/Contacts';

function App() {
  return (
      <Router basename="/Website-React-Portfolio">
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/About" element={<About/>} />
            <Route path="/Portfolio" element={<Portfolio/>} />
            <Route path="/Contacts" element={<Contacts/>} />
        </Routes>
      </Router>
  );
}

export default App;
