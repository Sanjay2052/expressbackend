const express = require("express");
const Comment = require("../models/comment");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/addcomment", auth, async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newComment = await Comment.create({
      comment:comment,
      userId: req.userId
    });
    res.status(201).json({
      message: "Comment added",
      comment: newComment
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/singlecommant/:id", async (req, res) => {
  try {
    let id=req.params.id
    const comments = await Comment.find(id)
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("deletecomment/:id", auth, async (req, res) => {
  try {
    let id=req.params.id
    const comment = await Comment.findOneAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
