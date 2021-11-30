import React,{useEffect} from 'react'
import style from './OLayout.module.css'
import Socket from '../socket/Socket'
import UserLayout from '../user_list/UserLayout'
import ChatLayout from '../chat_window/ChatLayout'
import { useSelector } from 'react-redux'
const axios = require('axios');

const OLayout = () => {
    const socket = useSelector((state) => state.socket.socket)

useEffect(() => {
    if(socket!=null){
        axios({
            method:'post',
            url: 'http://localhost:2536/get_my_id',
            data:{data:"Achhe se kaam kr"},
            headers: { "Content-Type": "application/json"},
        }).then((response) => {
            socket.payload.emit('my_id',response.data);
            // socket.payload.on('connect', () => {
            //     console.log("User ID:",socket.payload.id)
            // })   
        })
        .catch((error) =>{
            console.log("Note done login ke main :",error);
        });   
    }
},[socket])
  
    return (
        <React.Fragment>
            <div className={style.bg+" container-fluid h-100 p-lg-5 "}>
                <div className="row h-100">
                    
                    {/* Socket Releted Component only one time execute */}
                    <div>
                            <Socket />
                    </div>

                    {/* Left Side Panel */}
                    <div className="col-sm-4 h-100 p-0 m-0">
                        <UserLayout />
                    </div>

                    {/* Chat Window */}
                    <div className="col-sm-8 h-100 p-0 m-0">
                        <ChatLayout />
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default OLayout
