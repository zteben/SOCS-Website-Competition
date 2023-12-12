import React, { useState } from 'react';
import './FriendRequest.css';

const NewChannel = (boardid) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [enteredName, setEnteredName] = useState('');

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setPopupVisible(false);
   
    console.log("Entered Name:", enteredName);
  };

  const handleNameChange = (event) => {
    setEnteredName(event.target.value);
  };

  const addChannel = async () => {
    try {
        console.log(boardid);
        console.log(enteredName);
        
        const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(
        'http://localhost:3000/channels/createChannel', 
        {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            channelname: enteredName,
            boardid: boardid,
          
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Query response:', data);
      } else {
        console.error('Error calling query:', response.statusText);
      }
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
