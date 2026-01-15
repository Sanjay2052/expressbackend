const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  tags: {
    type: [String],
    default: [],
  }
});

module.exports = mongoose.model("tags", TagSchema);
