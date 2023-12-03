const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/password', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username});
        res.json({password: user.password});

    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;