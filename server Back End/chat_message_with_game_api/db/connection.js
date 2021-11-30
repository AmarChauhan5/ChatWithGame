const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chat_massage_with_game_database",).then(()=>{
    console.log('Collection Done...')
}).catch((e)=>{
    console.log("Collection Refused !",e)
})