
let User = require("../models/user.model");

const deleteSpecificOfficial =async (req, res) => {

//DELETE SPECIFIC OFFICIAL
User.findByIdAndDelete(req.params.id)
.then((user) => res.json("Record was deleted."))
.catch((err) => res.status(400).json("Error: " + err));


}

module.exports = deleteSpecificOfficial;

   


