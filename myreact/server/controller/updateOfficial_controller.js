

let User = require("../models/user.model");

const updateOfficial =async (req, res) => {
///////////--------------ATTENDANCE TIME OUT-----------------\\\\\\\\\\\\\\\\\\\\\


const contactNumber = req.body.updateContactNumber;
const password = req.body.updatePassword;
const email = req.body.email;


  //UPDATING TIME OUT 
  User.findOneAndUpdate({
    $and: [

      { email: { $eq: email } }
   

    ]
  }, { $set: { password: password, contactNumber: contactNumber } }, { new: true }, (err, doc) => {
    if (err) {
      console.log("CAN'T UPDATE OFFICIAL SERVER ERROR!");
    } else {
      res.status(200).json({ message: "OFFICIAL UPDATED SUCCESSFULLY!" })
    }


  });


}

module.exports = updateOfficial;






