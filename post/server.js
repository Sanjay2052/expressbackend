const express=require("express")
const mongoose=require("mongoose")
const postrouter=require("./Routes/post")
let cookieParser=require('cookie-parser')


let cors=require('cors')
let app=express()
app.use(express.json())

app.use(cookieParser()); 


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

mongoose.connect("mongodb://localhost:27017/stackpost").then(()=>{
    console.log("database can be conneted");
    
}).catch(()=>{
    console.log("data base cannot be canneted");
})

const path = require("path");


app.use("/uploads", express.static(path.join(__dirname, "Routes/uploads")));




app.use("/api/post",postrouter)

app.listen(8006,()=>{
    console.log("now the server is running");
})