

let manageRequest = require("../models/salaryRequests.model");
let totalAttendance = require("../models/totalAttendance.model");

const manageSalaryRequest =async (req, res) => {
///////////--------------ATTENDANCE TIME OUT-----------------\\\\\\\\\\\\\\\\\\\\\



const salary = req.body.salary;
const email = req.body.email;
const choose = req.body.choose;



  //UPDATING TIME OUT 
  manageRequest.findOneAndUpdate({
    $and: [

      { 
          
        email: { $eq: email },
        status: { $eq: "In process" }
    
    
    }
   

    ]
  }, { $set: { salary: salary, status: choose} }, { new: true }, (err, doc) => {
    if (err) {
        res.status(400).json({ message: "REQUEST ALREADY MANAGED!" })
    } else {


                    //UPDATING TIME OUT 
                    totalAttendance.findOneAndUpdate({
                    $and: [

                    { 
                        
                        email: { $eq: email }
                    
                    
                    }
                

                    ]
                }, { $set: { status: choose} }, { new: true }, (err, doc) => {
                    if (err) {
                        res.status(400).json("UPDATING REQUEST ERROR!" )
                    } else{
                      console.log("success")
                    }

                });

    
    }


  })

  .catch((err) => res.status(400).json("REQUEST ALREADY UPDATED")); // CATCH THE ERROR

}

module.exports = manageSalaryRequest;






