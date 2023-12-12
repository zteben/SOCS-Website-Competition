import React, { useState } from 'react';
import './FriendRequest.css';
import axios from 'axios';

const FriendRequest = () => {
  const [enteredName, setEnteredName] = useState('');

  const handleNameChange = (event) => {
    setEnteredName(event.target.value);
  };

  async function addFriend() {
    const requestData = {
      friendUsername: enteredName, 
       
      };
    const accessToken = localStorage.getItem('accessToken');
    try {
        
      
        const response = await axios.post(`http://localhost:3000/api/friends/send-friend-request`, requestData, {
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
        <div className="popup">
          <label>
          
            <input type="text" value={enteredName} placeholder = "Username:" onChange={handleNameChange} />
          </label>
          <button onClick={()=>{ addFriend();}}>Send</button>
        </div>
      )
  
  
};

export default FriendRequest;
