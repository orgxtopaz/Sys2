import React from 'react'
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes


import "../css/component.css"// import "../../server/routes/user.routes";
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.

import { useEffect } from "react"; //a hook that GIVES  "side-effects"
import { useForm } from "react-hook-form"; //custom hook for managing forms with ease.
import * as yup from "yup"; //for validation
import { yupResolver } from "@hookform/resolvers/yup"; //Define object schema and its validation.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.

import { useParams } from "react-router-dom"; // returns: an object of key/value pairs of URL parameters




function Verify() {

//STORING/GETTING EMAIL OF THE USER WHICH IS STORED ON LOCALSTORAGE
const userEmail=localStorage.getItem('emailToken')


let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.
 
 const [code, setCode] = useState("");



 let {userId} = useParams()

const verifiedNow =(e)=>{
    e.preventDefault();

    console.log(userId)
    const data ={
        code: code,
        email: userEmail,
        userId:userId
    }
    
    Axios.put("http://localhost:5000/verify",data)

    .then(res =>{
    
     alert(res.data)
     history.push("/createOfficial") //GOINF BACK TO LOG IN PAGE
   
    })
    .catch(err =>{
        alert(err.response.data)
    })

}

const isLoaded = [true];
useEffect(() => {
  if (isLoaded) {
    Axios.get("http://localhost:5000/",{ headers: { Authorization:localStorage.getItem('verifyToken') }})
  }
}, isLoaded);


///IF THE USER SUCCESSFULLY LOG IN , IT CANNOT GO BACK TO THE LOG IN PAGE
   //    ///CHECKING IF USER IS SK AND  AUTHENTICATED WITH TOKEN
   if(localStorage.getItem('sk')==null){
    history.push("/")
   }









    return (
        <>
        <div>
        <form>
            <center>
        <div className="form-group">
            <h1>VERIFY YOUR EMAIL</h1>
            <label >Email address</label>
            <input type="text" className="form-control"  placeholder="Enter email" value={userEmail}  />
            <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
            <label >Code</label>
            <input type="text" className="form-control"  placeholder="Code"  onChange={(event) => {
                                  setCode(event.target.value);
                                }}/>
        </div>
        <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label" >xxx</label>
        </div>
        <button type="submit" onClick={verifiedNow} className="btn btn-primary">Submit</button>
        </center>
        </form>

            
        </div>
        </>
    )
}


export default Verify
