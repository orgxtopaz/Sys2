//schema represents the structure of a particular document

const mongoose =require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const Schema = mongoose.Schema;


const travelLogSchema = new Schema({
  
    email:{
     
        type:String,
        trim:true , // removing the first space in value input  
        unique:false 
    },
    fullname:{
        type:String,
        trim:true  // removing the first space in value input 

    },
    date:{
        type:String,
        trim:true  // removing the first space in value input 

    },
    position:{
        type:String,
        trim:true  // removing the first space in value input 

    },
  
    purpose:{
        type:String,
        trim:true  // removing the first space in value input 

    }
   



},{timestamps:true})// date  and time of the data being passed

      
   
autoIncrement.initialize(mongoose.connection);
travelLogSchema.plugin(autoIncrement.plugin, {
    model: "travellogs", // collection or table name in which you want to apply auto increment
    field: "_id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
  });

const travelLog= mongoose.model('travelLog',travelLogSchema);

module.exports = travelLog;