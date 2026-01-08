let JWT = require('jsonwebtoken')
require("dotenv").config()

function auth(req, res, next) {
    let token = req.headers.autherization?.split(" ")[1]
    if (!token) res.status(401).json({ message: "the token is not available" })
    let decode = JWT.verify(token, process.env.JWT_SECRET)
    console.log("decode:", decode);
    if (!decode) res.status(400).json({ message: "JWT not verifiedd" })
    req.user = decode.userid

    console.log('userid:',req.user.userid)
    next()

}
module.exports = auth