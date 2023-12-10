const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Channel = require('../models/Channel')
const MessageDM = require('../models/MessageDM')
const MessageCH = require('../models/MessageCH')
const authenticateToken = require('../middleware/authenticateToken');

router.post('/sendDM', authenticateToken, async (req, res) => {
    try {
        const { sender, receiver, timestamp, message } = req.body;
        const user1 = await User.findOne({ username: sender});
        const user2 = await User.findOne({ username: receiver});

        const newMessage = new MessageDM({message: message, sender: user1._id, receiver: user2._id, timestamp: timestamp});
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);

    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});

// put to edit message

// delete to deltete message
// DELETE route to delete a direct message by content


// get findMany() for all the dms between user1 and 2
// GET route to retrieve all direct messages between user1 and user2
router.get('/getDMs', authenticateToken, async (req, res) => {
    try {
        const { username1, username2 } = req.query;
        const user1 = await User.findOne({ username: username1});
        const user2 = await User.findOne({ username: username2});
        const messages = await MessageDM.find({ 
            $or: [ { sender: user1._id, receiver: user2._id },
                 { sender: user2._id, receiver: user1._id } ]
        });
        res.json(messages);
        // console.log("bonk");

    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});


// send to to frontend

// Same thing for channel
router.post('/sendCH', authenticateToken, async (req, res) => {
    try {
        const { sender, receiver, message, timestamp } = req.body;
        console.log("send CH")
        const user1 = await User.findOne({ username: sender});
        const currChannel = await Channel.findOne({ name: receiver});

        const newMessage = new MessageCH({message: message, sender: user1._id, channel: currChannel._id, timestamp: timestamp});
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);

    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.delete('/deleteCH', authenticateToken, async (req, res) => {
    try {
      const { deletedMessageID } = req.query;
  
      // Use Mongoose's deleteOne to delete the message by ID
      const deletedMessage = await MessageCH.deleteOne({ _id: deletedMessageID });
  
      // Check if the message was found and deleted
      if (deletedMessage.deletedCount === 1) {
        // Message was deleted successfully
        res.status(200).send('Message deleted successfully');
      } else {
        // Message was not found
        res.status(404).send('Message not found');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  
  router.delete('/deleteDM', authenticateToken, async (req, res) => {
    try {
      const { deletedMessageID } = req.query;
  
      // Use Mongoose's deleteOne to delete the message by ID
      const deletedMessage = await MessageDM.deleteOne({ _id: deletedMessageID });
  
      // Check if the message was found and deleted
      if (deletedMessage.deletedCount === 1) {
        // Message was deleted successfully
        res.status(200).send('Message deleted successfully');
      } else {
        // Message was not found
        res.status(404).send('Message not found');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).send('Internal Server Error');
    }
  });

router.get('/getCHs', authenticateToken, async (req, res) => {
    try {
        // console.log("first")
        const { channelName } = req.query;
        // const { channelName } = req.body;
        const currChannel = await Channel.findOne({ name: channelName});
        // console.log("currChannel")
        // console.log(currChannel);
        const messages = await MessageCH.find(
            { channel: currChannel._id }
        );
        // console.log("messages");
        // console.log(messages);
        res.json(messages);
        // console.log("bonk");

    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;