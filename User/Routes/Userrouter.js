let express = require('express')
let mongoose = require('mongoose')
let auth = require('../Middleware/auth')
const User = require('../Model/User')



let Router = express.Router()


Router.get('/profile', auth, async (req, res) => {
    try {
        // req.userid comes from your auth middleware (decoded.userid)
        const userid = req.userid; 
        console.log("userid:",userid);
        
        // IMPORTANT: Search by your custom 'userId' field, not findById
        const userdatas = await User.findOne({ userId: userid }).select("-password"); 
        
        console.log("Profile check for ID:", userid, "Found:", userdatas ? "Yes" : "No");
        
        if (!userdatas) {
            return res.status(404).json({ message: "User not found in DB" });
        }

        res.json(userdatas); 
    } catch (error) {
        console.error("profile_error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
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
// ✅ GET USER BY userId (USED BY POSTCARD)
Router.get("/finduser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("iddddd:",id);
    
    const user = await User.findOne({ userId: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = Router
