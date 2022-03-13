

let salaryRequests = require("../models/salaryRequests.model");

const displaySalaryRequest =async (req, res) => {

////DISPLAY ALL TRAVEL LOGS WITH THE SPECIFIC OFFICIAL

    const position = req.body.position;
  
  
    salaryRequests.find(  
  
      { requestTo: { $eq: position } }
   
  
    ) // PROMISE IF ELSE
      
      .then((requestLog) => res.status(200).json(requestLog)) // IF TRUE CHECK
      .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR

  

}

module.exports = displaySalaryRequest;






