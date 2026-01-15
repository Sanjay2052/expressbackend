let express = require("express");
let Question = require("../Model/Question");
let auth = require("../Middleware/auth");
const axios = require("axios");

let Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const fullquestions = await Question.find();
    res.json(fullquestions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



Router.get("/userquestion", auth, async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const questions = await Question.find({ userId })

    res.status(200).json(questions);
  } catch (error) {
    console.error("Get User Questions Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});





Router.get("/:id", async (req, res) => {
  try {
    const singledata = await Question.findById(req.params.id);
    if (!singledata) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(singledata);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});


// Express Route: POST /api/question
Router.post("/", auth, async (req, res) => {
  try {
    const { title, description, tags, code } = req.body;

    const newQuestion = new Question({
      title,
      description,
      tags: Array.isArray(tags) ? tags : [],
      code: code ? code.trim() : "",
      userId: req.userId
    });

    const savedQuestion = await newQuestion.save();

    // ✅ FIXED axios call
    if (Array.isArray(tags) && tags.length > 0) {
      await axios.post(
        "http://localhost:8013/api/tags/save-tags",
        { tags } // 👈 must be an object
      );
    }

    res.status(201).json({
      message: "Question added successfully",
      question: savedQuestion,
    });

  } catch (error) {
    console.error("Mongoose Error:", error.message);
    res.status(400).json({ message: error.message });
  }
});



Router.delete("/:id", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (
      question.userId.toString() !== req.user.userid &&
      req.user.role !== "ADMIN"
    ) {
      return res
        .status(403)
        .json({ message: "Only owner or admin can delete" });
    }

    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = Router;
