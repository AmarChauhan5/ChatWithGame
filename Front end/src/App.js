import React,{useState,useEffect} from 'react'
import './App.css';
import OLayout from './layout/OLayout';
import UserLoginLayout from './user_login/UserLoginLayout'
import { BrowserRouter,Route,Redirect} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import TestPage from './TestPage'
import { store } from './app/store'
import { Provider } from 'react-redux'
import Cookies from 'universal-cookie';




function App() {
const cookies = new Cookies();
const loggedIn = ()=>{
    try {
      if(cookies.get('user_name').login!=="")
      {
        return true
      }
    } catch (error) {
      return false
    }
}


  return (
    <>

    <BrowserRouter>
      {/* <Route exact path="/" component={UserLoginLayout}/> */}
      <Route exact path="/"> 
      {console.log("Login :",loggedIn())}
      {loggedIn() ? <Redirect to="/chat_box" /> : <UserLoginLayout />  }
      </Route>

      <Provider store={store}>
        <Route exact path="/chat_box" component={OLayout} />
      </Provider>

    </BrowserRouter>
    </>
    );
}

export default App;
