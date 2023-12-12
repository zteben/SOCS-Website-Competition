import React, { useState } from 'react';
import './FriendRequest.css';
import axios from 'axios';

const NewChannel = ({boardid}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [enteredName, setEnteredName] = useState('');

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setPopupVisible(false);

  };

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
        
          
        console.log(requestData);
  
       
        const response = await axios.post(`http://localhost:3000/channels/createChannel`, requestData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
          })
        
            const data =  response.json();
            console.log('Query response:', data);
            window.location.reload();
    
           
    } catch (error) {
      console.error('Error calling query:', error.message);
    }
  };

  return (
    <div>
      <button onClick={togglePopup} className='buttons'>
        {isPopupVisible ? '-' : '+'}
      </button>

      {isPopupVisible && (
        <div className="popup">
          <label>
          Channel Name:
            <input type="text" value={enteredName} onChange={handleNameChange} />
          </label>
          <button onClick={()=>{closePopup(); addChannel();}}>Add</button>
        </div>
      )}
    </div>
  );
};

export default NewChannel;
