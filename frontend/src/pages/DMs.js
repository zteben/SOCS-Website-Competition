import React from 'react';
import { useParams} from 'react-router-dom';
import MessagingDM from '../components/MessagingDM';
// import React, { useState, useEffect, useRef } from 'react';

import './../TEMP.css';
import './../components/Board.css';
import DirectMessageSidebar from '../components/DirectMessageSidebar';
import SelectNav from '../components/BoardNav';
import GetuserNameByID from '../components/GetUserNameById';


const DMs = () => {
  const {friendid} = useParams();
  

  return (
    <div className="entirePage">
      <div><SelectNav/> </div>
      <div className="content">
        <div className="sidebar">
            <DirectMessageSidebar />
          </div>
          <div className="messagingContainerStyle">
          
          <MessagingDM 
              friendUserNameProps = {'DMS'} // channel object
              currUserName = {'CoolProf'} //user object
          />
          <GetuserNameByID userid= {friendid} />
          </div>
      </div>
      
    </div>
  );
}

export default DMs;