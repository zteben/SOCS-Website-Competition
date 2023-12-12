const mongoose = require('mongoose');
const messageDMSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
      },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    timestamp: {
        type: String
    },
})
      
const MessageDM = mongoose.model('MessageDM', messageDMSchema);

module.exports = MessageDM;