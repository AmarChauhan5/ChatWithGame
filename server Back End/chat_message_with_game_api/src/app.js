const express = require('express');
const app = express();
require('../db/connection')
const routerUser = require("../router/user");
const routerChat = require("../router/chat")
const cors = require('cors')
const http = require('http')
const socketIO = require("socket.io");
const chat = require('../model/chat')
const cookieParser = require('cookie-parser')
const user = require('../model/user')

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            
}
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())
app.use(routerUser);
app.use(routerChat);

const server=http.createServer(app);
const io=socketIO(server);
app.set("socket",io);

io.on("connection",(socket)=>{
  console.log("Socket connection done...")
      
  socket.on('my_id',(data)=>{
    socket.my_database_id = data;
    socket.join(data);
    const users = [];
    for (let [id,socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        myDataBaseId: socket.my_database_id,
        });
      }
  })
  
  socket.on('send message',async (data)=>{
    const ids = [data.id.my_id,data.id.id]
    data1 = await chat.findOneAndUpdate({ids:{$all:ids}}, { $push: { chat: {
            send_by:data.id.my_id,
            text:data.text,
        } } })
    let cus_data ={text:data.text,id:data.id,name:data.name}
    // io.to(data.id.my_id).to(data.id.id).emit('send message response',cus_data);
    io.to(data.id.id).emit('send message response',cus_data);
    io.to(data.id.my_id).emit('send message response',cus_data);
  })

  socket.on("send game request",(data)=>{
    io.to(data.id.my_id).emit('requesting',data);
    io.to(data.id.id).emit('accept game request',data);
  })

  socket.on("start game",(data)=>{
      io.to(data.id.my_id).to(data.id.id).emit('start game',data);
  })

  socket.on("button click",(data)=>{
      io.to(data.id.my_id).to(data.id.id).emit('get_X',data)    
  })

  socket.on("send winner",(data)=>{
    io.to(data.id.my_id).to(data.id.id).emit('winner',data);
  })

  socket.on("disconnect",async ()=>{
    const date =  Date.now()
    const upDate_date = await user.findOneAndUpdate({_id:socket.my_database_id},{date})
    console.log("User disconnected.",socket.id,socket.my_database_id);
  })

})

server.listen(2536,()=>{
  console.log(`Connection is setup at 2536`);
})
