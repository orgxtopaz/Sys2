
let requestSalary = require("../models/salaryRequests.model");
let totalAttendance = require("../models/totalAttendance.model");

const salaryRequest =async (req, res) => {
    
///////////--------------ATTENDANCE TIME IN-----------------\\\\\\\\\\\\\\\\\\\\\
    const fullname = req.body.fullname;
    const email = req.body.email;
    const position = req.body.position;
    const overallTotalHours = req.body.overallTotalHours;
    const overallTotalDays= req.body.overallTotalDays;
    const overallTotalAbsent= req.body.overallTotalAbsent;
    const requestTo= req.body.requestTo;
    const date =new Date();
    const status =req.body.status;
    const subject ="Work Salary";
    const from ="Secretary";
    const salary =0;


          ///CREATE DATA ON DATABASE
          const newRequestSalary= new requestSalary({
  
            fullname,
            email,
            position,
            overallTotalHours,
            overallTotalDays,
            overallTotalAbsent,
            requestTo,
            date,
            status,
            subject,
            from,
            salary
           
  
          }); // Instantiate the User in user.model




          if(status ==="In process"){

            newRequestSalary.save()

             //CHECKING IF USER ALREADY TIME OUT
             totalAttendance.find({
              $and: [

                { email: { $eq: email } },
              

              ]
            })
             
            .then(checkallattendance => {

              if(checkallattendance.length>0){

                totalAttendance.findOneAndUpdate({
                $and: [
        
                  { email: { $eq: email } }
                 
        
                ]
              },
              
              
              { $set: { status:"Requesting"  }    }, { new: true }, (err, doc) => {
               
        
        
              });

              }


            })


            .then((user) => res.status(200).json({ message: "Successfully requested!" })) // IF TRUE CHECK


          }else if(status==="Approved"){
            res.status(400).json("REQUEST WAS APPROVED!" )

          }
          else if(status==="Cancelled"){
            res.status(400).json("REQUEST WAS CANCELLED!" )

          }
          
          else{
            res.status(400).json("REQUEST IN PROCESS!")
            
          }
  
  
    
  
   
  
  
        }





module.exports = salaryRequest;

   

  
