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
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.

import { BrowserRouter as Router, Route,Link} from "react-router-dom"; //routes


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

function Announcement() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  //    ///CHECKING IF USER IS AUTHENTICATED WITH TOKEN
  
  let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.
  if(localStorage.getItem('sk')==null){
   history.push("/")
  }

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
          
          <Typography variant="h6" noWrap style={{paddingLeft:"300px"}} >
           Announcement BOROTOY MADAFUCKING SYSTEM
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
            ></i><span style={{ fontSize: "10px", color: "red" }} class="counter counter-lg">40</span>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "20px" }}>Travel Log</span>
            </Link>


            <br></br>
            <Link to={`/request`} style={{ fontSize: "40px" }}>  <i
              className="bi bi-currency-dollar"
              style={{ fontSize: "20px", color: "#343a40", paddingLeft: "15px" }}
            ></i><span style={{ fontSize: "10px", color: "red" }} class="counter counter-lg">40</span>&nbsp;&nbsp;<span style={{ paddingLeft: "20px", fontSize: "20px" }}>Create Official</span>
            </Link>
           
       
      </div>
      
        </List>
        
        <Divider />
      
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="row">
        <div className="col-sm-6 col-lg-4">
          <div className="card" style={{maxWidth: '18rem'}}>
            <div className="card-header bg-github content-center">
              <i className="fab fa-github icon text-white my-4 display-4" />
            </div>
            <div className="card-body row text-center">
              <div className="col">
                <div className="card h-100">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3VeQsW5pBH4Xugq5dJZQYEsz24MARdfeGg&usqp=CAU" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title" />
                    <p className="card-text" />
                  </div>
                  <div className="card-footer">
                    <small className="text-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4">
          <div className="card" style={{maxWidth: '18rem'}}>
            <div className="card-header bg-github content-center">
              <i className="fab fa-github icon text-white my-4 display-4" />
            </div>
            <div className="card-body row text-center">
              <div className="col">
                <div className="card h-100">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3VeQsW5pBH4Xugq5dJZQYEsz24MARdfeGg&usqp=CAU" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title" />
                    <p className="card-text" />
                  </div>
                  <div className="card-footer">
                    <small className="text-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4">
          <div className="card" style={{maxWidth: '18rem'}}>
            <div className="card-header bg-github content-center">
              <i className="fab fa-github icon text-white my-4 display-4" />
            </div>
            <div className="card-body row text-center">
              <div className="col">
                <div className="card h-100">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3VeQsW5pBH4Xugq5dJZQYEsz24MARdfeGg&usqp=CAU" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title" />
                    <p className="card-text" />
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">sss</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4">
          <div className="card" style={{maxWidth: '18rem'}}>
            <div className="card-header bg-github content-center">
              <i className="fab fa-github icon text-white my-4 display-4" />
            </div>
            <div className="card-body row text-center">
              <div className="col">
                <div className="card h-100">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3VeQsW5pBH4Xugq5dJZQYEsz24MARdfeGg&usqp=CAU" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title" />
                    <p className="card-text" />
                  </div>
                  <div className="card-footer">
                    <small className="text-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
    
  );
}
export default Announcement;
