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
const flighttemplate = new mongoose.Schema({
    source:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    typeoftravel:{
        type:String,
        required:true
    },
    dateofjourney:{
        type: String,
         default: currentDate,
      
    },
    dateofreturn:{
        type: String,
        default: currentDate ,
        
    },
    passengers:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('flights',flighttemplate)