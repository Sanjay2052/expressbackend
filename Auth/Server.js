let express=require("express")
let mongoose=require("mongoose")
let JWT=require('jsonwebtoken')
let authroute=require("./Routes/authroute")
let cors=require("cors")

let app=express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/stackauth")//added auth
  .then(() => console.log('MongoDB connected👍'))
  .catch(err => console.error(err));

app.use('/api/',authroute);


app.listen(8001,()=>{
    console.log("this port is student port in 8001");
    
})