const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const authenticate = require('../middleware/authenticateToken');

// Register user
router.post('/register', async (req, res) => {
  try {
    if (await User.findOne({ username: req.body.username })) {
      return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user == null) {
      return res.status(400).send('Cannot find user');
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      const payload = { username: user.username };
      const accessToken = generateAccessToken(payload);
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.status(400).send('Not Allowed');
    }
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Refresh token
router.post('/token', async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    const tokenExists = await Token.findOne({ token: refreshToken });
    if (!tokenExists) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ username: user.username });
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Logout user
// router.delete('/logout', async (req, res) => {
//   try {
//     await Token.deleteMany({ token: req.body.token });
//     res.sendStatus(204);
//   } catch (error) {
//     console.error('Error removing token:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
router.delete('/logout', authenticate, async (req, res) => {
  try {
    // Delete the refresh token from the database
    await Token.deleteMany({ token: req.header('Authorization') });

    res.sendStatus(204);
  } catch (error) {
    console.error('Error removing token:', error);
    res.status(500).send('Internal Server Error');
  }
});

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h',
  });
}

module.exports = router;
