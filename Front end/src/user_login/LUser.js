import React , { useState,useEffect } from 'react'
import ListUser from '../user_list/ListUsers'
import style from './UserLoginLayout.module.css'
import loder from './Spinner-1s-200px.gif'
const LUser = (props) => {
    const [allUser,setAllUser] = useState(null)
        
    useEffect(() => {
        if(props.leftdiv.a1!=null){
           const listuser = props.leftdiv.a1.map((currentValue)=>{
               return <ListUser key={currentValue.id}  name={currentValue.name} distance={currentValue.distance} date={currentValue.date} />
           })
           setAllUser(listuser)
       }
    }, [props.leftdiv.a1])

    return (
        <React.Fragment>
            {/* User List----------------- */}
            <div className={props.leftdiv.user}>
                {allUser!=null?allUser:""}
            </div>

            {/* Text------------ */}
            <div className={props.leftdiv.text +" w-100  d-flex align-items-center justify-content-center h-100  m-0 p-0"}>
                <div className="p-2 text-center ">Turn on the location and see the pepole NearBy You</div>
            </div>

            {/* Loder Image-------------- */} 
            <div className={props.leftdiv.loder +" w-100  d-flex align-items-center justify-content-center h-100  m-0 p-0"}>
                <div className="p-2 text-center ">
                    <img className={style.image} src={loder} alt="no pic"/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LUser
