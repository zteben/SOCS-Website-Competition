import './App.css';
import React from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectPage from './pages/SelectPage';
import Sidetest from './pages/Sidetest';
import Board from './pages/Board';
import DMs from './pages/DMs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/Sidetest" element={<Sidetest />}></Route>
          <Route path="/boards"  element={<Board/>} />
          <Route path="/dm" element={<DMs/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
