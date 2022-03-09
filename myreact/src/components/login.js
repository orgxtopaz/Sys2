import React from 'react'
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes


import { useHistory } from "react-router-dom"; // allows us to access our path / route history.


import Axios from "axios"; //allows us to make GET and POST requests from the browser.

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/all.css"

import "./css/register.css"


function Login() {

     //  ///HERE ARE THE VARIABLES WHICH GET OR STORE THE DATA THAT IS INPUTED
let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.
 
 const [password, setPassword] = useState("");
 const [email, setEmail] = useState("");



const loginNow =(e)=>{
    e.preventDefault();

    const data ={
        password: password,
        email: email
    }
    
    Axios.post("http://localhost:5000/login",data)

    .then(res =>{


       //IF AUTH IS = TRUE comes from the backend!
     if (res.data.auth){

       if(res.data.position =="official"){
        console.log(res.data)
        localStorage.setItem("Official", res.data.token);
        localStorage.setItem("Email", res.data.email);
        localStorage.setItem("fullname", res.data.fullname);
        localStorage.setItem("position", res.data.position);
        history.push(`/Dashboard`); 
       } else if(res.data.position =="sk"){       
        localStorage.setItem("sk", res.data.token);
        localStorage.setItem("Email", res.data.email);
        localStorage.setItem("fullname", res.data.fullname);
        localStorage.setItem("position", res.data.position);


        history.push(`/skDashboard`); 
       }
       else if(res.data.position =="secretary"){       
        localStorage.setItem("secretary", res.data.token);
        localStorage.setItem("Email", res.data.email);
        localStorage.setItem("fullname", res.data.fullname);
        localStorage.setItem("position", res.data.position);


        history.push(`/secretaryDashboard`); 
       }

     }
      

    })
     .catch(err =>{
        alert(err.response.data.message)
        
   })

}

///IF THE USER SUCCESSFULLY LOG IN , IT CANNOT GO BACK TO THE LOG IN PAGE
if(localStorage.getItem('Official')!=null){
 history.push("/Dashboard")
}else if(localStorage.getItem('sk')!=null){
  history.push("/skDashboard")
}
else if(localStorage.getItem('secretary')!=null){
  history.push("/secretaryDashboard")
}

 
    return (
        <>
        <div>
    

<div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" >
                 <img style={{width:"90%",height:"auto"}} src="https://c4.wallpaperflare.com/wallpaper/62/567/629/joker-batman-heath-ledger-wallpaper-preview.jpg"></img>

                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!sdsdssss</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..."
                         onChange={(event) => {
                          setEmail(event.target.value)}} />
                      </div> 
                      <div className="form-group">
                        <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" 

                        onChange={(event) => {
                                  setPassword(event.target.value)}} />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" htmlFor="customCheck">Remember
                            Me</label>
                        </div>
                      </div>
                      <button onClick={loginNow} className="btn btn-primary btn-user btn-block">
                        Login
                      </button>
                      <hr />
                     
                    </form>
            
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">Forgot Password?</a>
                    </div>

                    <div className="text-center">
                      <a className="small" href="/register">Create an Account!</a>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

            
        </div>
        </>
    )
}

export default Login
