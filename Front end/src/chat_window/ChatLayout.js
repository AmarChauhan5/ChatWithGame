import React,{useEffect,useState} from 'react'
import UserProfile from './UserProfile'
import RMasseges from './RMassege'
import LMasseges from './LMasseges'
import style1 from './UserProfile.module.css'
import style from './Massege.module.css'
// import Drag from './Drag'
import OSendMassege from './OSendMassege'
import { useSelector,useDispatch } from 'react-redux'
import {addNotification} from '../socket/notificationSlice'
const axios = require('axios');
    
const ChatLayout = () => {

    const user = useSelector((state) => state.user.details)
    const my_data = useSelector((state) => state.my.data)
    const add_list = useSelector((state)=> state.addToList.addToList)
    const dispatch = useDispatch()
    const [layout,setLayout] = useState({chat:"d-none",chat_not:"d-none",first:"d-block"});
    const [msgs,setMasg] = useState(null);

    // Get the previous Data from the server--Start
    useEffect(() => { 
        
            if(user!=null){
                axios.post("http://localhost:2536/chats",{"my_id":user.payload.my_id,"id":user.payload.id
            })
            .then(function (response) {
                let remove = document.getElementById("add")
                while (remove.hasChildNodes()) {  
                    remove.removeChild(remove.firstChild);
                }
                if(response.data.data!=null){
                    const msg = response.data.data.chat.map((cv,index)=>{
                    if(cv.send_by===user.payload.my_id)
                        return <li  key={index}><RMasseges msg={cv.text}/></li>
                            else
                        return <li  key={index}><LMasseges msg={cv.text}/></li>
                    })
                    setMasg(msg);
                    setLayout({chat:"d-block",chat_not:"d-none",first:"d-none"})
                    let objDiv = document.getElementById("my_scroll")
                    objDiv.scrollTop = objDiv.scrollHeight;
                }else{
                    setLayout({chat:"d-none",chat_not:"d-block",first:"d-none"})
                }
                })
                .catch(function (error) {
                    console.log(error);
            });
        }
    },[user])
       
    // Recived the sended data by fd
    useEffect(() => {
        if(my_data!=null && add_list!=null){
            const my_id = my_data.payload._id
            const my_id_s = add_list.payload.id.my_id
            const text_s = add_list.payload.text
            let add = document.getElementById("add")
            let objDiv = document.getElementById("my_scroll")
            let li = document.createElement('li');
            if(user===null){
            dispatch(addNotification(add_list.payload))
        }else if(my_id_s===my_id){
            li.innerHTML = `
                <div class= " justify-content-end d-flex p-1">
                    <div class="${ style.my_text_style_R} ${style.my_text_style}  overflow-auto" >
                            ${text_s}
                    </div>
                </div>`;
                add.appendChild(li);
                objDiv.scrollTop = objDiv.scrollHeight;
        }else if(my_id_s===user.payload.id){
            li.innerHTML = `
                <div class= " justify-content-start d-flex p-1">
                    <div class="${ style.my_text_style_L} ${style.my_text_style}  overflow-auto" >
                        ${text_s}
                    </div>
                </div>`;
                add.appendChild(li);
                objDiv.scrollTop = objDiv.scrollHeight;
            }else{
                dispatch(addNotification(add_list.payload))                
            }
        }
    },[add_list,my_data])
        
    return (
       <React.Fragment>
        {/* Hidden Chat window */}
            <div className={layout.first +" d-flex align-items-center justify-content-center h-100  m-0 p-0"}>
                <div className={style1.my_text_style}>
                        SELECT THE USER    
                </div>  
            </div>

        {/* Unhindden Chat window */}
            <div className={layout.chat +" h-100 m-0"}> 
                <div className={style1.my_bg+" d-flex flex-column h-100  overflow-auto"}>
                    
                    <div className=" ">
                        <UserProfile />
                    </div>
                    
                    
                    <div className="  overflow-auto flex-grow-1 position-relative" id="my_scroll">
                    
                        <ul id="" className={style.my_list } >
                            {msgs}
                        </ul>

                        <ul id="add" className={style.my_list } >
                        </ul>

                    </div>
                    <div className=" ">
                        <OSendMassege />
                    </div> 
                </div>
            </div>
       </React.Fragment>
    )
}


export default ChatLayout
