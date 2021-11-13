import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios"; //allows us to make GET and POST requests from the browser.
import { useEffect } from "react"; //a hook that GIVES  "side-effects"

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes

import { useHistory } from "react-router-dom"; // allows us to access our path / route history.

import "../../components/css/component.css"


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Dashboard() {




  ///FUNCTIONS FOR TIME IN AND TIME OUT BUTTON

  function timeIn() {

    //GENERATE THE CURRENT DATE AND TIME FOR TIME IN
    const DateandTimeSplit = new Date().toLocaleString().split(",");
    const DateandTimeIn = new Date().toLocaleString();

    const date = DateandTimeSplit[0]

    Axios.post("http://localhost:5000/timeIn", {



      email: localStorage.getItem("Email"),
      timeIn: DateandTimeIn,
      timeOut: null,
      date: date


    })
      .then((res) => {
        alert("Time in successfully!")

        // HERE WE WILL FETCH THE ERROR MESSAGE FROM BACK END AND STORE IT IN AN ARRAY!
      })
      .catch((err) => {


        alert(err.response.data.message)

      })

  }

  function timeOut() {
    //GENERATE THE CURRENT DATE AND TIME FOR TIME IN
    const DateandTime = new Date().toLocaleString().split(",");

    const date = DateandTime[0]
    const DateandTimeOut = new Date().toLocaleString();

    //  const timeOut = DateandTime[1]

    Axios.put("http://localhost:5000/timeOut", {


      email: localStorage.getItem("Email"),
      timeOut: DateandTimeOut,
      date: date



    })
      .then((res) => {
        alert("Time Out successfully!")

        // HERE WE WILL FETCH THE ERROR MESSAGE FROM BACK END AND STORE IT IN AN ARRAY!
      })
      .catch((err) => {


        alert(err.response.data.message)



      })




  }




  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  /////FETCHING THE OFFICIAL ATTENDANCE DATA SPECIFIC
  
  const [AttendanceList, setAttendanceList] = useState([]);
  const isLoaded = [true];
  useEffect(() => {
 
     if (isLoaded) {
      Axios.post("http://localhost:5000/Attendance", 

      { headers: { "x-access-token":localStorage.getItem('userToken') },email:localStorage.getItem("Email")}
      
      )
    
      
      .then((response) => {
        setAttendanceList(response.data);

     
      })
      .catch((error) => {
        console.error(error)
      })
    }else{
      alert("GAdsgsdgd")
    }
  }, isLoaded);


//    ///CHECKING IF USER IS AUTHENTICATED WITH TOKEN
  
   let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.
   if(localStorage.getItem('sk')==null){
    history.push("/")
   }


   const logout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('sk');
    window.localStorage.removeItem('Email');
    window.location.reload();

  }

  ///ATTENDANCE TABLE


  let columns = [
   
    {
      field: "timeIn",
      headerName: "Time In",
      width: 160,
      headerAlign: "center",
    },
    {
      field: "timeOut",
      headerName: "Time Out",
      width: 160,
      headerAlign: "center",
    },
    {
      field: "totalHours",
      headerName: "Total Hours",
      width: 100,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "date",
      headerName: "Date",
      width: 170,
      headerAlign: "center",
    }

 
   
  ];

  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap style={{ paddingLeft: "300px" }} >
            SK BOROTOY MADAFUCKING SYSTEM
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
       
          <IconButton onClick={handleDrawerClose}>
            <h1>Official</h1>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <div className="sidebar">

            <Link to={`/skDashboard`} style={{ fontSize: "40px" }}> <i
              className="bi bi-house-door-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i><span style={{ fontSize: "10px", color: "red" }} class="counter counter-lg">40</span>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "20px" }}>Home</span>

            </Link>

            <br></br>

            <Link to={`/skOrganizational`} style={{ fontSize: "40px" }}> <i
              className="bi bi-diagram-3-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i><span style={{ fontSize: "10px", color: "red" }} class="counter counter-lg">40</span>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "20px" }}>Announcement</span>
            </Link>

            <br></br>
            <Link to={`/skTravel`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-cursor-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i><span style={{ fontSize: "10px", color: "red" }} class="counter counter-lg">40</span>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "20px" }}>Travel Log</span>
            </Link>

            <br></br>
            <Link to={`/createOfficial`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-people-fill"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i><span style={{ fontSize: "10px", color: "red" }} class="counter counter-lg">40</span>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "20px" }}>Create Official</span>
            </Link>






          </div>

        </List>

        <Divider />

      </Drawer>
      <main className={classes.content}>

        <div style={{ float: "right" }}>
          <button
            type="button"
            className="btn btn-outline-success btn-rounded mr-2"
            data-mdb-ripple-color="dark"
            onClick={timeIn}

          >
            Time In
  </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-rounded "
            data-mdb-ripple-color="dark"
            onClick={timeOut}
          >
            Time Out
  </button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <button onClick={logout}>LogOut</button>



 {/* TABLE RENDERED */}
      <div style={{ height: 400, width: '70%' }}>

          {/* data grid include filtering, columns. */}

          <DataGrid
            rows={AttendanceList}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={5}
      

          // checkboxSelection
          />
        </div>



      </main>
    </div>



  );    
}
export default Dashboard;
