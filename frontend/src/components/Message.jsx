import React, { useState, useRef, useEffect } from 'react';
import { formatUnixTimestamp } from './../utils/TimeStamp';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { FaEllipsisH } from 'react-icons/fa'; 
import { autoResizeTextarea } from './../utils/AutoResizeTextArea';
import { getUserData } from './../api';

const Message = ({ sender, timestamp, message, userProfilePicture, currentUserName }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);
  const [senderObject, setSenderObject] = useState(null);


  const editingTextRef = useRef(null);

  useEffect(() => {
    setSenderObject(null);
    const fetchData = async () => {
      try {
        console.log('sender id:', sender);
        const userObject = await getUserData(sender);
        // console.log('Fetched userObject:', userObject);
        setSenderObject(userObject);
        console.log('sender:', userObject.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [sender]);

  const handleDelete = () => {
    // Perform any necessary delete action here

    // Hide the message
    setIsVisible(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSaveEdit = () => {
    // Save the edited message and toggle off the edit mode
    // You can perform any other necessary actions here
    setEditedMessage(`${editedMessage} (edited)`);
    setIsEditing(false);
  };

 
  const redirectToWebsite = () => {
    // Replace 'https://example.com' with the actual URL you want to redirect to
    window.location.href = 'https://example.com';
  };

  const isCurrentUser = sender.username === currentUserName;

  return (
    // <div className='display-message'>
    <div className={`display-message ${isVisible ? '' : 'hidden'}`}>
      {isVisible}
      <div className="pfpContainer">
        <Tooltip
          html={(
            <div className="tooltip-content">
              <img
                src={senderObject?.profilePic}
                alt='User Profile'
                style={{ height: '1em', width: '1em', borderRadius: '50%', objectFit: 'cover' }}
              />
              <p>{senderObject?.username}</p>
              <button className='DMbutton' onClick={redirectToWebsite}>Message</button>
            </div>
          )}
          position="bottom"
          interactive  // Add the interactive property
          hideOnClick={false}  // Prevent the tooltip from hiding on click
        >
          <img
            src={senderObject?.profilePic}
            alt='User Profile'
            style={{ height: '2em', width: '2em', borderRadius: '50%', marginRight: '1em', objectFit: 'cover', cursor: 'pointer' }}
          />
        </Tooltip>
      </div>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Tooltip
          html={(
            <div className="tooltip-content">
              <img
                src={senderObject?.profilePic}
                alt='User Profile'
                style={{ height: '1em', width: '1em', borderRadius: '50%', objectFit: 'cover' }}
              />
              <p>{senderObject?.username}</p>
              <button className='DMbutton' onClick={redirectToWebsite}>Message</button>
            </div>
          )}
          position="bottom"
          interactive  // Add the interactive property
          hideOnClick={false}  // Prevent the tooltip from hiding on click
        >
          
          <p className='user'>{senderObject?.username}</p>
        </Tooltip>
          <p>&nbsp;</p>
          <p className='time'>{formatUnixTimestamp(timestamp)}</p>
        </div>
        {/* <div> */}
        {isEditing ? (
          <div className='editingText'>
            <textarea
              // className='edit-message'
              value={editedMessage}
              // onChange={(e) => setEditedMessage(e.target.value)}
              onChange={(e) => {
                setEditedMessage(e.target.value)
                autoResizeTextarea(e.target);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Prevents the default behavior (e.g., line break)
                    if (editedMessage.trim() !== "") {
                      setEditedMessage(e.target.value);
                      }
                    
                }
            }}

              rows="1" // Initially set to one row
              ref={(textarea) => autoResizeTextarea(textarea)}
              
            />
            <button className='saveEditButton' onClick={handleSaveEdit}>Save</button>
            </div>
          ) : (
            <p className='message' style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}>
              {editedMessage.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          )}
        {/* </div> */}
      </div>
      {isCurrentUser && (
      <Tooltip
        html={(
          <div className="tooltip-editDelete">
            
            <button className='editButton' onClick={(handleEdit)}>Edit</button>
            
            <button className='deleteButton' onClick={handleDelete}>Delete</button>
          </div>
        )}
        position="top"
        // trigger="click" // Change the trigger to "click"
        interactive  // Add the interactive property
        // hideOnClick={false}  
        style={{marginLeft: 'auto', marginRight: '1em', marginTop: 'auto', marginBottom:'auto'}}
      >
        <button className="ellipsisButton">
          <FaEllipsisH />
        </button>
      </Tooltip>
      )}
    </div>
  );
};

export default Message;
