const express = require("express");
const router = express.Router();
const chat = require('../model/chat')

router.post("/chats", async (req,res)=>{
    const my_id = req.body.my_id
    const id = req.body.id
    const ids = [id,my_id]
    var data = await chat.findOne({ids:{$all:ids}}) 
        if(data===null){
                //Create Data
            const welcome_data = {
            ids:[my_id,id],
            chat:[{
                send_by:"welcome Text",
                text:"connected ,You can chat to each other."
            }]
        }
    
        const Chat = new chat(welcome_data)
        data = await Chat.save();
    }
    res.status(200).send({data})
})

module.exports = router;