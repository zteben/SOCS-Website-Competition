const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Channel = require('../models/Channel')
const MessageDM = require('../models/MessageDM')
const MessageCH = require('../models/MessageCH')
const authenticateToken = require('../middleware/authenticateToken');
const Board = require('../models/Board');
const BoardChannel = require('../models/BoardChannel');



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


// get all channels of board
router.get('/getAllChannel/:boardid', authenticateToken, async (req, res) => {
    try {
        const { boardid } = req.params;
        const currBoard = await Board.findById({ _id: boardid });

        if (!currBoard) {
            return res.status(404).json({ error: 'Board not found' });
        }

        const currentBoardChannels = await BoardChannel.find({ board: currBoard._id });
        const ChannelsId = currentBoardChannels.map((boardchannel) => boardchannel.channel);
        res.json(currentBoardChannels);
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
    const channelexist = await Channel.findOne({ channelname: channelname }); 
    const board = await Board.findById({ _id: boardid });
    if (channelexist) {
        return res.status(400).send('Channel already exists');
    }
    if (!board) {
        return res.status(404).send('Board not found');
    }
    const newChannel = new Channel({channelname: channelname});
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