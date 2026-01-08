let JWT=require('jsonwebtoken')
require("dotenv").config()

function auth(req,res,next){
    try{

        let token=req.headers.autherization?.split("")[1]
        if(!token)return res.status(200).json({message:"token not findable"})
            
            let decoded=JWT.verify(token,process.env.JWT_SECRET) 
            console.log("decoaded:",decoded);
            req.user=decoded
            next()
            
    }catch(error){
        console.error(error);
        return res.status(200).json({message:"there is a error on the auth"})
    }
}
module.exports=auth