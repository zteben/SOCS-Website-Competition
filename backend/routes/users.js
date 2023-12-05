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
        const { userId } = req.query;
        // console.log("userId")
        // console.log(userId)
        const user = await User.findOne(userId);
        // console.log("user")
        // console.log(user)
        res.json(user);

    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/getUserObject', authenticateToken, async (req, res) => {
    
})



module.exports = router;