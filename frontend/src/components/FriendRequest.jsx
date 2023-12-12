import React, { useState } from 'react';
import './FriendRequest.css';

const FriendRequest = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [enteredName, setEnteredName] = useState('');

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setPopupVisible(false);
    // You can perform further actions with the enteredName here
    console.log("Entered Name:", enteredName);
  };

  const handleNameChange = (event) => {
    setEnteredName(event.target.value);
  };

  return (
    <div>
      <button onClick={togglePopup} className='buttons'>
        {isPopupVisible ? '-' : '+'}
      </button>

      {isPopupVisible && (
        <div className="popup">
          <label>
          Username:
            <input type="text" value={enteredName} onChange={handleNameChange} />
          </label>
          <button onClick={closePopup}>Send</button>
        </div>
      )}
    </div>
  );
};

export default FriendRequest;
