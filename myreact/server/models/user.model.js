//schema represents the structure of a particular document

const mongoose =require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    fullname:{
        type:String,
        required:true,
        trim:true  // removing the first space in value input 

    },
    email:{

        type:String,
        required:true,
        trim:true , // removing the first space in value input   
        unique:true //

    },
    contactNumber:{

        type:String,
        required:true,
        trim:true  // removing the first space in value input     

    },

   
    password:{

        type:String,
        required:true,
        trim:true  // removing the first space in value input     

    },
    verified:{

        type:String,
        required:true,
        trim:true  // removing the first space in value input     

    },
    code:{

        type:String,
        required:true,
        trim:true  // removing the first space in value input     

    },
    type:{

        type:String,
        required:true,
        trim:true  // removing the first space in value input     

    },




},{timestamps:true})// date  and time of the data being passed

      
   


const User= mongoose.model('user',userSchema);

module.exports = User;