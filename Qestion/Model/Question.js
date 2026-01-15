let mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      
    },
    description: { 
      type: String,
      required: true,
    },
    tags: { 
      type: [String],
      default: [],
    },
    code: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);