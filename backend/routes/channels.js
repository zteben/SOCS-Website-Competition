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
router.get('/getChannel/:channelid', authenticateToken, async (req, res) => {
    try {
        const { channelid } = req.params;
        const currChannel = await Channel.findById({ _id: channelid });
        if (!currChannel) {
            return res.status(404).json({ error: 'Channel not found' });
        }
        const channelName = currChannel.channelname;
        
        res.json(channelName);

    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/createChannel', authenticateToken, async (req, res) => {
   try {
    // console.log("BONK")
    const { channelname, boardid } = req.body;
    console.log(channelname, boardid);
    const channelexist = await Channel.findOne({ name: channelname }); 
    const board = await Board.findById({ _id: boardid });
    if (channelexist) {
        return res.status(400).send('Channel already exists');
    }
    if (!board) {
        return res.status(404).send('Board not found');
    }
    const newChannel = new Channel({name: channelname});
    const savedChannel = await newChannel.save();
    
    const newBoardChannel = new BoardChannel({channel: savedChannel._id, board: board._id});
    const savedBoardChannel = await newBoardChannel.save();
    if (!savedChannel || !savedBoardChannel) {
        return res.status(400).send('Error creating channel');
    }


    res.status(201).json(savedChannel);

   } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).send('Internal Server Error');
}
});
// rename channel

// delete channel

module.exports = router;
