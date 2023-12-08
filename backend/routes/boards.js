const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Board = require('../models/Board');
const BoardChannel = require('../models/BoardChannel');
const BoardMember = require('../models/BoardMember');
const authenticateToken = require('../middleware/authenticateToken');

//get board
router.get('/getBoard', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findOne({ username: req.user.username });
    console.log(user);
    if (!name) {
      return res.status(400).json({ error: 'Board name is required' });
    }

    const board = await Board.findOne({ name: name });
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    if (!(await BoardMember.findOne({ user: user._id, board: board._id }))) {
      return res
        .status(403)
        .json({ error: 'You are not a member of this board' });
    }
    res.json(board);
  } catch (error) {
    console.error('Error fetching board data:', error);
    res.status(500).send('Internal Server Error');
  }
});

//get boards
router.get('/getAllBoards', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const boards = await BoardMember.find({ user: user._id });
    res.json(boards);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).send('Internal Server Error');
  }
});

// get all boards names
router.get('/getAllBoardNames', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });

    // Find all board memberships for the user
    const boardMemberships = await BoardMember.find({ user: user._id });

    // Extract board IDs from the memberships
    const boardIds = boardMemberships.map((membership) => membership.board);

    // Fetch details for all boards based on the IDs
    const boards = await Board.find({ _id: { $in: boardIds } });

    // Create an array of objects with key "name" and board names as values
    const boardNames = boards.map((board) => ({ name: board.name }));

    res.json(boardNames);
  } catch (error) {
    console.error('Error fetching user boards:', error);
    res.status(500).send('Internal Server Error');
  }
});

// create board
router.post('/createBoard', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;

    if (await Board.findOne({ name: name })) {
      return res.status(400).send('boardname already exists');
    }
    const newBoard = new Board({ name: name });
    const savedBoard = await newBoard.save();

    const user = await User.findOne({ username: req.user.username });
    const newBoardMember = new BoardMember({
      user: user._id,
      board: savedBoard._id,
      isAdmin: true,
    });
    const savedBoardMember = await newBoardMember.save();
    res.json(savedBoard);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).send('Internal Server Error');
  }
});

// delete board
router.delete('/deleteBoard', authenticateToken, async (req, res) => {
  try {
    const { boardname } = req.body;
    const board = await Board.findOne({ name: boardname });

    // Check if the user has the necessary permissions to delete the board
    const user = await User.findOne({ username: req.user.username });
    const isAdmin = await BoardMember.findOne({
      user: user._id,
      board: board._id,
      isAdmin: true,
    });

    if (!isAdmin) {
      return res
        .status(403)
        .send('You do not have permission to delete the board.');
    }

    // Delete the board
    const deletedBoard = await Board.findOneAndDelete({ _id: board._id });

    if (!deletedBoard) {
      return res.status(404).send('Board not found.');
    }

    // Also delete related board members
    await BoardMember.deleteMany({ board: board._id });

    res.status(200).send('Board deleted successfully.');
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).send('Internal Server Error');
  }
});

// add member
router.post('/addMember', authenticateToken, async (req, res) => {
  try {
    const { username, name } = req.body; // username of person to add
    const user_to_add = await User.findOne({ username: username });
    const user = await User.findOne({ username: req.user.username });
    const board = await Board.findOne({ name: name });
    // chedk if board exists
    if (!board) {
      return res.status(404).send('board does not exist');
    }
    //check if user exists
    if (!user_to_add) {
      return res.status(404).send('user does not exist');
    }
    // check if user is already a member
    if (
      await BoardMember.findOne({ user: user_to_add._id, board: board._id })
    ) {
      return res.status(400).send('already a member');
    }
    // check if its an admin calling the function
    const isAdmin = await BoardMember.findOne({
      user: user._id,
      board: board._id,
      isAdmin: true,
    });
    if (!isAdmin) {
      res.status(400).send('you are not an admin');
    }

    //add member

    const newBoardMember = new BoardMember({
      user: user_to_add._id,
      board: board._id,
      isAdmin: false,
    });
    const savedBoardMember = await newBoardMember.save();
    res.json(newBoardMember);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).send('Internal Server Error');
  }
});

// remove member
router.delete('/deleteMember', authenticateToken, async (req, res) => {
  try {
    const { username, name } = req.body; // username of person to delete, name of board
    const user_to_delete = await User.findOne({ username: username });
    const user = await User.findOne({ username: req.user.username });
    console.log(user_to_delete);
    const board = await Board.findOne({ name: name });
    console.log(board);
    // chedk if board exists
    if (!board) {
      return res.status(404).send('board does not exist');
    }
    //check if user exists
    if (!user_to_delete) {
      return res.status(404).send('user does not exist');
    }
    // check if user is already a member
    if (
      await !BoardMember.findOne({ user: user_to_delete._id, board: board._id })
    ) {
      return res.status(400).send('not a member');
    }
    // check if its an admin calling the function
    const isAdmin = await BoardMember.findOne({
      user: user._id,
      board: board._id,
      isAdmin: true,
    });
    if (!isAdmin) {
      res.status(400).send('you are not an admin');
    }

    //delete member

    const deleteMember = await BoardMember.findOneAndDelete({
      user: user_to_delete.id,
      board: board._id,
    });

    if (!deleteMember) {
      return res.status(404).send('Board not found.');
    }
    res.status(200).send('Board deleted successfully.');
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).send('Internal Server Error');
  }
});
// leave
// router.delete('/leaveBoard', authenticateToken, async (req, res) => {
//     try {
//         const {boardname} = req.body;
//         const board = await Board.findOne({ name: boardname});
//         if (!board) {
//             return res.status(404).send('Board not found.' );
//         }
//         // Check if the user has the necessary permissions to delete the board
//         const user = await User.findOne({ username: req.user.username });
//         const boardMember = await BoardMember.findOne({ user: user._id, board: board._id });

//         if (!boardMember) {
//             return res.status(403).send('You are not a member of this board.');
//         }

//         // Check if the user is the owner (admin)
//         if (boardMember.isAdmin) {
//             return res.status(403).send('You cannot leave as the owner.');
//         }

//         //leave the board
//         const leaveboard = await BoardMember.deleteOne({ user: user._id, board: board._id });

//         res.status(200).send( 'Left board successfully.' );

//     } catch (error) {
//         console.error('Error fetching user information:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// add channel

// remove channel

module.exports = router;
