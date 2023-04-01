const mongoose = require('mongoose');
const contacttemplate = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    Message:{
        type: String,
         required:true
      
    }
})
module.exports=mongoose.model('contacts',contacttemplate)