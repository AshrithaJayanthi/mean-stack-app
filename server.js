const exp=require("express")
const app=exp()
const path=require("path")
require("dotenv").config()

const mc=require("mongodb").MongoClient;
//import apis
const userApi=require("./APIS/user-api")
const adminApi = require('./APIS/admin-api')
const productApi = require("./APIS/product-api")


//execute specific api based on path
app.use("/user", userApi)
app.use("/admin", adminApi)
app.use("/product",productApi)

// app.use("/product",productApi)
//connect
app.use(exp.static(path.join(__dirname,'./dist/backendapp/')))
//connection string

databaseUrl=process.env.DATABASE_URL

//connect to db
mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("err in db connection:",err)
    }
    else{
        //getting db obj from client object
        let databaseObj=client.db("myfirstdb")

        //create usercollection obj

       let userCollectionObj=databaseObj.collection("usercollection")
       let adminCollectionObj = databaseObj.collection("admincollection")
        let productCollectionObject = databaseObj.collection("productcollection")
        let userCartCollectionObject=databaseObj.collection("usercartcollection")
        app.set("userCollectionObj",userCollectionObj)
        console.log("connected to user database!")
        app.set("adminCollectionObj", adminCollectionObj)
        console.log("connected to admin database!")
        app.set("productCollectionObject", productCollectionObject)
        console.log("connected to product database!")
        app.set("userCartCollectionObject", userCartCollectionObject)
        console.log("connected to usercartdatabase!")
        

    }
})





app.use((req,res,next)=>{
    res.send({message:`${req.url} isnt valid`})
})

app.use((err,req,res,next)=>{
    res.send({message:`error is ${err.message} `})
})
//assigning port
const port=process.env.PORT || 8080

app.listen(port,()=>console.log(`server listening on ${port}`))








