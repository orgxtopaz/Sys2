let travelLog = require("../models/travellogs.model");

const displayAllTravel =async (req, res) => {
    travelLog.find() // PROMISE IF ELSE
    .then((travel) => res.json(travel)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR

}


module.exports = displayAllTravel;
