let express = require('express')
let mongoose = require('mongoose')
let auth = require('../Middleware/auth')
const User = require('../Model/User')



let Router = express.Router()


Router.get('/profile', auth, async (req, res) => {
    try {
        let userid=req.userId
        let userdatas = await User.findOne({userid:userid})
        console.log(userdatas);
        
        if (!userdatas) res.status(400).json({ message: "the Useris not findable" })
            res.json(userdatas)
    } catch (error) {
        console.error("profile_error:", error);
    }
})
Router.post("/create", async (req, res) => {
  try {
    const { name, domain, email, role, userid } = req.body;

    if (!userid || !name || !domain || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingProfile = await User.findOne({ userId: userid });
    if (existingProfile) {
      return res.status(409).json({ message: "Profile already exists" });
    }

    const profile = await User.create({
      userId: userid,
      domain,
      name,
      email,
      role: role === "ADMIN" ? "ADMIN" : "USER"
    });

    return res.status(201).json({
      message: "User profile created successfully",
      profile
    });
  } catch (error) {
    console.error("Profile Create Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

Router.get('/users',async(req,res)=>{
    let data=await User.find()
    res.json(data)
})
Router.post('/findusers',async(req,res)=>{
    let {email}=req.body
    let data=await User.findOne(email)
    if(!data)return res.status(300).json({message:"the email is not avilable"})
    res.json(data)
})

module.exports = Router