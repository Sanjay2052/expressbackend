const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER"
  }
}, { timestamps: true });

module.exports = mongoose.model("Auth", AuthSchema);
