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
Router.post('/create', async (req, res) => {
    let { name, email, role,userid } = req.body
    console.log("user id",userid);
    
    try {
        let profile = await User.create({
            userId: userid,
            name,
            email,
            role
        })
        res.json(profile)
    } catch (error) {
        console.error(error);

    }
})
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