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

router.get('/getAllUserInfo', authenticateToken, async (req, res) => {
    try {
        // console.log("getAllUserInfo")
        // const { userId } = req.query;
        // console.log("userId")
        // console.log(userId)
        const user = await User.findOne(req.query);
        
        res.json(user);

    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/getUserIdByUsername', authenticateToken, async (req, res) => {
    try {
        const { username } = req.query;

        // Assuming there is a 'username' field in your User schema
        const user = await User.findOne({ username });

        if (user) {
            res.json({ user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        console.error('Error fetching user ID by username:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;