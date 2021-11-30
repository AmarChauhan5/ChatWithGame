import React, { Component } from 'react'
import style from './UserLoginLayout.module.css'
import loding from './Ellipsis-2.1s-200px.gif'
import success from './success.gif'
const axios = require('axios');

export class Signup extends Component {
        
    state = {
        userName:"",
        userPassword:"",  
        reUserPassword:"",
        longitude:"",
        latitude:"",
        check:false,
        form_show_and_hidden:{form:"d-block",loding:"d-none",success:"d-none"},
        error_location:"d-block",
        error_userName:"d-block",
        error_userPassword:"d-block",
        error_reUserPassword:"d-block",
        error_match:"d-none"
        };
    handleChange = (event) => {
        if(event.target.value===""){
            this.setState({["error_"+event.target.name]:"d-block"})
        }else{
            this.setState({["error_"+event.target.name]:"d-none"})
        }
        this.setState({error_match:"d-none"})     
        this.setState({[event.target.name]: event.target.value});
    }
    handleCheckRequired = () => {
        this.setState({error_location:this.state.check?"d-block":"d-none"})
        this.setState({check:!this.state.check});
    }

    handleSubmit = (event)=> {
        event.preventDefault();
        if(this.state.check===false){
            return 0;
        }else if(this.state.userName===""){
            return 0;
        }else if(this.state.userPassword==="" || this.state.reUserPassword==="" ){
            return 0
        }else if(this.state.userPassword!==this.state.reUserPassword ){
            this.setState({error_match:"d-block"})
            return 0   
        }

        this.setState({form_show_and_hidden:{form:"d-none",loding:"d-block",success:"d-none"}})
            
        const data ={
            user_name:this.state.userName,
            password:this.state.userPassword,
            location:{
                longitude:this.props.fun.longitude,
                latitude:this.props.fun.latitude,
            }
        }

        setTimeout(()=>{
            axios({
                method: 'post',
                url: 'http://localhost:2536/user',
                data:data,
                headers: { "Content-Type": "application/json"}
                })
                .then((response) => {
                    setTimeout(()=>{
                        this.setState({form_show_and_hidden:{form:"d-block",loding:"d-none",success:"d-none"}})
                    },3000) 
                    this.setState({ 
                        userName:"",
                        userPassword:"",  
                        reUserPassword:"",
                        longitude:"",
                        latitude:"",
                        check:false,
                        form_show_and_hidden:{form:"d-block",loding:"d-none",success:"d-none"},
                        error_location:"d-block",
                        error_userName:"d-block",
                        error_userPassword:"d-block",
                        error_reUserPassword:"d-block",
                        error_match:"d-none"
                    })
                    this.setState({form_show_and_hidden:{form:"d-none",loding:"d-none",success:"d-block"}})
                })
                .catch((error) =>{
                    console.log("Note done :",error);
                });
              },2000);
    }
    render() {
        return (
            <React.Fragment>
                {/* Loding Image---------- */}
                <div className={this.state.form_show_and_hidden.loding}>
                    <img className={style.image} src={loding} alt="eeeee"/>
                </div>
                {/* Success Image------------ */}
                    <div className={this.state.form_show_and_hidden.success}>
                        <img className={style.success_image} src={success} alt="eee"/>
                    </div>
                {/* -------Form------- */}
                <div className={this.state.form_show_and_hidden.form}>
                {/* } */}
            <div className={this.props.fun.signup}>
                <form onSubmit={this.handleSubmit} method="post" >
                    {/* Check Box-------------- */}
                    <div className="m-0 p-0 ">
                        <span className=" d-block">Enable the location</span>
                        <label className={style.switch + " m-0 p-0"}>
                            <input type="checkbox" onChange={()=>{
                                this.handleCheckRequired()
                                this.props.fun.handleCheck()
                            }} name="location_check" />
                            <span className={style.slider+" "+ style.round}></span>
                        </label>
                        
                        <div className={this.state.error_location+" "+style.my_must +" m-0 p-0"}>Location is required *</div>
                        <div className={style.my_note}>Note : Turn on the location and   seen the real time user <span className={style.my_span}>NearBy You.</span>
                        </div>
                        
                    </div>
                    {/* /* User Name-------------- */ }
                    <div className=" bg-inf">
                        <label htmlFor="userName" className={style.my_font}>User Name</label> <br/>
                        <input className={style.my_input+"  "} value={this.state.userName}   type="text" name="userName" id="userName" placeholder="User Name" onChange ={this.handleChange}/>
                        <br />
                        <span className={this.state.error_userName+" "+style.my_must +" m-0 p-0"}>required field *</span>
                    </div>
                        {/* Passsword------------- */}
                    <div>
                        <label className={style.my_font} htmlFor="userPassword"> Password</label><br/>
                        <input onChange={this.handleChange} value={this.state.userPassword} className={style.my_input} type="password" name="userPassword" id="userPassword" placeholder="********"/>
                        
                        <div className={this.state.error_userPassword+" "+style.my_must +" m-0 p-0"}> required field *</div>

                    </div>
                        {/* Re-Password--------- */}
                    <div>
                        <label className={style.my_font} htmlFor="reUserPassword"> Password conform</label><br/>
                        <input onChange={this.handleChange} value={this.state.reUserPassword} className={style.my_input} type="password" name="reUserPassword" id="reUserPassword" placeholder="********"/>
                        <br />
                        <span className={this.state.error_reUserPassword+" "+style.my_must +" m-0 p-0"}>required field *</span>
                        <span className={this.state.error_match+" "+style.my_must +" m-0 p-0"}>Password Not Match </span>

                    </div>
                            {/* Submit------------- */}
                    <div className="">
                        <input className=" mt-1 rounded-pill btn btn-sm btn-outline-dark " type="submit" value="SUBMIT"/>
                    </div>
        
                    <div className={style.my_note +" mb-2"}>Note : Please Remainber ther    <span className={style.my_span}> User Name and Passeord </span> ,no way to recover password
                    </div>
                </form>
                <p className=" mb-0">
                    <span>
                        <button onClick={this.props.fun.loginF} className={style.my_signup_login_btn}>Login</button>
                    </span>
                </p>
            </div>
        </div>
        </React.Fragment>
        )
    }
}

export default Signup
