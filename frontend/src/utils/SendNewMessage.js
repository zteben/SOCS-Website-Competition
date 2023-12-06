import { sendChannelMessage } from './../api'

export function sendNewMessage(newMessage, currChannel, currUser, setMessages, setNewMessage) {
    const trimmedMessage = newMessage.replace(/\s*$/, '');
    
    if (trimmedMessage !== "") {
      const sender = currUser // currUser is user.username
      const receiver = currChannel // currChannel is channel.name
      const message = trimmedMessage
      const timestamp = Date.now()

      sendChannelMessage(sender, receiver, message, timestamp)

      const newMessageObject = {
        message: trimmedMessage,
        username: currUser, // Replace with the actual username
        timestamp: Date.now(),
        "userProfilePicture": ''
      };
      
      
      setMessages((messages) => [...messages, newMessageObject]);
      setNewMessage('');
    }
  }