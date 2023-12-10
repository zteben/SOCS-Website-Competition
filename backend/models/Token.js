const mongoose = require('mongoose');
const tokenSchema = new mongoose.Schema(
    {  
        username: {type: String},
        token: {type: String}
});
      
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;