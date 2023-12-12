// copy pasted from sendnewmessage
export function sendEditedMessage(newMessage, setMessages, setNewMessage) {
    const trimmedMessage = newMessage.replace(/\s*$/, '');
    
    if (trimmedMessage !== "") {
      const newMessageObject = {
        messageId: Math.random(),
        message: trimmedMessage,
        userId: 69, // Replace with the actual user ID
        username: "Isa", // Replace with the actual username
        timestamp: Date.now(),
        "userProfilePicture": 'https://i.pinimg.com/736x/04/8b/8d/048b8dbc061a104f266176b1b7bf828c.jpg'
      };
  
      setMessages((messages) => [...messages, newMessageObject]);
      setNewMessage('');
    }
  }