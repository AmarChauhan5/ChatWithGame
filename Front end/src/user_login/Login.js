import React,{useState} from 'react'
import style from './UserLoginLayout.module.css'
import { useHistory } from "react-router-dom";
const axios = require('axios');

const Login = (props) => {

    const [login,setLogin] = useState("")
    const [password,setPassword] = useState("")
    const [check,setCheck] = useState(false)
    const [loginWrong,setLoginWrong] = useState("d-none")
    const [error_location,setError_location] = useState("d-block")
    let history = useHistory();

    const handleCheckRequired = () => {
        setCheck(!check)
        setError_location(check?"d-block":"d-none")
    }

    const redirectpage = (event) =>{
        event.preventDefault()
        if(login==="" || password==="" ){
            return 0
        }else if(check===false){
            return 0
        }
        let location ={longitude:props.fun.longitude,latitude:props.fun.latitude}
        let loginCredential = {login,password,location}
            
        axios({
            method: 'post',
            url: 'http://localhost:2536/check_login',
            data:loginCredential,
            headers: { "Content-Type": "application/json"},
        })
        .then((response) => {
            if(response.data){
                setLogin("");
                setPassword("");
                history.push('/chat_box') 
            }else{
                setLoginWrong("d-block")
            }
        })
        .catch((error) =>{
            console.log("Note done login ke main :",error);
        });
    } 
   
    const handleLogin = (event) => {
        setLoginWrong("d-none")
        setLogin(event.target.value);
    }

    const handlePassword = (event) => {
        setLoginWrong("d-none")
        setPassword(event.target.value);
    }

    return (
<React.Fragment>
    <div className={props.fun.login}>
        <form action="/chat_box" method="get" >
            <div className="m-0 p-0 ">
                <span className=" d-block">Enable the location</span>
                <label className={style.switch}>
                    <input type="checkbox" onChange={()=>{
                        handleCheckRequired()
                        props.fun.handleCheck()
                    }}/>
                    <span className={style.slider+" "+ style.round}></span>
                </label>
                <div className={error_location+" "+style.my_must +" m-0 p-0"}>Location is required *</div>
                <div className={style.my_note}>Note : Turn on the location and seen the real time user <span className={style.my_span}>NearBy You.</span>
                </div>
            </div>
            <div className={loginWrong +" "+style.my_note_2}>Please enter valide user name and password ( Both must be case sencetive )* </div>
            <div className=" ">
                <label htmlFor="login_userName" className={style.my_font}>User Name</label> <br/>
                <input onChange={handleLogin} value={login} className={style.my_input+" "}  type="text" name="login" id="login_userName" placeholder="User Name"/>
            </div>

            <div>
                <label className={style.my_font} htmlFor="login_userPassword">Password</label><br/>
                <input onChange={handlePassword} value={password} className={style.my_input} type="password" name="password" id="login_userPassword" placeholder="********"/>
            </div>

            <div className="text-center">
                <button onClick={redirectpage} className=" m-1 rounded-pill btn btn-sm btn-outline-dark" >
                        LOGIN
                </button>
            </div>
        </form>

        <p className=" mb-0">
            <span>
            <button onClick={props.fun.signupF} className={style.my_signup_login_btn}>SignUp</button>
            </span>
        </p>
       

    </div>
</React.Fragment>
    )
}

export default Login
