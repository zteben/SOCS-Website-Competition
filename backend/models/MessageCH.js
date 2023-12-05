const mongoose = require('mongoose');
const messageCHSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
      },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true,
    },
    
    timestamp: {
        type: String,
        // default: Date.now,
    },
    
})
      
const MessageCH = mongoose.model('MessageCH', messageCHSchema);

module.exports = MessageCH;