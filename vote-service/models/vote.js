const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema);
