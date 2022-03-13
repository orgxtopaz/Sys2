
const UserRouter = require('./routes/user.routes');  //CALL THE ROUTES FOLDER
let User = require("./models/user.model");
let totalAttendance = require("./models/totalAttendance.model");
let travelLog = require("./models/travellogs.model");


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Routing defines the way in which the client requests are handled by the application endpoints.
require("dotenv").config();
const migzapp = express(); // framwework to be used




const port = process.env.PORT || 5000; // the port .env give port if 5000 already used


migzapp.use(cors()); // migzapp will use cors
migzapp.use(express.json()); // migzapp use express.json

// FOR THE VALIDATIONS
const { body, validationResult } = require("express-validator");



// ADD OFFICIAL

migzapp.post(
  "/add",
  [
    body("email")
      .isLength({ min: 1 })
      .withMessage("*Email Address field cannot be blank")

      .isLength({ max: 60 })
      .withMessage("*Email Address field accept up to 45 in size only")

      .isEmail()
      .withMessage("*Email Address field should have email domain"),

    body("fullname")
      .isLength({ min: 1 })
      .withMessage("*Full Name field cannot be blank")

      .isLength({ max: 30 })
      .withMessage("*Full Name field accept up to 30 in size only")

      .matches(/^[aA-zZ\s]+$/)
      .withMessage("*Full Name field accept characters values only"),

    body("contactNumber")
      .isLength({ max: 11 })
      .withMessage("*Contact Number field cannot be blank")

      .isLength({ max: 11 })
      .withMessage("*Contact Number field accept up to 11 in size only")

      .matches(/^\d+$/)
      .withMessage("*Contact Number field accept numeric values only"),

    body("password")
      .isLength({ min: 1 })
      .withMessage("*Password field cannot be blank"),
    body("position")
      .isLength({ min: 1 })
      .withMessage("*Position field cannot be blank")


  ],
  (req, res, next) => {
    try {
      //HERE WE PROCESS THE VALIDATION AND STORE IT ON const errors
      const error = validationResult(req);
      let arrayofErrors = {}; // STORE HERE THE ERROR MESSAGES as an Array

      //MEANS THAT THERE IS AN ERROR EXISTING!
      if (!error.isEmpty()) {
        //EXECUTE  ONLY THE FIRST ERROR
        error.array({ onlyFirstError: true }).forEach((error) => {
          //CONDITIONING / CHECKING IF THE said errors param exist on the arrayofErrors
          if (!arrayofErrors[error.param]) {
            arrayofErrors[error.param] = [];
          }
          //IF THE ERROR PARAMS EXIST.
          arrayofErrors[error.param] = [
            ...arrayofErrors[error.param],
            error.msg,
          ];
        });
        console.log(error);

        //HERE WE SEND BACK ALL OF THE ERRORS TO THE FRONTEND WITH THE STATUS CODE OF 400
        return res.status(400).json(arrayofErrors);

      } else {
        const fullname = req.body.fullname;
        const position = req.body.position;
        const email = req.body.email;
        const contactNumber = req.body.contactNumber;
        const password = req.body.password;
        const verified = "false";
        const type = "resident";
        const code = Math.floor(100000 + Math.random() * 900000);


        ///SEND CODE TO USER EMAIL REGISTERED!
        const nodemailer = require('nodemailer');


        // Step 1
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "nalhubsys@gmail.com",
            pass: "b0r0t0y@2021"
          }
        });

        // Step 2
        let mailOptions = {
          from: 'NalhubSystem@gmail.com', // TODO: email sender
          to: `${email}`, // TODO: email receiver
          subject: 'Verification Code',
          text: `Verify your Email using this code : ${code}`
        };

        // Step 3
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log('Error occurs');
          }
          console.log('Email sent!!!');
        });


        const newUser = new User({
          fullname,
          email,
          contactNumber,
          password,
          verified,
          code,
          type,
          position
        }); // Instantiate the User in user.model

        //GENERATING /ASSIGNING TOKEN TO USER

        const verifyToken = process.env.VERIFY_TOKEN_SECRET


        newUser
          .save() //PROMISE
          .then((user) => res.json({ verifyToken: verifyToken, email: email, user: user })) // IF TRUE CHECK
          .catch((err) => res.status(400).json("Errors: " + err)); // CATCH THE ERROR






       ////////////CREATING totalAttendance MODEL WITH THE SAME DETAILS.
       const  overallTotalHours =0;
       const overallTotalDays =0;
       const status ="In process";

        const newtotalAttendance = new totalAttendance({
          fullname,
          email,
          overallTotalHours,
          position,
          overallTotalDays,
          status
        });



         newtotalAttendance.save() //PROMISE
       


      }
    } catch (err) {

    }
  }
);





// //UPDATE

migzapp.put(
  "/update/:id",
  [
    body("email")
      .isLength({ min: 1 })
      .withMessage("*Email Address field cannot be blank")

      .isLength({ max: 45 })
      .withMessage("*Email Address field accept up to 45 in size only")

      .isEmail()
      .withMessage("*Email Address field should have email domain"),

    body("contactNumber")
      .isLength({ min: 1 })
      .withMessage("*Contact Number field cannot be blank")

      .isLength({ max: 11 })
      .withMessage("*Contact Number field accept up to 11 in size only")

      .matches(/^\d+$/)
      .withMessage("*Contact Number field accept numeric values only")



  ],
  (req, res, next) => {
    try {
      //HERE WE PROCESS THE VALIDATION AND STORE IT ON const errors
      const error = validationResult(req);
      let arrayofErrors = {}; // STORE HERE THE ERROR MESSAGES as an Array

      //MEANS THAT THERE IS AN ERROR EXISTING!
      if (!error.isEmpty()) {
        //EXECUTE  ONLY THE FIRST ERROR
        error.array({ onlyFirstError: true }).forEach((error) => {
          //CONDITIONING / CHECKING IF THE said errors param exist on the arrayofErrors
          if (!arrayofErrors[error.param]) {
            arrayofErrors[error.param] = [];
          }
          //IF THE ERROR PARAMS EXIST.
          arrayofErrors[error.param] = [
            ...arrayofErrors[error.param],
            error.msg,
          ];
        });
        console.log(error);

        //HERE WE SEND BACK ALL OF THE ERRORS TO THE FRONTEND WITH THE STATUS CODE OF 400
        return res.status(400).json(arrayofErrors);

      } else {
        User.findById(req.params.id)
          .then((user) => {

            user.location = req.body.location;
            user.email = req.body.email;
            user.contactNumber = req.body.contactNumber;

            user.save()

              .then((user) => res.json("Record was updated."))
              .catch((err) => res.status(400).json("Error: " + err));
          })
          .catch((err) => res.status(400).json("Error: " + err));
      }
    } catch (err) { }
  }
);











///-----------------ADDING NEW INPUT IN TRAVEL LOGS--------------------------//

migzapp.post(
  "/submitTravel",
  [
    
    body("fullname")
      .isLength({ min: 1 })
      .withMessage("*Fullname field cannot be blank"),
    body("date")
      .isLength({ min: 1 })
      .withMessage("*Date field cannot be blank"),
    body("position")
      .isLength({ min: 1 })
      .withMessage("*Position field cannot be blank"),

    body("purpose")
      .isLength({ min: 1 })
      .withMessage("*Purpose field cannot be blank"),
  ],
  (req, res, next) => {
    try {
      //HERE WE PROCESS THE VALIDATION AND STORE IT ON const errors
      const error = validationResult(req);
      let arrayofErrors = {}; // STORE HERE THE ERROR MESSAGES as an Array

      //MEANS THAT THERE IS AN ERROR EXISTING!
      if (!error.isEmpty()) {
        //EXECUTE  ONLY THE FIRST ERROR
        error.array({ onlyFirstError: true }).forEach((error) => {
          //CONDITIONING / CHECKING IF THE said errors param exist on the arrayofErrors
          if (!arrayofErrors[error.param]) {
            arrayofErrors[error.param] = [];
          }
          //IF THE ERROR PARAMS EXIST.
          arrayofErrors[error.param] = [
            ...arrayofErrors[error.param],
            error.msg,
          ];
        });
        console.log(error);
        console.log(req.body.purpose)

        //HERE WE SEND BACK ALL OF THE ERRORS TO THE FRONTEND WITH THE STATUS CODE OF 400
        return res.status(400).json(arrayofErrors);

      } else {
        const fullname = req.body.fullname;
        const date = req.body.date;
        const position = req.body.position;
        const purpose = req.body.purpose;
        const email = req.body.email
       
        const newTravel = new travelLog({
           fullname,
           date ,
           purpose ,
           position ,
           email
        }); // Instantiate the User in user.model

        //GENERATING /ASSIGNING TOKEN TO USER

        newTravel
          .save() //PROMISE
          .then((user) => res.json( "New Travel Created Successfully!" )) // IF TRUE CHECK
          .catch((err) => res.status(400).json("Errors: " + err)); // CATCH THE ERROR
      }
    } catch (err) { }
  }
);





migzapp.use('/',UserRouter); //

const uri = process.env.ATLAS_URI; // getting the datas in the .env which is the mongo database

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
); // MONGO DB NEEDED CONFIG.

const connection = mongoose.connection; // CONNECT NOW TO DATABASE / MONGO DB

connection.once("open", () => {
  console.log("MONGO DB CONNECTION ESTABLISHED! HINAMPAK");
});

migzapp.listen(port, () => {
  console.log("Server is running in port:" + port);
});
