
let Attendance = require("../models/attendance.model");

const timeIn =async (req, res) => {
    
///////////--------------ATTENDANCE TIME IN-----------------\\\\\\\\\\\\\\\\\\\\\

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
  


  }




module.exports = timeIn;

   

  
