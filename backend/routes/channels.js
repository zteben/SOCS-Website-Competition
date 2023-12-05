const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Channel = require('../models/Channel')
const MessageDM = require('../models/MessageDM')
const MessageCH = require('../models/MessageCH')
const authenticateToken = require('../middleware/authenticateToken');



router.get('/getChannel', authenticateToken, async (req, res) => {
    try {
        const { channelName } = req.body;
        // console.log("BONK")
        const currChannel = await Channel.findOne({ name: channelName});
        // const currChannel = await Channel.findOne({ name: req.channel.name});
        res.json({currChannel});

    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/createChannel', authenticateToken, async (req, res) => {
   try {
    // console.log("BONK")
    const { channelName } = req.body;
    const newChannel = new Channel({name: channelName});
    const savedChannel = await newChannel.save();
    res.status(201).json(savedChannel);

   } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).send('Internal Server Error');
}
});

// rename channel

// delete channel

module.exports = router;
