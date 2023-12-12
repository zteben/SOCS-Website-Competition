import { sendChannelMessage, getUserData, getUserIdByUsername } from './../api'

export async function sendNewMessage(newMessage, currChannel, currUser, setMessages, setNewMessage) {
    const trimmedMessage = newMessage.replace(/\s*$/, '');
    
    
    if (trimmedMessage !== "") {
      const sender = currUser // currUser is user.username
      const receiver = currChannel // currChannel is channel.name
      const message = trimmedMessage
      const timestamp = Date.now()

      console.log('Received message:', { sender, receiver, message, timestamp });

      // Await the asynchronous function before updating state
      var new_Id = await sendChannelMessage(sender, receiver, message, timestamp);

      // Fetch user data for the sender
      // const { userId } = await getUserIdByUsername({ username: currUser });

      /* THIS FUNCTION BELOW RETURNS UNDEFINED */
      const userId = await getUserIdByUsername(currUser)
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