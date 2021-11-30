const express = require("express");
const { set } = require("mongoose");
const router = express.Router();
const user = require('../model/user')
const haver_sin = require('./distance_of_user');
const sortedUser = require('./get_sorted_users')


router.get("/user/:lon/:lat",async (req,res)=>{
    try {

        lon1 = req.params.lon;
        lat1 = req.params.lat;
        var io = req.app.get('socket');
        const custom_user = await sortedUser(lon1,lat1,io)
        res.status(200).send(custom_user);
    } catch (e) {
        console.log(e)
    }
})

// Sign up the user
router.post("/user", async (req,res)=>{
    try {
        const User = new user(req.body)
        const save_user_in_database = await User.save();
        res.status(200).send({name:"User Created Successfully"})
    } catch (e) {
        res.status(400).send("Sign up user Can't be ceated Check server.")
    }
})

const changeDate = (date2)=> {
    const date = new Date(date2)
    const now_date = new Date();
    if(date.getDate()===now_date.getDate()){
        if(date.getHours()<12 || (date.getHours()===12 && date.getMinutes()===0 )){
                return "seen at "+(date.getHours()+":"+date.getMinutes()+" "+"AM")
            }else{
                return "seen at "+(date.getHours()-12+":"+date.getMinutes()+" "+"PM")
            }
    }else{
        return date.toDateString()
    }
}

router.post("/get_user_data", async (req,res)=>{
    try {
        const data = await user.findOne({user_name:req.cookies.user_name.login}) 
        var io = req.app.get('socket');
        const online_user = new Set();
        const u = [];
        for (let [id,socket] of io.of("/").sockets) {
            online_user.add(socket.my_database_id)
        u.push({
        myDataBaseId: socket.my_database_id,
        });
        }
        const lon1 = data.location.longitude;
        const lat1 = data.location.latitude;
        const users = await user.find();
        custom_user = users.map(currentValue => {
            lon2 = currentValue.location.longitude;
            lat2 = currentValue.location.latitude;
               details = {
                date:online_user.has(currentValue.id)?"Online":changeDate(parseInt(currentValue.date),online_user),
                my_id:data.id,
                id:currentValue.id,
                name:currentValue.user_name,
                distance:haver_sin(lon1,lat1,lon2,lat2)
               }
               return details;
        })
    
        custom_user.sort((user1,user2)=>{
            return user1.distance - user2.distance;
        });

        res.status(200).send({custom_user,data});
    } catch (error) {
        console.log(error)
    }
})

router.post("/check_login", async (req,res)=>{
   try {
    const login = req.body.login
    const password1 = req.body.password
    const location = req.body.location
    const data = await user.findOneAndUpdate({user_name:login,password:password1},{location})
    if(data!=null){
        res.status(200).cookie("user_name",{login,id:data._id}).send(true);
    }else{
        res.status(200).send(false);
    }
   }catch (error) {
       console.log("server Error",error)
   }
})

router.post("/get_my_id",async(req,res)=>{
    const data = await user.findOne({user_name:req.cookies.user_name.login}) 
    res.status(200).send(data._id);
})

module.exports = router;
