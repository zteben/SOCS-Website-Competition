require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/temp');

const connection = mongoose.connection;

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const messageRoutes = require('./routes/messages');
app.use('/messages', messageRoutes);

const channelRoutes = require('./routes/channels');
app.use('/channels', channelRoutes);


const friendsRoutes = require('./routes/friends');
app.use('/api/friends', friendsRoutes);

const boardRoutes = require('./routes/boards');
app.use('/boards', boardRoutes);

const isAdminRoutes = require('./routes/isAdmin');
app.use('/isAdmin', isAdminRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
