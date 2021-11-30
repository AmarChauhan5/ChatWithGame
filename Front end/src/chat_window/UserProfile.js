import React,{useState,useEffect} from 'react'
import style1 from './UserProfile.module.css'
import Drag from './Drag'
import { useSelector } from 'react-redux'
import avtar from '../avtar.png'

const UserProfile = () => {
   
    const user = useSelector((state) => state.user.details)
    const socket = useSelector((state) => state.socket.socket)
    const [btn,setBtn] = useState("Send Request For Game")
    const [gameDisplay,setGameDisplay] = useState("d-none")
    const [xo] = useState(["X","O"])
    const [getxo,setGetXo] = useState(null);
    
    const send_game_request = ()=>{
        if(btn==="Send Request For Game"){
            socket.payload.emit("send game request",{id:{id:user.payload.id,my_id:user.payload.my_id},xo:xo})
        }
        if(btn==="Accept requesting..."){
                //   Accept requesting...
            socket.payload.emit("start game",{id:{id:user.payload.id,my_id:user.payload.my_id},status:"success"})
        }
    }

    useEffect(() => {
        if(socket!=null){

            socket.payload.on("requesting",(data)=>{
                console.log("Accept Game Request :",data)
                setGetXo(data.xo[0])
                setBtn("Requesting...")
            })

            socket.payload.on("accept game request",(data)=>{
                console.log("Accept Game Request :",data)
                setGetXo(data.xo[1])
                setBtn("Accept requesting...")
            })

            socket.payload.on("start game",(data)=>{
                console.log("start game ,",data)
                setGameDisplay("d-block")
                setBtn("Game Started")
            })

        } 
    },[socket])

    const reset = ()=>{
        setGetXo(null)
        setBtn("Send Request For Game")
        setGameDisplay("d-none")
    }

    return (
       <React.Fragment>
           <div className={style1.my_bg+ " d-flex flex-row align-items-center"}>
          
                <div className="m-1">
                    <div className={style1.img_width_height}>
                        <img className={style1.img_width_height+" rounded-circle"} src={avtar} alt ="no pic"/>
                    </div>
                </div>
       
                <div>
                    <div className={style1.my_font_size_name}>{user!=null?user.payload.name:""}</div>

                    <div className={style1.my_font_size_online}>
                        <span> {user!=null?user.payload.date==="Online"?<span className={style1.my_online}> Online</span>:<span className={style1.my_offline}>{user.payload.date}</span>:""}</span>
                        <span className={style1.my_offline}> ( {user!=null?user.payload.distance:""} Kilo Meter )</span>
                    </div>
                </div>

                <div className={style1.game_uper+" flex-grow-1 text-end  position-relative"}>
                    <button onClick={send_game_request} className={style1.req_text}>    {btn} 
                    </button>
                    <div className="position-fixed start-50 ">
                        <Drag gameDisplay={gameDisplay} reset={reset} getxo={getxo} />
                    </div>
                </div>
            </div>
       </React.Fragment>
    )
}

export default UserProfile
