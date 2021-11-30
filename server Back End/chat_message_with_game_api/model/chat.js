const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({

const chatSchema = new mongoose.Schema({
    ids:{
        type:Array
    },
    chat:[{
        send_by:{type:String},
        text:{type:String},
        date:{type:String,default: Date.now},
    }]
})

const Chat = new mongoose.model('Chat',chatSchema)
// const User = new mongoose.model('User',userSchema)

module.exports = Chat;