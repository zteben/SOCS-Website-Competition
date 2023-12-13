import React, { useEffect, useState } from 'react';
import "./NotificationButton.css";
import axios from 'axios';
const NotificationButton = () => {
    const [friends, setfriends] = useState([]);
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const fetchFriends = async () => {
          try {
            const accessToken = localStorage.getItem('accessToken');
    
            const response = await fetch(
              `http://localhost:3000/api/friends/getPending`,
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
            setCount(data.length);
    
          } catch (error) {
            console.error('Error fetching channels:', error);
          }
        };
        fetchFriends();
        
      }, []);
      const handleNotificationClick = () => {
        // Toggle the visibility of the notification content
        setNotificationVisible(!isNotificationVisible);
      };


      async function acceptFriend(i) {
        const friendname = friends[i].username;
        const requestData = {
          friendUsername: friendname,
           
          };
        const accessToken = localStorage.getItem('accessToken');
        try {
            
          
            const response = await axios.post(`http://localhost:3000/api/friends/accept-friend-request`, requestData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
              })
            
                
                window.location.reload();
        
               
        } catch (error) {
          console.error('Error calling query:', error.message);
        }
      };

    
    return (
        
        <div><button className = "bell" onClick={handleNotificationClick}>{count}</button>
        
        {isNotificationVisible && (
        <div className="notification">
            <ul >
                {friends.map((friend, index) => (
                    <li key={index} className="requests" >
                        <div className="pending-request">
                    <span>{friend.username}</span>
                    <button className="accept" onClick={()=>{acceptFriend(index)}}>Accept</button>
                    </div>
                    </li>
                ))}
            </ul>
        </div>
        )}
        </div>
    );
};

export default NotificationButton;
