import React from 'react';
import { useParams } from 'react-router-dom';
import Messaging from '../components/Messaging';
// import React, { useState, useEffect, useRef } from 'react';

import './../TEMP.css';
import './../components/Board.css';
import './../components/ServerSidebar';
import ServerSidebar from './../components/ServerSidebar';
import BoardNav from '../components/BoardNav';
import BoardSettings from './../components/BoardSettings';

const Board = () => {
  const {boardname} = useParams();

  return (
    
    <div className="entirePage" >
      <div><BoardNav boardname = {boardname}/> 
      </div>
      
      
      <div className="content">
        <div className="sidebar">
          <ServerSidebar boardname = {boardname}  />
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

export default Board;