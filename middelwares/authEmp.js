const employeeSchema = require("../model/employeeSchema");

module.exports={
    isAdmin:async(req,res,next)=>{
        const empData= await employeeSchema.findOne({
            empEmail:req.body.empEmail
        })
        if(empData.empRole === "admin"){
            next()
        }else{
            res.status(401).json({
                success:false,
                message:"User not authorized as an admin",
            })
        }
    }
}