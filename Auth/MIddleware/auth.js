let JWT=require('jsonwebtoken')
require('dotenv').config()

function auth(req,res,next){

    try{
  const authHeader = req.headers.authorization;

    if (!authHeader) {
      return console.log("no header and data");
      
    }

        let token=req.headers.authorization?.split(" ")[1];
        console.log("token in auth::",token);
        if(!token) return res.status(500).json("there is no token is available")
        
        let decode=JWT.verify(token,"secret")
        console.log("decoded:",decode);

        req.user=decode.userid
        console.log(" req.userid:", req.user.userid);
        next()

    }catch(error){
        console.error(error);
        return res.status(401).json({error:"no auth avilable"})
        
    }
    
}

module.exports=auth