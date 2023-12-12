// TODO: REDIRECT TO THE APPROPRIATE MESSAGE.JS WHEN USER CLICKS ON A DM - isa or mike
import React, { useEffect, useState } from 'react';
import "./DirectMessageSidebar.css";
import { Link } from 'react-router-dom';
import FriendRequest from './FriendRequest';


const DirectMessageSidebar = () => {
  const [friends, setfriends] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
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


  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(
          `http://localhost:3000/api/friends/getFriends`,
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
        
   
        setfriends(data);

      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };
    fetchFriends();
    
  }, []);


  return (
    
    <> 
      
      <nav className="nav-menu">
        <div className="nav-title">
         
          <p>FRIENDS</p>

       
     
        </div>
       
          <ul className="friends-list">
          <FriendRequest /> 
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
