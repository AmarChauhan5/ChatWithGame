import React,{useState} from 'react'
import style from './OSendMassege.module.css'
import { useSelector } from 'react-redux'

const OSendMassege = () => {
    const user = useSelector((state) => state.user.details)
    const my_data = useSelector((state) => state.my.data)
    const socket = useSelector((state) => state.socket.socket)
    const [text,setText] = useState("")

    const handleChange = (e) =>{
        setText(e.target.value)
    }

    // Send Data to the user
    const send = (text) =>{
        socket.payload.emit('send message',{text,id:{my_id:user.payload.my_id,id:user.payload.id},name:my_data.payload.user_name})
    }
    
    return (
        <React.Fragment>
            <div className={style.my_around + " border-pill p-1" }> 
                <div className="d-flex justify-content-center align-items-center ">

                    <div className=" flex-grow-1 mx-1">
                        <textarea value={text} onChange={handleChange} className={style.my_input +" p-2 w-100" } type="text" name="send_msg" id="" placeholder="Type here..."/>
                    </div>

                    <div>
                        <input className={style.my_btn+" px-3 rounded-pill btn btn-outline-success mx-1"} type="submit" value="SEND" onClick={()=>{
                        setText("");
                        send(text)}}/>
                    </div>

            </div>
           </div>
        </React.Fragment>
    )
}

export default OSendMassege
