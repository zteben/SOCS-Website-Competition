const mongoose = require('mongoose');
const boardChannelSchema = new mongoose.Schema(
    {  
    channel:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Channel",
        required: true,
    },
    board:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Board",
        required: true,
    },
    
    

  });
      
const BoardChannel = mongoose.model('BoardChannel', boardChannelSchema);

module.exports = BoardChannel;