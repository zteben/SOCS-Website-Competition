const mongoose = require('mongoose');
const boardSchema = new mongoose.Schema(
    {  
    name: { type: String, required: true, unique: true }
  });
      
const Board = mongoose.model('Board', boardSchema);
    //channel: {type: String, default: "https://www.thesprucepets.com/thmb/A5Rkkt4HDWLAtUOk4gYybcX02mM=/1080x0/filters:no_upscale():strip_icc()/30078352_448703938920062_6275637137232625664_n-5b0de8c443a1030036f9e15e.jpg"},

module.exports = Board;