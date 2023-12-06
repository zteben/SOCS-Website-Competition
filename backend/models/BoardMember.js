const mongoose = require('mongoose');
const boardmemberSchema = new mongoose.Schema(
    {  
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    board:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Board",
        required: true,
    },
    isAdmin:{
        type: Boolean,
        required: true,
    }
    

  });
      
const BoardMember = mongoose.model('BoardMember', boardmemberSchema);

module.exports = BoardMember;