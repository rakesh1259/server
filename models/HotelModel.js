const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0");
const yyyy = today.getFullYear();

var currentOffset = today.getTimezoneOffset();
var ISTOffset = 330;   // IST offset UTC +5:30 
var ISTTime = new Date(today.getTime() + (ISTOffset + currentOffset)*60000);
var hoursIST = ISTTime.getHours()
var minutesIST = ISTTime.getMinutes()

const currentDate =  dd + "-" + mm + "-" + yyyy + " at "+hoursIST + ":" + minutesIST;
const mongoose = require('mongoose');
const hoteltemplate = new mongoose.Schema({
    location:{
        type:String,
        required:true
    },
    TypeofRoom:{
        type:String,
        required:true
    },
    checkin:{
        type: String,
         default: currentDate,
        required:true
    },
    checkout:{
        type: String,
         default: currentDate ,
        required:true
    },
    Guests:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('hotels',hoteltemplate)