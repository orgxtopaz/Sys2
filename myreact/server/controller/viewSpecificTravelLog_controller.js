
let travelLog = require("../models/travellogs.model");

const viewSpecificTravelLog =async (req, res) => {
//VIEW SPECIFIC TRAVEL LOGS DETAILS OF OFFICIALS
travelLog.findById(req.params.id)
.then((user) => res.json(user))
.catch((err) => res.status(400).json("Error: " + err));
}




module.exports = viewSpecificTravelLog;

   


