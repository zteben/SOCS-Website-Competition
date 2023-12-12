import React, { useEffect, useState } from 'react';
import "./ServerSidebar.css";
import ChannelBox from './ChannelBox';
import { Link } from 'react-router-dom';
import NewChannel from './NewChannel';

const ServerSidebar = ({ boardid }) => {
  const [channels, setChannels] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const board_id = boardid;
  const token = localStorage.getItem('accessToken');
  
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        console.log(board_id);
        console.log(token);
        const response = await fetch(
          `http://localhost:3000/channels/getAllChannel/${board_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const data = await response.json();

        setChannels(data);
        console.log('Fetched channels:', data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };
    fetchChannels();
    
  }, [board_id, token]);
  

  // useEffect(() => {
  //   const checkAdminStatus = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/isAdmin/checkAdminStatusById?_id=${board_id}`,
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: token,
  //           },

  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setIsAdmin(data.isAdmin);
  //     } catch (error) {
  //       console.error('Error checking admin status:', error);
  //     }
  //   };

  //   checkAdminStatus();
  // }, [board_id, token]);


  return (
    
    <> 
      <div className="scroller">
        <div className="nav-menu">
          <div className="nav-title">
            <p>CHANNELS</p>
            <NewChannel boardid={board_id} />
            
      
          </div>
          <ul className="nav-menu-items">
            
            {
              channels.map((channel,index) => (
              
                <Link key={channel.channel} to={`/${board_id}/${channel.channel}`}>
                  <ChannelBox ChannelId={channel.channel} isAdmin={isAdmin} />
                </Link>
                
              ))
        }

          </ul>
        </div>
      </div>
    </>
  );
};

export default ServerSidebar;
