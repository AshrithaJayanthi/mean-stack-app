const exp=require('express')
const adminApi=exp.Router()
const mc=require("mongodb").MongoClient;
const expressErrorHandler=require("express-async-handler")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const checkToken=require("./middlewares/verifyToken")

const multerObj=require("./middlewares/multerCloudinary")
// create user by async and await
// adminApi.post("/createadmin",multerObj.single('photo'),expressErrorHandler(async (req,res,next)=>{
//     let adminCollectionObj=req.app.get("adminCollectionObj")
//     //get user obj
//     let newUser=JSON.parse(req.body.userObj)
//      //check if user exists in db with this username
//      let user=await adminCollectionObj.findOne({username:newUser.username})

//      //if user exists

//      if(user!==null)
//      {
//          res.send({message:"user already exists"})
//      }
//      else{
//          //hash password
//          let hashedPassword= await bcrypt.hash(newUser.password,7)
//          //replace password
//          newUser.password=hashedPassword
//          //add image url
//          newUser.profileImg=req.file.path
//          delete newUser.photo
//         //since insertone returns nothing no need to store it
//         await adminCollectionObj.insertOne(newUser)

//         res.send({message:"user created successfully"})
//      }

// }))
// //admin login
// adminApi.post("/login",expressErrorHandler(async (req,res,next)=>{
//     let adminCollectionObj=req.app.get("adminCollectionObj")
//     //get credentials

//     let credentialsObj=req.body
//     //search user by username
//     let user=await adminCollectionObj.findOne({username:credentialsObj.username})
//     //if user not found

//     if(user===null)
//     {
//         res.send({message:"invalid user name"})
//     }
//     else{
//         //compare with the password
//       let result= await bcrypt.compare(credentialsObj.password,user.password)
//       //if pwds not matched
//       if(result===false)
//       {
//           res.send({message:"inavalid password"})
//       }
//       else{
//           //if pwd matches
//           //create token
//           let signedToken=await jwt.sign({username:credentialsObj.username},'abcdef',{expiresIn:10})
//           //send token to client
//           res.send({message:"login success",token:signedToken,username:credentialsObj.username,userObj:user})
//       }
//     }
// }))
//login
adminApi.post("/login", expressErrorHandler(async (req, res, next) => {

    let credentials = req.body;
    if (req.body.username !== 'admin') {
        res.send({ message: "Invalid username" })
    }
    else if (req.body.password !== 'admin') {
        res.send({ message: "Invalid password" })
    } else {
        //create a token
        let signedToken = jwt.sign({ username: credentials.username }, 'abcdef', { expiresIn: 10 })
        //send token to client
        res.send({ message: "login success", token: signedToken, username: credentials.username })
    }
}))
//get products
adminApi.get("/getproducts", expressErrorHandler(async (req, res, next) => {

    let productCollectionObject = req.app.get("productCollectionObject")

    let products=await productCollectionObject.find().toArray()
    res.send({message:products})


}))
//add product
adminApi.post("/addproduct",multerObj.single('photo'),expressErrorHandler(async (req,res,next)=>{

    let productCollectionObjectect = req.app.get("productCollectionObjectect")
    let newProduct=JSON.parse(req.body.productObj)
    newProduct.productImage=req.file.path;
    await productCollectionObjectect.insertOne(newProduct)
    res.send({message:"New Product added"})

}))


//exporting 
module.exports=adminApi