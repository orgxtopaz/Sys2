
let specificSalaryRequest = require("../models/salaryRequests.model");

const viewSpecificSalaryRequest =async (req, res) => {

//VIEW SPECIFIC OFFICIAL DETAILS

specificSalaryRequest.findById(req.params.id)
.then((user) => res.json(user))
.catch((err) => res.status(400).json("Error: " + err));


}


module.exports = viewSpecificSalaryRequest;

   


