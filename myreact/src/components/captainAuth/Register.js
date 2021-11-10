import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes


// import "../../components/css/component.css"

import "../../components/css/all.css"

import "../../components/css/register.css"
// import "../../server/routes/user.routes";

import { useEffect } from "react"; //a hook that GIVES  "side-effects"
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import { useForm } from "react-hook-form"; //custom hook for managing forms with ease.

import Axios from "axios"; //allows us to make GET and POST requests from the browser.
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.



import "react-datepicker/dist/react-datepicker.css";



function Register() {

    let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.


  //  // NO USE
  //  ///HERE ARE THE VARIABLES WHICH GET OR STORE THE DATA THAT IS INPUTED
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [errorList, setErrorList] = useState([]);


  const addUser = (e) => {
    e.preventDefault();
 
    //CHECKIING IF EMAIL EXIST
    console.log(errorList)


      Axios.post("http://localhost:5000/add", {
        fullname: fullname,
        email: email,
        password: password,

        contactNumber: contactNumber,
      })
        .then((res) => {  

          let verifyToken = res.data.verifyToken;
        
          let emailToken = res.data.email
          

          localStorage.setItem("verifyToken", 'Bearer ' + verifyToken);

          ///GETTING THE EMAIL THAT USER USE IN REGISTER AND STORE IT IN LOCALSTORAGE.
          localStorage.setItem("emailToken", emailToken);

         
          history.push(`/verify/${res.data.user._id}`)
          // HERE WE WILL FETCH THE ERROR MESSAGE FROM BACK END AND STORE IT IN AN ARRAY!
        }) 
        .catch ((err) => {
         

           
            setErrorList(err.response.data);
 

            if(errorList[27]=='1'){
              console.log(errorList)
           
              alert("Email Exist Create New YATIII")
          
            }
    
 
       
        })

         
       
      }
  
        


  ///CHECKING IF USER IS AUTHENTICATED WITH TOKEN
  ///IF THE USER SUCCESSFULLY LOG IN , IT CANNOT GO BACK TO THE REGISTER PAGE
    if(localStorage.getItem('userToken')!=null){
    history.push("/form")
   }




  return (
    <>
  
  <div>
      {/* Custom fonts for this template*/}
      <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
        {/* Custom styles for this template*/}
        <link href="css/register.min.css" rel="stylesheet" />


        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* Nested Row within Card Body */}
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image" > 
              <img style={{width:"93%",height:"auto"}} src="https://c4.wallpaperflare.com/wallpaper/62/567/629/joker-batman-heath-ledger-wallpaper-preview.jpg"></img>

              </div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form className="user">
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="Full Name"   onChange={(event) => {
                                  setfullname(event.target.value);
                                }} name="fullname"/>

                                {/* FOR THE ERROR OF FULLNAME */}
                                <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.fullname}
                   
                              </small>


                      </div>
                      <div className="col-sm-6">
                        <input type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Contact Number"    onChange={(event) => {
                                  setContactNumber(event.target.value);
                                }}
                                name="contactNumber" />

                                
                                {/* FOR THE ERROR OF ContactNumber */}
                                <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.contactNumber}
                   
                              </small>
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address"   onChange={(event) => {
                                  setEmail(event.target.value);
                                }}
                                required
                                name="email" />

                                
                                {/* FOR THE ERROR OF EMAIL */}
                                <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.email}
                   
                              </small>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        
                        <input type="password"  className="form-control form-control-user" id="exampleInputPassword" placeholder="Password"    onChange={(event) => {
                                  setPassword(event.target.value);
                                }}
                                name="password"  />

                                
                                {/* FOR THE ERROR OF PASSWORD */}
                                <small
                                id="emailHelp"
                                className="form-text text-danger"
                              >
                               {errorList.password}
                   
                              </small>
                      </div>
                     
                    </div>
                    <button onClick={addUser} className="btn btn-primary btn-user btn-block">
                      Register Account
                    </button>
                    <hr />
                  
                  </form>
                 
                  <div className="text-center">
                    <a className="small" href="forgot-password.html">Forgot Password?</a>
                  </div>
                  <div className="text-center">
                    <a className="small" href="/">Already have an account? Login!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  );
}

export default Register;
