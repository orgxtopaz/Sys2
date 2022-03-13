

let Attendance = require("../models/attendance.model");
let allAttendance = require("../models/totalAttendance.model");

const timeOut =async (req, res) => {
///////////--------------ATTENDANCE TIME OUT-----------------\\\\\\\\\\\\\\\\\\\\\


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


          
                ///////////// UPDATING THE OVERALL TOTAL HOURS AND DAYS

                //CHECKING IF USER ALREADY TIME OUT
                allAttendance.find({
                $and: [

                  { email: { $eq: email } },
                

                ]
              })
               
              .then(checkallattendance => {

                if(checkallattendance.length>0){

                 allAttendance.findOneAndUpdate({
                  $and: [
          
                    { email: { $eq: email } }
                   
          
                  ]
                },
                
                
                { $set: { overallTotalHours:checkallattendance[0].overallTotalHours+totalHours ,overallTotalDays:checkallattendance[0].overallTotalDays +1 }    }, { new: true }, (err, doc) => {
                 
          
          
                });

                }


              })

            
             



          
        }


      });



     



    } else {
      res.status(400).json({ message: "You Must Time In First or You are already Time .OUT! " })

    }


  })

  .catch((err) => res.status(400).json("Errorsss: " + err)); // CATCH THE ERROR



}

module.exports = timeOut;






