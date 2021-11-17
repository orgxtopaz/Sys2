const jwt = require('jsonwebtoken');

let User = require("../models/user.model");

const login =async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    //CHECKING IF USER EXIST ON DATABASE
    User.find({ $and: [{ email: { $eq: email } }, { password: { $eq: password } }, { verified: { $eq: "true" } }] })
  
      /// VALIDATING IF USER EXIST
      .then(user => {
  
        if (user.length > 0) {
          const id = user[0].id
  
          const token = jwt.sign({ id }, "jwtSecret", {
            // expiresIn:10000,
          })
         
  
          res.json({ auth: true, token: token, position:user[0].position, email:user[0].email })
  
        } else {
          res.status(400).json({ auth: false, message: "WALA NI EXIST ANG YATI, PAG CREATE OY" })
        }
  
      })
  

}


module.exports = login;

   

  
