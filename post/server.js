const express=require("express")
const mongoose=require("mongoose")
const postrouter=require("./Routes/post")
let app=express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/stackpost").then(()=>{
    console.log("database can be conneted");
    
}).catch(()=>{
    console.log("data base cannot be canneted");
})
app.use("/api/post",postrouter)

app.listen(8005,()=>{
    console.log("now the server is running");
})