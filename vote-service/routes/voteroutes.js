const express = require("express");
const Vote = require("../models/vote");
const auth = require("../middleware/auth.middleware");

const router = express.Router();


router.post("/", auth, async (req, res) => {
  try {
    const { voteType } = req.body;
    const userId = req.userId;
    let vote = await Vote.findOne({ userId });

    if (vote) {
      vote.voteType = voteType;
      await vote.save();
      return res.json({ message: "Vote updated" });
    }

    vote = await Vote.create({
      voteType,
      userId
    });

    res.status(201).json({ message: "Vote added", vote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;

    const upvotes = await Vote.countDocuments({
      itemId,
      voteType: "upvote"
    });

    const downvotes = await Vote.countDocuments({
      itemId,
      voteType: "downvote"
    });
    res.json({
      itemId,
      upvotes,
      downvotes,
      score: upvotes - downvotes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    const { itemId } = req.body;

    await Vote.findOneAndDelete({
      itemId,
      userId: req.userId
    });

    res.json({ message: "Vote removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
