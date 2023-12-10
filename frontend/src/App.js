// import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Board from './pages/Board';
import DMs from './pages/DMs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/board"  element={<Board/>} />
          <Route path="/dm" element={<DMs/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
