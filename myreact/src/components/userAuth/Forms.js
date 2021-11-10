

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes


import "../../components/css/component.css"


import { useEffect } from "react"; //a hook that GIVES  "side-effects"
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import { useForm } from "react-hook-form"; //custom hook for managing forms with ease.
import * as yup from "yup"; //for validation
import { yupResolver } from "@hookform/resolvers/yup"; //Define object schema and its validation.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.


import "react-datepicker/dist/react-datepicker.css";

///------------------

////TABLE
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

///-------------

function Forms() {

  //HERE THE onSubmit will grab the object which has the data coming from the form (called by the handleSubmit).

  //  ///HERE ARE THE VARIABLES WHICH GET OR STORE THE DATA THAT IS INPUTED

  const [userList, setUserList] = useState([]);

  const [userId, setUserId] = useState("");
  console.log(userId);
 


   //  RETRIEVE/SHOW Users Data---------------------------------------

  // IF PAGE IS LOADED THEN THIS WILL HAPPEN WITH THE USE OF useEffect display on table

  
  const isLoaded = [true];
  useEffect(() => {
    if (isLoaded) {
      Axios.get("http://localhost:5000/",

      { headers: { "x-access-token":localStorage.getItem('userToken') }}
      
      )
      
      .then((response) => {
        setUserList(response.data);

     
      })
      .catch((error) => {
        console.error(error)
      })
    }else{
      alert("GAdsgsdgd")
    }
  }, isLoaded);

  const logout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('userToken');
    window.location.reload();

  }


  ///CHECKING IF USER IS AUTHENTICATED WITH TOKEN
  
  let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.
  if(localStorage.getItem('userToken')==null){
   history.push("/")
  }

  let columns = [
    {
      field: `_id`,
      headerName: "ID",
      width: 70,
      className: "userId",
      headerAlign: "center",
    },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 140,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 140,
      headerAlign: "center",
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 130,
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      width: 100,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "password",
      headerName: "Password",
      width: 130,
      headerAlign: "center",
    },

    {
      field: "actionview",
      headerName: ".",
      width: 50,
      //grid renders values into the cells as strings
      // WHEN THE CELL IS RENDER WE THEN PASS DATA INSIDE PARA MAKA KUHA TAS ROW._ID
      renderCell: (data) => (
        <strong>
          <Link to={`/View/${data.row._id}`}>
            {" "}
            <i
              className="bi bi-eye-fill"
              style={{ fontSize: "20px", color: "#343a40" }}
            ></i>
          </Link>
        </strong>
      ),
    },
    {
      field: "actionupdate",
      headerName: ".",
      width: 50,
      //grid renders values into the cells as strings
      // WHEN THE CELL IS RENDER WE THEN PASS DATA INSIDE PARA MAKA KUHA TAS ROW._ID
      renderCell: (data) => (
        <strong>
          <Link to={`/Update/${data.row._id}*${data.row.contactNumber}*${data.row.email}*${data.row.location}`}>
            {" "}
            <i
              className="bi bi-pen-fill"
              style={{ fontSize: "20px", color: "#343a40" }}
            ></i>
          </Link>
        </strong>
      ),
    },
    {
      field: "actiondelete",
      headerName: ".",
      width: 50,
      //grid renders values into the cells as strings
      // WHEN THE CELL IS RENDER WE THEN PASS DATA INSIDE PARA MAKA KUHA TAS ROW._ID
      renderCell: (data) => (
        <strong>
          <Link to={`/Delete/${data.row._id}`}>
            {" "}
            <i
              className="bi bi-trash-fill"
              style={{ fontSize: "20px", color: "#343a40" }}
            ></i>
          </Link>
        </strong>
      ),
    },
  ];

 

  

  return (
    <>
    <div>
    <button type="button" onClick={logout}>Log Out</button>
    </div>      

      {/* SHOW USER DATA ON TABLE GAMIT ANG DATA GRID */}
      <a link href="/ViewReports" style={{marginLeft:"950px",color:"red",marginTop:"-510px",position:"absolute"}}> View Reports</a>
      <div
        style={{
          height: 400,
          width: "70%",
          marginTop: "80px",
          float: "right",
        }}
      >
        {/* data grid include filtering, columns. */}
        
        <DataGrid
          rows={userList}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}

          // checkboxSelection
        />
      </div>
    </>
  );
}

export default Forms;
