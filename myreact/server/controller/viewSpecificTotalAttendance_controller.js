
let specificTotalAttendance = require("../models/totalAttendance.model");

const viewSpecificTotalAttendance =async (req, res) => {

//VIEW SPECIFIC OFFICIAL DETAILS

specificTotalAttendance.findById(req.params.id)
.then((user) => res.json(user))
.catch((err) => res.status(400).json("Error: " + err));


}


module.exports = viewSpecificTotalAttendance;

   


