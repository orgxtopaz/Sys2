//schema represents the structure of a particular document

const mongoose =require('mongoose');
const Schema = mongoose.Schema;


const attendanceSchema = new Schema({
  
    email:{
     
        type:String,
        trim:true , // removing the first space in value input  
        unique:false 
      

    },
    timeIn:{
        type:String,
        trim:true  // removing the first space in value input 

    },
    timeOut:{
        type:String,
        trim:true  // removing the first space in value input 

    },
    totalHours:{
        type:String,
        trim:true  // removing the first space in value input 

    },
    date:{
        type:String,
        trim:true  // removing the first space in value input 

    }
   



},{timestamps:true})// date  and time of the data being passed

      
   


const Attendance= mongoose.model('attendance',attendanceSchema);

module.exports = Attendance;