import React from 'react';
import { Link } from 'react-router-dom';
import MessagingDM from '../components/MessagingDM';
// import React, { useState, useEffect, useRef } from 'react';

import './../TEMP.css';
import './../App.css';


const DMs = () => {
  return (
    <div className="entirePage">
      <div className="board">Board</div>
      <div className="content">
        <div className="sidebar">
          <h2>Sidebar</h2>
          <ul>
            <li>Sarah</li>
            <li>George</li>
            <li>Leo</li>
          </ul>
        </div>
        <div className="messagingContainerStyle">
        <MessagingDM 
            friendUserName = {'charlie123'} // channel object
            currUserName = {'hello'} //user object
        />
        </div>
      </div>
      
    </div>
  );
}

export default DMs;