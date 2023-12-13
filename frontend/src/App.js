import './App.css';
import React from 'react';
import { BrowserRouter, Route, Navigate, Routes, useParams  } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectPage from './pages/SelectPage';
import Sidetest from './pages/Sidetest';
import Board from './pages/Board';
import DMs from './pages/DMs';

function App() {
  let { boardname } = useParams();
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
          <Route path="/:boardname" element={<Board />} />
          <Route path="/dms/:friendid" element={<DMs />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
