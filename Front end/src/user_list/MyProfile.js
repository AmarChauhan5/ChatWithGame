import React from 'react'
import style1 from './MyProfile.module.css'
import { useSelector } from 'react-redux'
import avtar from '../avtar.png'



const MyProfile = () => {
    const my_data = useSelector((state) => state.my.data)
    
    return (
    <React.Fragment>
        <div className=" d-flex flex-row align-items-center">
                   
            <div className="m-1">
                <div className={style1.img_width_height+" "}>
                   <img className={style1.img_width_height+" rounded-circle"} src={avtar} alt ="no pic"/>
                </div>
            </div>

            <div>
                 <div className={style1.my_font_size_name}>{my_data!=null?my_data.payload.user_name:""}</div>
                 <div className={style1.my_font_size_online+" text-success"}>Online</div>
            </div>
        </div>
    </React.Fragment>
    )
}

export default MyProfile
