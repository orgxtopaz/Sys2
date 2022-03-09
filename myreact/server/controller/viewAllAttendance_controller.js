let Attendance = require("../models/attendance.model");

const displayAllAttendance =async (req, res) => {
    Attendance.find() // PROMISE IF ELSE
    .then((attendance) => res.json(attendance)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR

}


module.exports = displayAllAttendance;