const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Board = require('../models/Board');
//const BoardChannel = require('../models/BoardChannel')
const BoardMember = require('../models/BoardMember')
const authenticateToken = require('../middleware/authenticateToken');

// create board
router.post('/createBoard', authenticateToken, async (req, res) => {
    try {
        const {name} = req.body;
        const newBoard = new Board({ name: name });
        const savedBoard = await newBoard.save();

        const user = await User.findOne({ username: req.user.username});
        const newBoardMember = new BoardMember({user: user._id, board: savedBoard._id, isAdmin: true});
        const savedBoardMember = await newBoardMember.save();
        res.json(savedBoard);

    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});

// delete board

// add member
// router.post('/addMember', authenticateToken, async (req, res) => {
//     try {
//         // check if user is admin
//         const {username, boardname} = req.body; // username of person to add
//         // 

//     } catch (error) {
//         console.error('Error fetching user information:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// remove member

// leave

// add channel

// remove channel

module.exports = router;
