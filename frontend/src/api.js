import axios from 'axios'


const backendUrl = 'http://localhost:3000'; // Replace with your actual backend URL
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwiaWF0IjoxNzAxNzIyMzM0LCJleHAiOjE3MDE4MDg3MzR9.tQk4gkGriHRlYTfd6R-_Y1_iJLG3A7uhLCaVeD5FE18'; 

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function getUserData(userID) {
  try {
    const response = await axios.get(`${backendUrl}/users/getAllUserInfo`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        _id: userID
      }
    });

    // Assuming the response structure is like { data: { profilePic, username, ... }, status: 'success' }
    const responseData = response.data;

    // Extracting relevant data from the response

    return responseData;

    // return { pfp, username }

  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  } 
}

async function sendChannelMessage(sender, receiver, message, timestamp) {
  try {
    console.log('Sending message for channel');

    const postData = {
      sender: sender,
      receiver: receiver,
      message: message,
      timestamp: timestamp
    };

    const response = await axios.post(`${backendUrl}/messages/sendCH`, postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
      
    });

    console.log("HEWWO?")

    const savedMessage = response.data;
    console.log('Saved Message:', savedMessage);

    // const messages = response.data;

    // console.log('Fetched messages:', messages);

  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  } 
}


async function fetchChannelMessages(currChannelName) {
  try {
    // console.log('Fetching messages for channel:', currChannelName);

    const response = await axios.get(`${backendUrl}/messages/getCHs`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        channelName: currChannelName
      }
    });

    // console.log("HEWWO?")

    const messages = response.data;

    // console.log('Fetched messages:', messages);

    return messages;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

export { getUserData, sendChannelMessage, fetchChannelMessages };
