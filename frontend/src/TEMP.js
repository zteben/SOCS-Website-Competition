import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
// import axios from 'axios';
import './TEMP.css';
import { FaArrowRight } from 'react-icons/fa'; 
import Message from './components/Message';
import { autoResizeTextarea } from './utils/AutoResizeTextArea';
import { sendNewMessage } from './utils/SendNewMessage';
// import { IoIosSettings } from "react-icons/io";
import { fetchChannelMessages } from './api';
import Settings from './components/Settings'; 

// import { fetchMessages } from './api';

const socket = io('mongodb://localhost:27017');


function TEMP() {


const [channel, setChannel] = useState({
    "name": "general",
});
  

// const [channel, setChannel] = useState([]);
const [messages, setMessages] = useState([]);  // Define messages and setMessages
  const [newMessage, setNewMessage] = useState('');

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

  useEffect(() => {
    // Measure the height of the footer and set it
    const footer = footerRef.current;
    if (footer) {
      setFooterHeight(footer.getBoundingClientRect().height);
    }

    // Measure the height of the channel name div and set it
    const channelName = channelNameRef.current;
    if (channelName) {
      setChannelNameHeight(channelName.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    // Set the container height dynamically based on the footer height
    const container = containerRef.current;
    if (container) {
        container.style.height = `calc(100% - ${footerHeight + channelNameHeight}px)`;
    }
  }, [footerHeight]);
  

  useEffect(() => {
    // Scroll to the bottom when the component mounts or when messages change
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch channel messages when the component mounts
        const messages = await fetchChannelMessages("general"); // HARD-CODED
        // Set the fetched messages in the state
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching channel messages:', error);
      }
    };
  
    fetchData();
  }, [channel.name]); // The dependency array ensures the effect runs only when channelName changes




  

  return (
    <div style={{backgroundColor: '#fff3ed', height: '100vh'}}>
        <div className="channel-name" ref={channelNameRef}>
            &nbsp;&nbsp;# {channel.name}
            <Settings toggleOverlay={toggleOverlay} />
            {/* <Settings /> */}
        </div>
        
        {/* <div class="scroll"> */}
        <div id="container" ref={containerRef}> 
            <p class="welcome">
                Welcome to {channel.name}!
            </p>
            <p class="welcome-sub">
                Feel free to send the first message to get started.
            </p>
            <div class='all-messages'>
                {messages.map((message) => (
                <Message
                    // key={message._id} // Don't forget to add a unique key
                    sender={message.sender}
                    timestamp={message.timestamp}
                    message={message.message}
                    userProfilePicture={message.userProfilePicture}
                />
                ))}
            </div>
            
        </div>
        <div class="message-form" ref={footerRef} disabled={isOverlayActive}>
            <div class="message-div" style={{borderRadius: "5em", backgroundColor: isOverlayActive ? 'black' : '#fff3ed', opacity: isOverlayActive ? 0.3: 1, cursor: isOverlayActive ? 'not-allowed': 'auto'}} disabled={isOverlayActive}>
            <textarea
                placeholder={`Message #${channel.name}`}
                value={newMessage}
                onChange={(e) => {
                    setNewMessage(e.target.value);
                    autoResizeTextarea(e.target);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); // Prevents the default behavior (e.g., line break)
                        if (newMessage.trim() !== "") {
                            sendNewMessage(newMessage, channel.name, setMessages, setNewMessage);
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
                
                <button disabled={isOverlayActive} onClick={() => sendNewMessage(newMessage, setMessages, setNewMessage)}>
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

export default TEMP;
