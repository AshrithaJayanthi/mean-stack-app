const exp=require('express')
const productApi=exp.Router()
const mc=require("mongodb").MongoClient;
const expressErrorHandler=require("express-async-handler")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const checkToken=require("./middlewares/verifyToken")

//for storing files into cloudinary
const multerObj=require("./middlewares/multerCloudinary")





// create product by async and await
productApi.post("/add-product",multerObj.single('photo'),expressErrorHandler(async (req,res,next)=>{
    let productCollectionObject=req.app.get("productCollectionObject")
    //get product obj
    let newProduct=JSON.parse(req.body.prodObj)
    // console.log(newProduct)
     //check if product exists in db with this productname
     let product=await productCollectionObject.findOne({model:newProduct.model})
        console.log("product is: ",product)
     //if product exists

     if(product!==null)
     {
         res.send({message:"product already exists"})
     }
     else{
       
         //add image url
         newProduct.profileImg=req.file.path
         delete newProduct.photo
        //since insertone returns nothing no need to store it
        await productCollectionObject.insertOne(newProduct)

        res.send({message:"product created successfully"})
     }

}))



//to read all products
productApi.get("/getproducts",expressErrorHandler(async(req,res,next)=>{
let productCollectionObject=req.app.get("productCollectionObject")
let products=await productCollectionObject.find().toArray()
res.send({message:products})
}))

productApi.put("/updateproduct/model",expressErrorHandler(async(req,res,next)=>{
    let modifiedProduct=JSON.parse(req.body.prodObj)
    await productCollectionObject.updateOne({model:modifiedProduct.model},{$set:{...modifiedProduct}})
        //send res
        res.send({message:"product updated"})
}))
//exporting 
module.exports=productApi
