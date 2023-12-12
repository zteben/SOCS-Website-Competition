import React, { useState } from 'react';
import './FriendRequest.css';
import axios from 'axios';

const NewChannel = ({boardid}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [enteredName, setEnteredName] = useState('');



  const handleNameChange = (event) => {
    setEnteredName(event.target.value);
  };

  async function addChannel() {
    const requestData = {
        channelname: enteredName, 
        boardid: boardid
      };
    const accessToken = localStorage.getItem('accessToken');
    try {
        
      
        const response = await axios.post(`http://localhost:3000/channels/createChannel`, requestData, {
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
    <div>
    
        <div className="popup">
          <label>
          
            <input type="text" value={enteredName}  placeholder = "Channel Name:" onChange={handleNameChange} />
          </label>
          <button onClick={()=>{ addChannel();}}>Add</button>
        </div>
      
    </div>
  );
};

export default NewChannel;
