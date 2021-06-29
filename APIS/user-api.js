const exp=require('express')
const userApi=exp.Router()
const mc=require("mongodb").MongoClient;
const expressErrorHandler=require("express-async-handler")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const checkToken=require("./middlewares/verifyToken")

const multerObj=require("./middlewares/multerCloudinary")




//add body parser middleware
userApi.use(exp.json())



// //using await
userApi.get("/getusers",expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let userList=await userCollectionObj.find().toArray()
    res.send({message:userList})
}))

//async and await
userApi.get("/getuser/:username",expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    //get username from url params

    let un=req.params.username

    //search

    let userObj=await userCollectionObj.findOne({username:un})

    if(userObj===null)
    {
        res.send({message:"user not existed"})
    }
    else{
        res.send({message:userObj})
    }
}))





// create user by async and await
userApi.post("/createuser",multerObj.single('photo'),expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    //get user obj
    let newUser=JSON.parse(req.body.userObj)
     //check if user exists in db with this username
     let user=await userCollectionObj.findOne({username:newUser.username})

     //if user exists

     if(user!==null)
     {
         res.send({message:"user already exists"})
     }
     else{
         //hash password
         let hashedPassword= await bcrypt.hash(newUser.password,7)
         //replace password
         newUser.password=hashedPassword
         //add image url
         newUser.profileImg=req.file.path
         delete newUser.photo
        //since insertone returns nothing no need to store it
        await userCollectionObj.insertOne(newUser)

        res.send({message:"user created successfully"})
     }

}))

//update userrrr


//update user using async and await
userApi.put("/updateuser/:username",expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    //get modified user
    let modfiedUser=req.body
    //update
    await userCollectionObj.updateOne({username:modfiedUser.username},{ $set: {...modfiedUser}})
    //send res
    res.send({message:"user updated"})

}))
//delete user


//delete using async and await
userApi.delete("/deleteuser/:eno",expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let uid=( + req.params.eno)

    //find user if he exists or not

    let user=await userCollectionObj.findOne({eno:uid})

    if(user===null)
    {
        res.send({message:"no user id exists"})
    }

    else{
        await userCollectionObj.deleteOne({eno:uid})
        res.send({message:"deleted user"})
    }
}))


//user login
userApi.post("/login",expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    //get credentials

    let credentialsObj=req.body
    //search user by username
    let user=await userCollectionObj.findOne({username:credentialsObj.username})
    //if user not found

    if(user===null)
    {
        res.send({message:"invalid user name"})
    }
    else{
        //compare with the password
      let result= await bcrypt.compare(credentialsObj.password,user.password)
      //if pwds not matched
      if(result===false)
      {
          res.send({message:"inavalid password"})
      }
      else{
          //if pwd matches
          //create token
          let signedToken=await jwt.sign({username:credentialsObj.username},process.env.SECRET,{expiresIn:10})
          //send token to client
          res.send({message:"login success",token:signedToken,username:credentialsObj.username,userObj:user})
      }
    }
}))

//add to cart
// userApi.post("/add-to-cart",expressErrorHandler(async(req,res,next)=>{
// let userCartCollectionObject=app.req.get("userCartCollectionObject")
// let newProdObject=req.body;
// res.send(newProdObject)
// console.log("product obj is: ",newProdObject)

// //find usercart collection
// let userCartObj=await userCartCollectionObject.findOne({username:newProdObject.username})

// //if usercart is empty or not existed

// if (userCartObj===null)
// {
//     //step 1 : create an object
//     let products=[]
//     products.push(newProdObject.productObject)

//     console.log(products)

//     let newUserCartObject={username:newProdObject.username,products}
//     console.log(newUserCartObject)

//     //step 2: insert it
//     await userCartCollectionObject.insertOne(newUserCartObject)
//     res.send({message:"new product added"})
// }

// //if usercart already exists
// else{
// userCartObj.products.push(newProdObject.productObject)

// await userCartCollectionObject.updateOne({username:newProdObject.username},{$set:{...userCartObj}})
// res.send({message:"new product added"})
// }

// }
// ))
//add to cart
userApi.post("/add-to-cart", expressErrorHandler(async (req, res, next) => {

    let userCartCollectionObject = req.app.get("userCartCollectionObject")

    let newProdObject = req.body;
    console.log(newProdObject)

    //find usercartcollection 
    let userCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })

    //if userCartObj is not existed
    if (userCartObj === null) {

        //create new object
        let products = [];
        products.push(newProdObject.productObject)

        let newUserCartObject = { username: newProdObject.username, products }

        //insert it
        await userCartCollectionObject.insertOne(newUserCartObject)

        let latestCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
        res.send({ message: "New product Added", latestCartObj: latestCartObj })
        

    }
    //if existed
    else {

        //push productObject to products array
        userCartObj.products.push(newProdObject.productObject)
        //update document
        await userCartCollectionObject.updateOne({ username: newProdObject.username }, { $set: { ...userCartObj } })
        let latestCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
        res.send({ message: "New product Added", latestCartObj: latestCartObj })

    }
}))

//get products from usercart 
userApi.get("/getproducts/:username",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObject=req.app.get("userCartCollectionObject")
    let un=req.params.username
    let userProdObj=await userCartCollectionObject.findOne({username:un})
if(userProdObj===null)
{
    res.send({message:"CART EMPTY!"})
}
else
    {res.send({message:userProdObj})}
}))

//dummy route to create protected
userApi.get("/testing",checkToken,(req,res)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    res.send({message:"this is protected data"})
})
//exporting 
module.exports=userApi