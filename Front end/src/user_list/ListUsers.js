import React from 'react'
import style from './MyProfile.module.css'
import avtar from '../avtar.png'

const ListUsers = (props) => {
    // console.log(props)
    return (
        <React.Fragment>
            
            <div className="d-flex flex-row align-items-center pb-1">
           
            <div className="m-1">
                <div className={style.img_width_height}>
                    <img className={style.img_width_height+" rounded-circle"} src={avtar} alt ="no pic"/>
                </div>
            </div>

            <div>
                <div className={style.my_font_size_name}>{props.name}</div>
                <div className={style.my_font_size_online}>{props.distance} km</div>
            </div>

            <div className={style.my_font_size_online + " ms-auto p-2"} >
                {props.date==="Online"?<span className={style.my_online}>Online</span>:<span className={style.my_offline}>{props.date}</span>}
            </div>

            </div>
            
        </React.Fragment>
    )
}

export default ListUsers
