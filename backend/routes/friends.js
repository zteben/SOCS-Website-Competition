// TODO: TEST THESE IN POSTMAN
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const User = require('../models/User');
const Friend = require('../models/Friend');

// Route to SEND a friend request
router.post('/send-friend-request', authenticateToken, async (req, res) => {
  //check not alr friends: very important. Ordering.
  //add the two users as user 1 and 2
  try {
    const loggedInUser = await User.findOne({ username: req.user.username });
    // Extract friendUsername from the request body
    const friendUsername = req.body.friendUsername;
    const friendUser = await User.findOne({ username: friendUsername });

    if (!friendUser) {
      return res.status(404).json({ error: 'Friend not found' });
    }
    // Check if the users are already friends
    const existingFriendship = await Friend.findOne({
      $or: [
        { $and: [{ user1: loggedInUser._id }, { user2: friendUser._id }] },
        { $and: [{ user1: friendUser._id }, { user2: loggedInUser._id }] },
      ],
    });

    if (existingFriendship) {
      return res.status(400).json({ error: 'Users are already friends' });
    }

    // Create a new friend request
    const newFriendship = new Friend({
      user1: loggedInUser._id,
      user2: friendUser._id,
      status: 'pending',
    });
    await newFriendship.save();

    res.json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to ACCEPT a friend request
router.post('/accept-friend-request', authenticateToken, async (req, res) => {
  // check for pair in db (with status pending)
  // change status to accept
  // Route to accept a friend request
  try {
    const loggedInUser = await User.findOne({ username: req.user.username });
    const friendId = req.body.friendId; // Extract friendId from the request body

    // Find the pending friend request
    const friendRequest = await Friend.findOne({
      $and: [
        {
          $or: [
            { $and: [{ user1: loggedInUser._id }, { user2: friendId }] },
            { $and: [{ user1: friendId }, { user2: loggedInUser._id }] },
          ],
        },
        { status: 'pending' }, // Ensure the status is 'pending'
      ],
    });

    if (!friendRequest) {
      return res
        .status(404)
        .json({ error: 'Pending friend request not found' });
    }

    // Update the status to 'accepted'
    friendRequest.status = 'accepted';
    await friendRequest.save();

    res.json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to GET user's FRIENDS
router.get('/friends', authenticateToken, async (req, res) => {
  // store user's objectID in a variable
  // with user's objectID, search for it in data of all pairs of friends (the user's objectID can either be user1 or user2) You can use the function .findMany()
  // check if the status is 'accepted'
  // filter to get the objectid of the other users
  // return (res.json)
  try {
    // Find the user based on the provided username in the token
    const user = await User.findOne({ username: req.user.username });
    // Get the user's ObjectId
    const userId = user._id;
    // Find all friendship records where the user is involved (as user1 or user2) and the status is 'accepted'
    const friendships = await Friend.find({
      $and: [
        { $or: [{ user1: userId }, { user2: userId }] },
        { status: 'accepted' },
      ],
    });
    // Extract the friend's ObjectId from each friendship
    const friendIds = friendships.map((friendship) =>
      userId.equals(friendship.user1) ? friendship.user2 : friendship.user1
    );
    // Find the corresponding user objects for the friendIds
    const friends = await User.find({ _id: { $in: friendIds } });
    res.json({ friends });
  } catch (error) {
    console.error('Error fetching user friends:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to DELETE a friend
router.delete('/delete-friend', authenticateToken, async (req, res) => {
  try {
    const loggedInUser = await User.findOne({ username: req.user.username });
    const friendId = req.body.friendId; // Extract friendId from the request body

    // Delete the friend relationship
    const result = await Friend.deleteMany({
      $or: [
        { $and: [{ user1: loggedInUser._id }, { user2: friendId }] },
        { $and: [{ user1: friendId }, { user2: loggedInUser._id }] },
      ],
    });

    // if not friend to begin with
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Friend relationship not found' });
    }

    res.json({ message: 'Friend deleted successfully' });
  } catch (error) {
    console.error('Error deleting friend:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
