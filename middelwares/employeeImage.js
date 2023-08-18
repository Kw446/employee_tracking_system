const multer=require("multer");
const path=require("path");

const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, path.join(__dirname, "..", "/uploads/employeeImage"));
    },
    filename:(req,file,callback)=>{
     var ext =path.extname(file.originalname);
     callback(null,`image_${Date.now()}${ext}`);
    },
});
const uploads=multer({
        storage:imgconfig
    });
    
    
module.exports={uploads};

