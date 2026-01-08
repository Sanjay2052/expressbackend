let mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Matches the 'description' field we mapped in the route
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
      // Changed to String for now so your "1" doesn't crash the app
      // OR use mongoose.Schema.Types.ObjectId if you have real IDs
      type: String, 
      required: true,
      // ref: "User" // Uncomment this later when you have a User model
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);