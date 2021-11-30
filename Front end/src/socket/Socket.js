import React,{useEffect} from 'react'
import socketIo from "socket.io-client";
import { addSocket } from './socketSlice'
import {addToList } from '../user_list/addToListSlice'
import { useSelector,useDispatch } from 'react-redux'


const Socket = () => {
    const socket = useSelector((state) => state.socket.socket)
    const dispatch = useDispatch()

    useEffect(()=>{
    
        dispatch(addSocket(socketIo("http://localhost:2536", { transports: ['websocket'] })))

    },[])

    useEffect(()=>{
        if(socket!=null){
            // All Socket listner code
                socket.payload.on('send message response',(data)=>{
                    dispatch(addToList(data))
                    // console.log("Data From Server :",data)
                })
        }
    },[socket])
    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}

export default Socket
