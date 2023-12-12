import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './../TEMP.css';
import { FaArrowRight } from 'react-icons/fa'; 
import Message from './Message';
import { autoResizeTextarea } from './../utils/AutoResizeTextArea';
//import { sendNewMessage } from './../utils/SendNewMessage';
import { fetchFriendMessages, getUserData, getUserIdByUsername, sendDMsMessage, deleteDM } from './../api';
import Search from './Search'; 



const socket = io('mongodb://localhost:27017');


const MessagingDM = ({ friendUserNameProps, currUserName }) => {
  

// const [channel, setChannel] = useState([]);
  const [messages, setMessages] = useState([]);  // Define messages and setMessages
  const [newMessage, setNewMessage] = useState('');

  const [friendUserName, setFriendUsername] = useState(friendUserNameProps)

  const [footerHeight, setFooterHeight] = useState(0);
  const [channelNameHeight, setChannelNameHeight] = useState(0);

  // Add a state variable to track whether the overlay is active
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayActive(!isOverlayActive);
  };



  const footerRef = useRef(null);
  const channelNameRef = useRef(null);
  const containerRef = useRef(null);

  // useEffect(() => {
  //   // Measure the height of the footer and set it
  //   const footer = footerRef.current;
  //   if (footer) {
  //     setFooterHeight(footer.getBoundingClientRect().height);
  //   }

  //   // Measure the height of the channel name div and set it
  //   const channelNameHeight = channelNameRef.current;
  //   if (channelNameHeight) {
  //     setChannelNameHeight(channelNameHeight.getBoundingClientRect().height);
  //   }
  // }, []);

  // useEffect(() => {
  //   // Set the container height dynamically based on the footer height
  //   const container = containerRef.current;
  //   if (container) {
  //       container.style.height = `calc(100% - ${footerHeight + channelNameHeight}px)`;
  //   }
  // }, [footerHeight]);
  

  useEffect(() => {
    // Scroll to the bottom when the component mounts or when messages change
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
        var urlString = window.location.href;
        var urlParams = new URLSearchParams(urlString);
        var friendUsernameParam = urlParams.get('friend_username');
        if (friendUsernameParam != null || friendUsernameParam != undefined) {
          friendUserNameProps = friendUsernameParam
          setFriendUsername(friendUsernameParam)
        }
      try {
        // Fetch channel messages when the component mounts
        const messages = await fetchFriendMessages(currUserName, friendUserNameProps); 
        // Set the fetched messages in the state
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching channel messages:', error);
      }
    };
  
    fetchData();
  }, [friendUserName]); // The dependency array ensures the effect runs only when channelName changes


  async function sendNewMessage() {
    
    const trimmedMessage = newMessage.replace(/\s*$/, '');
    
    if (trimmedMessage !== "") {
      const sender = currUserName // currUser is user.username
      const receiver = friendUserName // currChannel is channel.name
      const message = trimmedMessage
      const timestamp = Date.now()

      console.log('Received message:', { sender, receiver, message, timestamp });

      // Await the asynchronous function before updating state
      var new_Id = await sendDMsMessage(sender, receiver, timestamp, message);

      // Fetch user data for the sender
      // const { userId } = await getUserIdByUsername({ username: currUser });

      /* THIS FUNCTION BELOW RETURNS UNDEFINED */
      const userId = await getUserIdByUsername(currUserName)
      const userObject = await getUserData(userId);

      const newMessageObject = {
        message: trimmedMessage,
        username: sender, // Replace with the actual username
        sender: userId,
        timestamp: Date.now(),
        userProfilePicture: userObject.profilePic,
        _id: new_Id
      };
      
      
      setMessages((messages) => [...messages, newMessageObject]);
      setNewMessage('');
    }
  }


//   useEffect(() => {
//     const container = containerRef.current;
//     if (container) {
//       container.scrollTop = container.scrollHeight;
//     }
//   }, [containerRef, messages]);

  const handleDeleteMessage = async (deletedMessageID) => {

    await deleteDM(deletedMessageID)

    // Log the deleted message and its ID to check if it's correct
    console.log('Deleted Message:', deletedMessageID);
  
    // Update the state in the Messaging component to delete the message
    setMessages((prevMessages) => {
      // Log the previous messages to check their content
      console.log('Previous Messages:', prevMessages);
      console.log("deletedMessageID:", deletedMessageID);
      const updatedMessages = prevMessages.filter((msg) => msg._id !== deletedMessageID);
  
      // Log the updated messages to check if the filtering is working as expected
      console.log('Updated Messages:', updatedMessages);
  
      return updatedMessages;
    });
  };
  


  

  return (
    <div style={{ backgroundColor: '#fff3ed', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="channel-name" ref={channelNameRef}>
            &nbsp;&nbsp; {friendUserName}
            <Search toggleOverlay={toggleOverlay} currChannelName={friendUserName} messages={messages} />
            {/* <Settings /> */}
        </div>
        
        {/* <div class="scroll"> */}
        <div id="container" ref={containerRef} style={{ flex: 1, overflowY: 'auto' }}>
            <p class="welcome">
                Chat with {friendUserName}!
            </p>
            <p class="welcome-sub">
                Feel free to send the first message to get started.
            </p>
            <div class='all-messages'>
                {messages.map((message, index) => (
                <Message
                    key={message.timestamp}
                    sender={message.sender}
                    timestamp={message.timestamp}
                    message={message.message}
                    userProfilePicture={message.userProfilePicture}
                    currentUserName={currUserName}
                    onDelete={handleDeleteMessage}
                    messageID={message._id}
                />
                ))}
            </div>
            
        </div>
        <div class="message-form" ref={footerRef} disabled={isOverlayActive}>
            <div class="message-div" style={{borderRadius: "5em", backgroundColor: isOverlayActive ? 'black' : '#fff3ed', opacity: isOverlayActive ? 0.3: 1, cursor: isOverlayActive ? 'not-allowed': 'auto'}} disabled={isOverlayActive}>
            <textarea
                placeholder={`Message ${friendUserName}`}
                value={newMessage}
                onChange={(e) => {
                    setNewMessage(e.target.value);
                    autoResizeTextarea(e.target);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); // Prevents the default behavior (e.g., line break)
                        if (newMessage.trim() !== "") {
                            sendNewMessage();
                          }
                        // sendNewMessage(newMessage, setMessages, setNewMessage);
                    }
                }}
                rows="1" // Initially set to one row
                // style={{ resize: 'none' }} 
                // ref={(textarea) => autoResizeTextarea(textarea)}
                ref={(textarea) => autoResizeTextarea(textarea)}
                // Disable the textarea when the overlay is active
                disabled={isOverlayActive}
            />
                
                <button disabled={isOverlayActive} onClick={() => {
                  console.log("all messages: ", messages)
                  sendNewMessage()}}>
                <FaArrowRight /> {/* Use the arrow icon */}
                </button>
                {/* <button onClick={sendNewMessage}>Send</button> */}
            </div>
        </div>
    </div>
    //     </div>
    // </div>
    // </div>
  );
}

export default MessagingDM;
