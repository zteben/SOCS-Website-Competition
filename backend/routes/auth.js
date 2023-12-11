const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const authenticate = require('../middleware/authenticateToken');
const authenticateToken = require('../middleware/authenticateToken');

// Register user
router.post('/register', async (req, res) => {
  try {
    // Validate username and password
    const username = req.body.username.trim();
    if (!username || username.length < 4) {
      return res.status(400).send('Invalid username');
    }

    if (await User.findOne({ username: username })) {
      return res.status(400).send('Username already exists');
    }

    const password = req.body.password;
    if (!password || password.length < 6) {
      return res.status(400).send('Invalid password');
    }

    // Create User document
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
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
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
     if (!user) {
      return res.status(400).send('Incorrect username or password');
    }

    // Authenticate user & send tokens
    if (await bcrypt.compare(password, user.password)) {

      let existingToken = await Token.findOne({ username: user.username });

      const payload = { username: user.username };
      const accessToken = generateAccessToken(payload);

      if (!existingToken) {
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
        const newToken = new Token({ username: user.username, token: refreshToken });
        await newToken.save();
        existingToken = newToken;
      }

      res.status(200).json({ accessToken: accessToken, refreshToken: existingToken.token });

    } else {
      res.status(401).send('Incorrect username or password');
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
    if (!refreshToken) return res.sendStatus(401);
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
router.delete('/logout', authenticateToken, async (req, res) => {
  try {
    // Delete the refresh token from the database
    await Token.deleteMany({ username: req.user.username});
    res.sendStatus(204);

  } catch (error) {
    console.error('Error removing token:', error);
    res.status(500).send('Internal Server Error');
  }
});

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
}

module.exports = router;
