let express = require('express')
let JWT = require('jsonwebtoken')
let bcrypt = require('bcrypt')
require('dotenv').config();
let auth = require('../Middleware/auth')
let User = require('../Model/User')
let axios=require('axios')


let Router = express.Router()



Router.post('/register', async (req, res) => {
    let { name, email, password,role } = req.body

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        let hashed = await bcrypt.hash(password, 10)
        let Userr = new User({
            name,
            email,
            password: hashed,
            role

        })
       
        await Userr.save()
         console.log("Userr:",Userr)
        await axios.post('http://localhost:8002/api/user/create',{name,email,role,userid:Userr._id})
        res.status(201).json({
            message: 'Registerd successfully',
            user: Userr
        });
        console.log("data addeddd create");
        

    } catch (error) {
        console.error(error);
    }
})
Router.post('/login', async (req, res) => {
    let { email, password } = req.body
    try {
        let userdata = await User.findOne({ email })
        if (!userdata) return res.status(401).json({ message: "The email is not valiud" })
        let matching = await bcrypt.compare(password, userdata.password)
        if (!matching) return res.status(401).json({ message: "the given password is not matching" })

        const token = JWT.sign({ userid: userdata._id,email:userdata.email,username:userdata.name,role:userdata.role },"secret", { expiresIn: "1d" })

        res.json({
            message: "login success full",
            token
        })

    } catch (error) {
        console.error(error);
    }

})
// Router.get('/profile',auth,async(req,res)=>{
//     let {username,email,role}=req.user

//     console.log("regg",username)
//     console.log("email",email)
//     console.log("role",role)


// })



// Router.post('/change-password', auth, async (req, res) => {
//     let userid = req.userid
// console.log("userrrrr:",userid);

//     let { email, oldpassword, newpassword } = req.body

//     try {
//         let user = await User.findOne({ email })
//         if (!user) return res.status(400).json({ message: "this email not found" })

//         let matching = await bcrypt.compare(oldpassword, user.password)
//         if (!matching) return res.status(401).json({ message: "the oldpassword not matching currectly" })
// console.log("maching old and new");

//         let newpass = await bcrypt.hash(newpassword, 10)
//         console.log("new password::", newpass)
//         user.password = newpass;
//         await user.save();

//         return res.status(200).json({ message: "Password updated successfully" });


//     } catch (error) {
//         console.error(error);

//     }


// })

// Router.post('/update', auth, async (req, res) => {
//     let userid = req.userid
//     let {name,email,password}=req.body


//     try {
//         let userdata = await User.findById(userid)
//         if (!userdata) return res.status(401).json({ message: "the user data not available" })

//         let change=await User.findByIdAndUpdate(userid,{
//             name:name,
//             email:email
//         })
//         console.log(change)
//         if(!change)return res.status(400).json({message:"the data not updated"})

//         res.json("data updated")

//     } catch (error) {
//         console.error(error)
//     }


// })
//forget 
//update
//
  // 🔗 CALL USER SERVICE
//   await axios.post("http://localhost:5001/api/users/create", {
//     userId: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role
//   });

//   res.status(201).json({
//     message: "Registered successfully"
//   });



module.exports = Router