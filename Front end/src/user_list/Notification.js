import React from 'react'
import style1 from './MyProfile.module.css'
import style from './Notification.module.css'
import { useSelector } from 'react-redux'


const Notification = (props) => {
    const notification = useSelector((state) => state.notification.notificationData)
    return (
       <React.Fragment>
            <div className={style.my_bg+ " d-flex flex-row align-items-center "}>
                   
                   <div className="m-1">
                       <div className={style1.img_width_height+" "}>
                          <img className={style1.img_width_height+" rounded-circle"} src="https://picsum.photos/200/300" alt ="no pic"/>
                       </div>
                   </div>
       
                   <div className={style.my_div+" flex-grow-1"}>
                    <div className={style.my_font_size_name}>Notification
                    <br />
                                <span className={style.my_name_font+" text-center "}> {notification.payload.name}</span> 
                    </div>
                <div className={style1.my_font_size_online1+" text-success "}>
                    <div className={style.my_text_font+" m-0 p-0 overflow-auto"}>{notification.payload.text}</div>
                    {/* <marquee className={style.my_text_font} behavior="" direction="left"> {notification.payload.text}</marquee> */}
               
                </div>
                   </div>
                   <div className=" ">
                       <button className={style.my_btn} onClick={()=>{props.hideNotification()}}> <span className={style.my_btn_text}> X </span>  </button>
                   </div>
               </div>
       </React.Fragment>
    )
}

export default Notification
