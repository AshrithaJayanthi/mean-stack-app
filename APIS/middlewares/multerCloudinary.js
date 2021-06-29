//import
const cloudinary=require("cloudinary").v2
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
    cloud_name:'duukqsdvt',
    api_key:'599534656671983',
    api_secret:'nk8Chz8ZDRkaNhWTEgt3QEaKxoQ',

})
//configure multi-storage
const clStorage=new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async(req,file)=>{
        return{
            folder:"application",
            public_id:file.fieldname+'-'+Date.now()
        }
    }

})
//configure multer
const multerObj=multer({storage:clStorage})

module.exports=multerObj