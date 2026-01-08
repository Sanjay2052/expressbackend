let mongoose = require('mongoose')

let AnswerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        index: true 
    },
    userId: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("answer", AnswerSchema)