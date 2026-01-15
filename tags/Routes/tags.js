const express = require("express");
const Tags = require("../models/tags");

const Router = express.Router();

Router.post("/save-tags", async (req, res) => {
  try {
    let { tags } = req.body;

    if (!Array.isArray(tags)) {
      return res.status(400).json({ message: "Tags must be an array" });
    }

    // normalize tags
    tags = tags.map(tag => tag.toLowerCase().trim());

    if (tags.length === 0) {
      return res.status(400).json({ message: "No valid tags provided" });
    }

    // 🔥 UPDATE ONE SINGLE DOCUMENT
    const savedTags = await Tags.findOneAndUpdate(
      {}, // ← match the single document
      {
        $addToSet: {
          tags: { $each: tags } // ← add only new tags
        }
      },
      {
        upsert: true, // ← create if not exists
        new: true
      }
    );

    res.status(200).json(savedTags);
  } catch (error) {
    console.error("Save tags error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = Router;
