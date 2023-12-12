import React, { useEffect, useState } from 'react';
import "./ServerSidebar.css";
import ChannelBox from './ChannelBox';
import { Link } from 'react-router-dom';
import NewChannel from './NewChannel';


const ServerSidebar = (boardname) => {
  const [boardid, setBoardid] = useState('');
  const [channels, setChannels] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
 
  
  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    const fetchBoardId = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
       
        const response = await fetch(
          `http://localhost:3000/boards/getBoard/${boardname.boardname}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setBoardid(data);
        
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };
    fetchBoardId();
    
  }, [boardname.boardname, token]);



  useEffect(() => {
    if (boardid._id) {
    const fetchChannels = async () => {
      try {
        
        const response = await fetch(
          `http://localhost:3000/channels/getAllChannel/${boardid._id}`,
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
      
        
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
      
    };
    fetchChannels();
  }
  }, [boardid._id, token]);

  useEffect(() => {
    const updateDarkMode = (event) => {
      setIsDarkMode(event.matches);
    };

    const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMatcher.addListener(updateDarkMode);

    return () => {
      darkModeMatcher.removeListener(updateDarkMode);
    };
  }, []);

  // useEffect(() => {
  //   const checkAdminStatus = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/isAdmin/checkAdminStatusById?_id=${boardid._id}`,
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
            <div><p><b>{boardname.boardname}</b></p> </div>
            
      
          </div>
          <ul className="channels">
            <div >
            <NewChannel boardid={boardid._id} />
            </div>
            <p><b>Channels:</b></p>
            {
              channels.map((channel,index) => (
                
                <Link key={channel.channel} to={`/${boardname}/${channel.channel}`}>
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
