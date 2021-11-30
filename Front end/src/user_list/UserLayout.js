import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addDetail } from './userSlice'
import { addMyDetail } from './myDataSlice'
import MyProfile from './MyProfile'
import UserSearch from './UserSearch'
import ListUsers from './ListUsers'
import './UserLayout.module.css'
import style from'./UserLayout.module.css'
import Filter from '../filter/Filter'
import Notification from './Notification'
const axios = require('axios');


const UserLayout = (props) => {
    const notification = useSelector((state) => state.notification.notificationData)
    const dispatch = useDispatch()
    const [ all_user_from_server,setAll_user_from_server ] = useState(null)
    const [notication_hide_unhide,setNotication_hide_unhide] = useState("d-block")

    useEffect(()=>{
        axios({
            method:'post',
            url: 'http://localhost:2536/get_user_data',
            data:{data:"Achhe se kaam kr"},
            headers: { "Content-Type": "application/json"},
        }).then((response) => {
            dispatch(addMyDetail(response.data.data))
            const users = response.data.custom_user.map((cv)=>{
                if(cv.my_id===cv.id){
                    return <div key={cv.id} ></div>
                }else{
                    return (
                        <button key={cv.id}  className={style.my_btn1+" "+style.my_btn +" w-100 m-0 p-0"} 
                        onClick={()=>{
                            userDetails(cv.my_id,cv.id,cv.name,cv.date,cv.distance)
                            }}>
                        <ListUsers  name={cv.name} distance={cv.distance} date={cv.date}/>
                        </button> 
                    )
                }
           
            })
            setAll_user_from_server(users)    
          })
          .catch((error) =>{
            console.log("Note done login ke main :",error);
          });
    },[])

   useEffect(() => {
        setNotication_hide_unhide("d-block")
   }, [notification])

   const hideNotification = ()=>{
    setNotication_hide_unhide("d-none")
   }

const userDetails = (my_id,id,name,date,distance)=>{
    const details = {my_id,id,name,date,distance}
    dispatch(addDetail(details))
}
    return (
        <React.Fragment>
            <div className={style.my_bg+" d-flex flex-column h-100 m-0"}>
              
                <div className={notication_hide_unhide}>
                    {notification!=null?<Notification hideNotification={hideNotification} />:""}
                </div>

                <div>
                    <MyProfile />
                </div>

                <UserSearch />
                
                {/*List All User from server */}
                <div className=" flex-grow-1 overflow-auto ">
                    {all_user_from_server}     
                </div>
                
                <div>
                    <Filter />
                </div>
 
           </div>
       </React.Fragment>
    )
}

export default UserLayout
