let express=require('express')
let mongoose=require('mongoose')
let JWT=require('jsonwebtoken')
let axios=require('axios')
let User=require('./Model/User')
let userrouter=require('./Routes/Userrouter')

let app=express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/stackuser")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.use('/api/user',userrouter);

app.listen(8002,()=>{
    console.log("the user server is running on port 8002");
    
})
