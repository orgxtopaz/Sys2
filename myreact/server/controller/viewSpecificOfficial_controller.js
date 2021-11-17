
let User = require("../models/user.model");

const viewSpecificOfficial =async (req, res) => {

//VIEW SPECIFIC OFFICIAL DETAILS

User.findById(req.params.id)
.then((user) => res.json(user))
.catch((err) => res.status(400).json("Error: " + err));


}


module.exports = viewSpecificOfficial;

   


