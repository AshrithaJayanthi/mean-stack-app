const jwt=require("jsonwebtoken")
require("dotenv").config()
const checkToken=(req,res,next)=>{
//get token from req obj header
let tokenWithBearer=req.headers.authorization
let token;


//if tokjen isnt existed
if(token===undefined){
    return res.send({message:"unauthorized access"})
}
//if token exists verify the token
//if token expires err object
else{
    //removing 7 charecters or split method 
    let token=tokenWithBearer.split(" ")[1]
    jwt.verify(token,process.env.SECRET,(err,decoded)=>{
if(err){
    return res.send({message:"session expired.. login to contine"})
}
else{
    next()
}
    })
}

}
module.exports=checkToken