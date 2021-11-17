
let travelLog = require("../models/travellogs.model");

const deleteSpecificTravelLog =async (req, res) => {


//DELETE SPECIFIC TRAVEL DETAILS OF OFFICIALS
travelLog.findByIdAndDelete(req.params.id)
.then((user) => res.json("Record was deleted."))
.catch((err) => res.status(400).json("Error: " + err));

}


  


module.exports = deleteSpecificTravelLog;

   


