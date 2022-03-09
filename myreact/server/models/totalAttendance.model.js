//schema represents the structure of a particular document

const mongoose =require('mongoose');
const Schema = mongoose.Schema;


const totalattendanceSchema = new Schema({
    fullname:{
     
        type:String,
        trim:true , // removing the first space in value input  
        unique:false 
      

    },
    email:{
     
        type:String,
        trim:true , // removing the first space in value input  
        unique:false 
      

    },
    position:{
     
        type:String,
        trim:true , // removing the first space in value input  
        unique:false 
      

    },
  
    overallTotalHours:{
        type:Number,
        trim:true  // removing the first space in value input 

    },
    overallTotalDays:{
        type:Number,
        trim:true  // removing the first space in value input 

    },
    
    
    date:{
        type:String,
        trim:true  // removing the first space in value input 

    }
   



},{timestamps:true})// date  and time of the data being passed

      
   


const exportTotalAttendance= mongoose.model('totalattendance',totalattendanceSchema);

module.exports = exportTotalAttendance;