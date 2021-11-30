const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        minlength:4
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    location:{
        longitude:{
            type:Number
        },
        latitude:{
            type:Number
        }
    },
    date:{type:String,default: Date.now},
})

const User = new mongoose.model('User',userSchema)
module.exports = User;
