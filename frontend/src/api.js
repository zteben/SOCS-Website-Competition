import axios from 'axios'


const backendUrl = 'http://localhost:3000';
const accessToken = localStorage.getItem("accessToken") //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNvb2xQcm9mIiwiaWF0IjoxNzAyMzA4NzA4LCJleHAiOjE3MDIzOTUxMDh9.fPM-36FD-6so_VUD8fh_uMBozbLaEsJYRua5T4Y0c3Y'; 

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

    console.log("responseData: ", responseData)

    // Extracting relevant data from the response

    return responseData;

    // return { pfp, username }

  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  } 
}

async function getUserIdByUsername(username) {
  try {
    const response = await axios.get(`${backendUrl}/users/getUserIdByUsername`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        username: username
      }
    });

    const responseData = response.data;

    return responseData.user._id;

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

    // console.log("HEWWO?")

    const newId = response.data._id;
    return newId

    // const messages = response.data;

    // console.log('Fetched messages:', messages);

  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  } 
}

async function deleteCH(deletedMessageID) {
  try {
    console.log('Deleting message with ID:', deletedMessageID);

    const response = await axios.delete(`${backendUrl}/messages/deleteCH?deletedMessageID=${deletedMessageID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        deletedMessageID: deletedMessageID
      }
    })
    console.log('API Response:', response.data);

  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

async function deleteDM(deletedMessageID) {
  try {
    console.log('Deleting message with ID:', deletedMessageID);

    const response = await axios.delete(`${backendUrl}/messages/deleteDM?deletedMessageID=${deletedMessageID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        deletedMessageID: deletedMessageID
      }
    })
    console.log('API Response:', response.data);

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

async function fetchFriendMessages(friend, username) {
  try {
    // console.log('Fetching messages for channel:', currChannelName);

    const response = await axios.get(`${backendUrl}/messages/getDMs`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        username1: friend,
        username2: username
      }
    });

    const messages = response.data;

    console.log('Response for getting DMs:', response);

    return messages;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

async function sendDMsMessage(sender, receiver, timestamp, message) {
  try {
    console.log('Sending message for channel');

    const postData = {
      sender: sender,
      receiver: receiver,
      message: message,
      timestamp: timestamp
    };

    const response = await axios.post(`${backendUrl}/messages/sendDM`, postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
      
    });

    // console.log("HEWWO?")

    const newId = response.data._id;
    return newId

    // const messages = response.data;

    // console.log('Fetched messages:', messages);

  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

export { getUserData, getUserIdByUsername, sendChannelMessage, deleteCH, fetchChannelMessages, fetchFriendMessages, sendDMsMessage, deleteDM };
