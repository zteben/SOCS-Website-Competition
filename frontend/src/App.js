import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useState, useEffect } from "react";
import DMSSidebar from "./components/DMSsidebar/DMSsidebar.js";
import SERVERSidebar from "./src/components/SERVERSidebar/SERVERSidebar.js";

function App() {
  return (
    <div className="App">
      const [DMSsidebar, setSidebar1] = useState(true);
      const [SERVERsidebar, setSidebar2] = useState(false);
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    
    <div className="App">
    <div className={DMSsidebar ? "nav-menu active" : "nav-menu"}>
      <DMSSidebar DMSsidebar={DMSsidebar} />
    </div>
    <div classNameebar SERVERsidebar={SERVERsidebar} />
    </div>
  </div>
  );
}

export default App;
