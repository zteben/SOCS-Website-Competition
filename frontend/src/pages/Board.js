import React from 'react';
import { Link } from 'react-router-dom';
import Messaging from '../components/Messaging';
// import React, { useState, useEffect, useRef } from 'react';

import './../TEMP.css';
import './../components/Board.css';


const board = () => {
  return (
    <div className="entirePage">
      <div className="board">Board</div>
      <div className="content">
        <div className="sidebar">
          <h2>Sidebar</h2>
          <ul>
            <li>General</li>
            <li>Assignments</li>
            <li>Midterms</li>
          </ul>
        </div>
        <div className="messagingContainerStyle">
        <Messaging 
            currChannelName = {'general'} // channel object
            currUserName = {'CoolProf'} //user object
        />
        </div>
      </div>
      
    </div>
  );
}

export default board;