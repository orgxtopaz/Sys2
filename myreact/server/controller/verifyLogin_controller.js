let User = require("../models/user.model");

const verifyOfficial = async (req, res) => {
 
  const email = req.body.email;
  const code = req.body.code;
  const userId = req.body.userId;

  console.log(email)
  console.log(code)
  console.log(userId)

  //CHECKING IF USER EXIST ON DATABASE
  User.findById(userId)

    /// VALIDATING IF THE CODE IS CORRECT
    .then(user => {


      if (user.email == email && user.code == code) {
        //SET VERIFIED TO TRUE USER CAN NOW LOG IN 

        user.verified = true;

        user.save()
        res.json("VERIFIED SUCCESSFULLY!"); // IF ERROR


      } else {
        res.status(400).json("CODE IS WRONG"); // IF ERROR
      }

    }).catch((err) => {
      res.status(400).json(err)

    })


};
module.exports = verifyOfficial;

