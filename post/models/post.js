const mongoose=require("mongoose")

let postschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
})
let postmodel=mongoose.model("postcol",postschema,"postcol")
module.exports=postmodel