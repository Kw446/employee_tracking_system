module.exports={
    isEmployee:async(req,res,next)=>{
        if(req.body.empRole ==="employee"){
            next()
        }else{
            res.status(401).json({
                success:false,
                message:"not auth",
            })
        }
    }
}