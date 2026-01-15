const mongoose = require("mongoose");

let commentschema = new mongoose.Schema({
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "postcol", 
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usercol", // Relation to the user
        required: true
    },
    commentText: {
        type: String,
        required: true
    }
}, { timestamps: true });

let commentmodel = mongoose.model("commentcol", commentschema, "commentcol");
module.exports = commentmodel;