const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },

  name: {
    type: String
  },

  email: {
    type: String
  },

  role: {
    type: String,
    enum: ["ADMIN", "USER"]
  },

  bio: {
    type: String,
    default: ""
  },

  reputation: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("UserProfile", UserProfileSchema);
