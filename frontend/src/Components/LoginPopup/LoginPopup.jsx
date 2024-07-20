import React, { useState } from 'react';
import Header from "../Header/Header";
import './LoginPopup.css'

const LoginPopup = () => {

    const [currState,setcurrstate] = useState("Login")
    const [formdata,setformdata] = useState({
        username: "",
        password: "",
        email: ""
    })

    const changehandler = (e) =>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    }

    const login = async()=>{
        console.log("Login funct executed",formdata)
        let responsedata;
        await fetch('https://foodio-0x93.onrender.com/login',{
            method: 'POST',
                headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
              },
                body: JSON.stringify(formdata),
            }).then((resp)=>resp.json()).then((data)=>responsedata=data)
            
            if(responsedata.success){
                localStorage.setItem('auth-token',responsedata.token);
                window.location.href='/';
            }
            else{
                alert(responsedata.errors)
            }
        }

    const signup = async()=>{
        console.log("signup funct executed",formdata);
        let responsedata;
        await fetch('https://foodio-0x93.onrender.com/signup',{
            method: 'POST',
                headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
              },
                body: JSON.stringify(formdata),
            }).then((resp)=>resp.json()).then((data)=>responsedata=data)
            
            if(responsedata.success){
                localStorage.setItem('auth-token',responsedata.token);
                window.location.href='/';
            }
            else{
                alert(responsedata.errors)
            }
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (currState === "Login") {
                await login();
            } else {
                await signup();
            }
        };

  return (
    <>
    <Header/>
    <div className='login-popup'>
        <form className='login-popup-cont'>
            <div className="login-popup-title">
                <h1>{currState}</h1>
            </div>
            <div className="login-popup-inputs">
                {currState==="Sign Up"?
                <input type="text" name='username' value={formdata.username} placeholder='Your Name' onChange={changehandler} required />:<></>}
                <input type="email" name='email' value={formdata.email}placeholder='Your Email' onChange={changehandler} required/>
                <input type="password" name='password' value={formdata.password} placeholder='Password' onChange={changehandler} required />
            </div>
            
            <button type="button" onClick={handleSubmit}>Continue</button>
            
            {currState==="Sign Up"?<p className='login-box'>Already have an account?<span onClick={()=>{setcurrstate("Login")}}> Login here</span></p>
            :<p className='login-box'>Create an account?<span onClick={()=>{setcurrstate("Sign Up")}}> Click here</span></p>}
            
            <div className="login-agree">
                <input type="Checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
        </form>
    </div>
    </>
  )
}

export default LoginPopup