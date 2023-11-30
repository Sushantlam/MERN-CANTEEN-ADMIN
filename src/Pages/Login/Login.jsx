import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../Context/Auth'
import LoginPhoto from "../../Photo/Login.avif"
import './Login.css'
const Login = () => {
    const navigate= useNavigate()
    const {loading, error, dispatch}= useContext(AuthContext)

    
    const [credential, setCredential]= useState({
        
        email: undefined,
        password: undefined
    })

    const handleChange =(e)=>{
        const {id, value}= e.target
        
        setCredential({...credential, [id]: value})
       

       
    }
    const handleClick = async (e) => {
      e.preventDefault();
      dispatch({ type: "Login_Start" });
      try {
        const res = await axios.post("https://canteen-api-nodej.onrender.com/user/login", credential);
        console.log(credential);
        console.log(res);
    
        if (res.data.isAdmin) {
          dispatch({ type: "Login_Success", payload: res.data.isAdmin });
          console.log(res.data.isAdmin);
          navigate("/");
        } else {
          dispatch({ type: "Login_Fail", payload: "User is not an admin" });
          navigate("/login");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
          dispatch({ type: "Login_Fail", payload: error.response.data });
        } else {
          console.log(error.message); // Log other types of errors
          dispatch({ type: "Login_Fail", payload: "An error occurred" });
        }
        navigate("/login");
      }
    };
    
  return (
    <div className="mainLogin">
    <div className="loginContent">
     
      <div className="loginLeft">
        <img src={LoginPhoto} alt="" className='loginImage' />
      </div>
      <div className="loginRight">
        <h3 className='admin'>Admin</h3>
        <div className="loginRIGHT">
          Email
          <input type="email" id="email" onChange={handleChange} style={{ color: 'black' }} />
          Password
          <input type="password" id="password" onChange={handleChange} />
          <button disabled={loading} onClick={handleClick} className='loginBtn'>Log-In</button>
          {error && <span className='errorMessage'>{error}</span>}
       
        </div>

      </div>
      
    </div>
  </div>
  )
}

export default Login