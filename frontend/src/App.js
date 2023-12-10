import './App.css';
import React from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Select from './pages/Select';
import Sidetest from './pages/Sidetest';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/select" element={<Select />} />
          <Route path="/Sidetest" element={<Sidetest />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
