import React, { useState } from 'react'
import style from './UserLoginLayout.module.css'
import Login from './Login'
import Signup from './Signup'
import LUser from './LUser'
const axios = require('axios');
axios.defaults.withCredentials = true

export const UserLoginLayout = () => {
    const [form,setform] = useState({signup:"d-block",login:"d-none"})
    const [check ,setCheck] = useState(true)
    const [user,setUser] = useState({text:"d-block",loder:"d-none",ruser:"d-none"})
    const [location,setLocation] = useState({longitude:"",latitude:""});
    const [a,setA] = useState(null);

    const signupF = () =>{
            setform({signup:"d-block",login:"d-none"})
    }

    const loginF = () =>{
        setform({signup:"d-none",login:"d-block"})
    }

const handleCheck = () =>{
   
    setCheck(!check)
    if(check){
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        
        function success(pos) {
            var crd = pos.coords;
            setLocation({longitude:crd.longitude,latitude:crd.latitude});
            axios.get('http://localhost:2536/user/'+crd.longitude+'/'+crd.latitude,{ withCredentials: true
            })
            .then((response) => {
                console.log("Res data :",response)
                setUser({text:"d-none",loder:"d-none",ruser:"d-block"})
                const arr = response.data;
                setA(arr);
            })
            .catch((error) =>{
                    console.log("Distance done :",error);
                })
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        if(!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser'");
        } else {
            setTimeout(()=>{
            navigator.geolocation.getCurrentPosition(success, error,options);
            },2000)
            setUser({text:"d-none",loder:"d-block",ruser:"d-none"})
        }

    }
}

    return (
        
<React.Fragment>
    <div className={style.my_blur +"  d-flex align-items-center justify-content-center h-100  "}>
       
        <div className={style.my_h_w+" "+style.my_bg_color+"  p-1 h-100 "}>
            
            <div className="row h-100  m-0 h-100 ">
                <div className="col-sm-6 h-100 overflow-auto">
                    {/* User------ */}
                    <LUser leftdiv={{text :user.text,loder:user.loder,user:user.ruser,a1:a}} />
                </div>

            <div className="col-sm-6 d-flex align-items-center justify-content-center h-100  m-0 p-0">
          
                {/* --------------Sign Up Form-------------- */}
                <Signup fun={{handleCheck,loginF,signup:form.signup,latitude:location.latitude,longitude:location.longitude}} />

                {/* --------------Login Form-------------- */}
                <Login fun={{handleCheck,signupF,login:form.login,latitude:location.latitude,longitude:location.longitude}} />
               
                </div>
            </div>
    
   
        </div>
    </div>
</React.Fragment>
    )
}
export default UserLoginLayout;