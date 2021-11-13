

let User = require("./models/user.model");
let Attendance = require("./models/attendance.model");
let travelLog = require("./models/travellogs.model");


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Routing defines the way in which the client requests are handled by the application endpoints.
require("dotenv").config();
const migzapp = express(); // framwework to be used


const jwt = require('jsonwebtoken');


const port = process.env.PORT || 5000; // the port .env give port if 5000 already used


migzapp.use(cors()); // migzapp will use cors
migzapp.use(express.json()); // migzapp use express.json

// FOR THE VALIDATIONS
const { body, validationResult } = require("express-validator");



// ADD DATA

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
      .isLength({ min: 11 })
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









// User.find({ $and: [{ email: { $eq: email } }, { code: { $eq: code } }] })
migzapp.put("/verify/", (req, res) => {
  const email = req.body.email;
  const code = req.body.code;
  const userId = req.body.userId;

  console.log(email)
  console.log(code)
  console.log(userId)

  //CHECKING IF USER EXIST ON DATABASE
  User.findById(userId)

    /// VALIDATING IF THE CODE IS CORRECT
    .then(user => {


      if (user.email == email && user.code == code) {
        //SET VERIFIED TO TRUE USER CAN NOW LOG IN 

        user.verified = true;

        user.save()
        res.json("VERIFIED SUCCESSFULLY!"); // IF ERROR


      } else {
        res.status(400).json("CODE IS WRONG"); // IF ERROR
      }

    }).catch((err) => {
      res.status(400).json(err)

    })

});


//MAKING FUNCTIONS TO VERIFY IF USER IS AUTHORIZED WITH THE VALID TOKEN
///SECURITY SO THAT DATA COULD NOT BE DIPLAY IF USER IS NOT LOG IN AND AUTHORIZE
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]

  if (!token) {
    res.send("PAG HIMOG IMOHANG TOKEN YATIIIII!!")
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



// DISPLAY DATA WITH FUNCTIONS OF JWT
migzapp.get("/", verifyJWT, (req, res) => {
  // res.send('./views/errors');
  User.find() // PROMISE IF ELSE
    .then((user) => res.json(user)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR
});



migzapp.post("/login/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //CHECKING IF USER EXIST ON DATABASE
  User.find({ $and: [{ email: { $eq: email } }, { password: { $eq: password } }, { verified: { $eq: "true" } }] })

    /// VALIDATING IF USER EXIST
    .then(user => {

      if (user.length > 0) {
        const id = user[0].id

        const token = jwt.sign({ id }, "jwtSecret", {
          // expiresIn:10000,
        })
       

        res.json({ auth: true, token: token, position:user[0].position, email:user[0].email })

      } else {
        res.status(400).json({ auth: false, message: "WALA NI EXIST ANG YATI, PAG CREATE OY" })
      }

    })

  // .catch(() => res.status(400).json("USER NOT EXIST")); // IF ERROR

});





///////////--------------ATTENDANCE TIME IN-----------------\\\\\\\\\\\\\\\\\\\\\


migzapp.post("/timeIn", (req, res) => {
  const email = req.body.email;
  const date = req.body.date;
  const timeIn = req.body.timeIn;
  const timeOut = req.body.timeOut;
  const totalHours = null;
  console.log(email)


  //CHECKING IF USER ALREADY TIME IN
  Attendance.find({
    $and: [

      { email: { $eq: email } },
      { timeIn: { $ne: null } },
      { date: { $eq: date } }

    ]
  })

    /// VALIDATING IF USER EXIST
    .then(attendance => {

      if (attendance.length > 0) {
        console.log(attendance)

        res.status(400).json({ message: "You already Time In!" })

      } else {
        ///CREATE DATA ON DATABASE
        const newAttendance = new Attendance({

          email,
          timeIn,
          timeOut,
          totalHours,
          date

        }); // Instantiate the User in user.model


        newAttendance.save()
          .then((user) => res.status(200).json({ message: "Time In Successfully!" })) // IF TRUE CHECK
      }




    })

    .catch((err) => res.status(400).json("Errorsss: " + err)); // CATCH THE ERROR

});

///////////--------------ATTENDANCE TIME OUT-----------------\\\\\\\\\\\\\\\\\\\\\

migzapp.put("/timeOut", (req, res) => {
  const email = req.body.email;
  const date = req.body.date;
  const timeOut = req.body.timeOut;


  //CHECKING IF USER ALREADY TIME OUT
  Attendance.find({
    $and: [

      { email: { $eq: email } },
      { timeOut: { $eq: null } },

      { date: { $eq: date } }

    ]
  })

    /// VALIDATING IF USER EXIST
    .then(attendance => {

      if (attendance.length > 0) {
        console.log(attendance)

        //HERE IS THE LOGIC ON HOW TO CONFIGURE THE TOTAL WORK HOURS

    

          let diffInMilliSeconds = Math.abs(new Date(attendance[0].timeIn) - new Date(timeOut)) / 1000;

          // calculate hours
          const totalHours = Math.floor(diffInMilliSeconds / 3600) % 24;
          diffInMilliSeconds -= totalHours * 3600;
          console.log('calculated hours', totalHours);
      
        //UPDATING TIME OUT 
        Attendance.findOneAndUpdate({
          $and: [

            { email: { $eq: email } },
            { timeIn: { $ne: null } },
            { timeOut: { $eq: null } },
            { date: { $eq: date } }

          ]
        }, { $set: { timeOut: timeOut, totalHours: totalHours } }, { new: true }, (err, doc) => {
          if (err) {
            console.log("ALREADY COMPLETED ATTENDANCE");
          } else {
            res.status(400).json({ message: "TIME IN AND TIME OUT ALREADY DONE! ENJOY THE REST OF THE DAY" })
          }


        });



      } else {
        res.status(400).json({ message: "You Must Time In First or You are already Time .OUT! " })

      }


    })

    .catch((err) => res.status(400).json("Errorsss: " + err)); // CATCH THE ERROR

});


////DISPLAYING THE ATTENDACE SPECIFIC OFFICIAL

migzapp.post("/Attendance",  (req, res) => {
  const email = req.body.email;


  Attendance.find(  

    { email: { $eq: email } }
 

  ) // PROMISE IF ELSE
    
    .then((attendance) => res.status(200).json(attendance)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR
});



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


////DISPLAY ALL TRAVEL LOGS WITH THE SPECIFIC OFFICIAL
migzapp.post("/travelLog",  (req, res) => {
  const email = req.body.email;


  travelLog.find(  

    { email: { $eq: email } }
 

  ) // PROMISE IF ELSE
    
    .then((travelLog) => res.status(200).json(travelLog)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR
});



///DISPLAY ALL THE OFFICIALS

migzapp.post("/displayOfficial",(req, res) => {
 
  User.find() // PROMISE IF ELSE
    .then((user) => res.json(user)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR
});




//VIEW SPECIFIC OFFICIAL DETAILS
migzapp.post("/viewOfficial/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

//DELETE SPECIFIC OFFICIAL
migzapp.delete("/deleteOfficial/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json("Record was deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});


//////////////// TRAVEL LOG FUNCTIONALITIES //////////////////////////

//VIEW SPECIFIC TRAVEL LOGS DETAILS OF OFFICIALS
migzapp.post("/viewTravel/:id", (req, res) => {
  travelLog.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

//DELETE SPECIFIC TRAVEL DETAILS OF OFFICIALS
migzapp.delete("/deleteTravel/:id", (req, res) => {
  travelLog.findByIdAndDelete(req.params.id)
    .then((user) => res.json("Record was deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});


































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
