const mongoose=require("mongoose")

let postschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    filename:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
 likes: [{ type: mongoose.Schema.Types.ObjectId }],
    comment:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"commentcol"  
    }]
})
let postmodel=mongoose.model("postcol",postschema,"postcol")
module.exports=postmodel