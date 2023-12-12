import React, { useState, useEffect } from 'react';
import './ServerSidebar';

import './ChannelBox.css';

const ChannelBox = ({ ChannelId,  isAdmin}) => {
    const [channel, setData] = useState('');
    const token = localStorage.getItem('accessToken');
    
    useEffect(() => {
    const fetchChannel = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/channels/getChannel/${ChannelId}`,
            {
              method: 'GET',
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching boards:', error);
        }
      };
      fetchChannel();
    }
    , [ChannelId, token]);
 

  return (
    
     <div className="card">
      <div className="container">
        <li className="nav-menu-text">{channel}</li>

      </div>
    </div>
  );
};

export default ChannelBox;
