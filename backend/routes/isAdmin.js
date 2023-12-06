const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Board = require('../models/Board');
const BoardChannel = require('../models/BoardChannel');
const BoardMember = require('../models/BoardMember');
const authenticateToken = require('../middleware/authenticateToken');

// isAdmin.js
router.post('/checkAdminStatus', authenticateToken, async (req, res) => {
  try {
    const { name } = req.query; // Changed req.body to req.query
    const user = await User.findOne({ username: req.user.username });

    if (!name) {
      return res.status(400).json({ error: 'Board name is required' });
    }

    const board = await Board.findOne({ name: name });
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    const isAdmin = await BoardMember.findOne({
      user: user._id,
      board: board._id,
      isAdmin: true,
    });

    res.json({ isAdmin: !!isAdmin }); // Convert isAdmin to a boolean
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
