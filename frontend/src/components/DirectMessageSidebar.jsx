// TODO: REDIRECT TO THE APPROPRIATE MESSAGE.JS WHEN USER CLICKS ON A DM - isa or mike
import React, { useEffect, useState } from 'react';
import "./ServerSidebar.css";
import { Link } from 'react-router-dom';
import FriendRequest from './FriendRequest';


const DirectMessageSidebar = () => {
  const [friends, setfriends] = useState([]);


  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        const response = await fetch(
          `http://localhost:3000/friends/getfriends`,
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
        
        console.log('Fetched channels:', data);
        setfriends(data);
        
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };
    fetchChannels();
    
  }, []);


  return (
    
    <> 
      
      <nav className="nav-menu">
        <div className="nav-title">
         
          <p>FRIENDS</p> <FriendRequest /> 

       
     
        </div>
       
          <ul className="nav-menu-items">
            
            {
              friends.map((friend,index) => {
              return(
                <Link key={friend._id} to={`/${friend._id}`}>
                
                  <li key={index} className="nav-text">
                    <span>{friend.username}</span>
                  </li>
            
                </Link>

                );
                  
              })
            }

          </ul>
 
      </nav>
    </>
  );
};

export default DirectMessageSidebar;
