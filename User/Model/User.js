const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true
    },

    domain: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true
    },

    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER"
    },

    bio: {
      type: String,
      default: ""
    },

    reputation: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);
