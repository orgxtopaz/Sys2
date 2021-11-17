
let User = require("../models/user.model");

const displayOfficial =async (req, res) => {
    User.find() // PROMISE IF ELSE
    .then((user) => res.json(user)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR

}


module.exports = displayOfficial;

   


