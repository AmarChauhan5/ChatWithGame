const user = require('../model/user')
const haver_sin = require('./distance_of_user');
// const date2 =1552261496289;
const changeDate = (date2)=> {
    // if()
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

const sortedUser = async (lon1,lat1,io) =>{
    const users = await user.find();
        custom_user = users.map(currentValue => {
            lon2 = currentValue.location.longitude;
            lat2 = currentValue.location.latitude;

            const online_user = new Set();
            for (let [id,socket] of io.of("/").sockets) {
                online_user.add(socket.my_database_id)
        }
        // console.log("Online User Set Amar Chauhan : ",online_user)  
               details = {
                   id:currentValue._id,
                   name:currentValue.user_name,
                   distance:haver_sin(lon1,lat1,lon2,lat2),
                   date:online_user.has(currentValue.id)?"Online":changeDate(parseInt(currentValue.date),online_user),
               }
               return details;
        })

        custom_user.sort((user1,user2)=>{
            return user1.distance - user2.distance;
        });

        return custom_user;

}
module.exports = sortedUser