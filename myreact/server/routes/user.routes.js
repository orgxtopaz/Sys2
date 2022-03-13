
const verifyLogin = require('../controller/verifyLogin_controller');
const Login = require('../controller/login_controller');

/////////SK

const viewSpecificOfficial = require('../controller/viewSpecificOfficial_controller');
const deleteSpecificOfficial = require('../controller/deleteSpecificOfficial_controller');
const displayOfficial = require('../controller/displayOfficial_controller');
const displayAllTravel = require('../controller/viewAllTravel_controller');
const updateOfficial= require('../controller/updateOfficial_controller');
const displaySalaryRequest= require('../controller/viewSalaryRequest_controller');
const viewSpecificRequest= require('../controller/viewSpecificRequest_controller');
const manageSalaryRequest = require('../controller/manageRequest_controller');

///////////////////


//////SK AND SECRETARY

const displayAllAttendance = require('../controller/viewAllAttendance_controller');

//////////////////

/////////// SECRETARY
const viewTotalAttendance = require('../controller/viewTotalAttendance_controller');
const viewSpecificTotalAttendance = require('../controller/viewSpecificTotalAttendance_controller');
const salaryRequest = require('../controller/salaryRequest_controller');


// //////////////////


const timeIn = require('../controller/timeIn_controller');
const timeOut = require('../controller/timeOut_controller');

const displayAttendance = require('../controller/displayAttendance_controller');

const displaySpecificTravelLog = require('../controller/displaySpecificTravelLog_controller');
const viewSpecificTravelLog = require('../controller/viewSpecificTravelLog_controller');
const deleteSpecificTravelLog = require('../controller/deleteSpecificTravelLog_controller');


const router = require('express').Router();

const jwt = require('jsonwebtoken'); ///FOR THE SECURITY / AUTHORIZATIONS


//MAKING FUNCTIONS TO VERIFY IF USER IS AUTHORIZED WITH THE VALID TOKEN
///SECURITY SO THAT DATA COULD NOT BE DISPLAY IF USER IS NOT LOG IN AND AUTHORIZE
const verifyJWT = (req, res, next) => {
    const token = req.body.headers["x-access-token"]
  
    if (!token) {
      res.send("YOU ARE NOT AUTHORIZED MADAPAKER!!")
    } else {
      jwt.verify(token, "jwtSecret", (err, decoded) => {
        if (err) {
          res.json({ auth: false, message: "You are not Authenticated!" })
        } else {
          req.userId = decoded.id;
          next();
        }
      })
    }
  
  }





router.put('/verify/', verifyLogin); ///VERIFIED UPON CREATING  
router.post('/login/', Login); //OFFICIALS LOG IN  

///SK ADDITIONAL FUNCTIONALITIES
router.post('/displayOfficial',verifyJWT, displayOfficial); ///DISPLAY ALL OFFICIAL 
router.post('/displayAllTravel',verifyJWT, displayAllTravel); ///DISPLAY ALL TRAVEL
router.post('/viewOfficial/:id',verifyJWT, viewSpecificOfficial); ///VIEW SPECIFIC OFFICIAL 
router.post('/deleteOfficial/:id',verifyJWT, deleteSpecificOfficial); ///DELETE SPECIFIC OFFICIAL 
router.post('/displayAllAttendance',verifyJWT,displayAllAttendance); 
router.put('/updateOfficial',verifyJWT, updateOfficial);
router.post('/displaySalaryRequest',verifyJWT, displaySalaryRequest);
router.post('/viewSpecificRequest/:id',verifyJWT,viewSpecificRequest); /// VIEW SPECIFIC OFFICIALS TOTAL ATTENDANCE DETAILS
router.post('/manageRequest/',verifyJWT,manageSalaryRequest); /// VIEW SPECIFIC OFFICIALS TOTAL ATTENDANCE DETAILS

/////////////////////////








/////SECRETARY SEE TOTAL ATTENDANCE DETAILS
router.post('/viewTotalAttendance',verifyJWT,viewTotalAttendance); ///DISPLAY ALL TOTAL ATTENDANCE 
router.post('/viewSpecificTotalAttendance/:id',verifyJWT,viewSpecificTotalAttendance); /// VIEW SPECIFIC OFFICIALS TOTAL ATTENDANCE DETAILS
router.post('/salaryRequest/',verifyJWT,salaryRequest); /// MAKE A SALARY REQUEST

//////////////////////////







////ALL OFFICIALS FUNCTIONALITIES
router.post('/timeIn',timeIn); ///TIME IN  
router.put('/timeOut',timeOut); ///TIME OUT 
router.post('/Attendance',displayAttendance); ///DISPLAY SPECIFIC ATTENDANCE 

router.post('/travelLog',displaySpecificTravelLog); ///DISPLAY SPECIFIC  TRAVEL LOG 
router.post('/viewTravel/:id',viewSpecificTravelLog); ///VIEW SPECIFIC TRAVEL LOG 
router.delete('/deleteTravel/:id',deleteSpecificTravelLog); ///DELETE SPECIFIC TRAVEL LOG 
///////////////////////////////





module.exports = router;