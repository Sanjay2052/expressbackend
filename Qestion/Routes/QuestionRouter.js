let express = require("express");
let Question = require("../Model/Question");
let auth = require("../Middleware/auth");

let Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const fullquestions = await Question.find();
    res.json(fullquestions);
  } catch (error) {
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


Router.post("/", async (req, res) => {
  try {
    // We destructure 'details' to match the frontend key
    const { title, details, tags, code } = req.body; 

    // Server-side validation
    if (!title || title.trim().length < 10) {
      return res.status(400).json({ message: "Title is too short (min 10 chars)" });
    }

    if (!details || details.trim().length < 20) {
      return res.status(400).json({ message: "Description must be at least 20 characters" });
    }

    const newQuestion = new Question({
      title: title.trim(),
      description: details.trim(), // Mapping 'details' key to 'description' in DB
      tags: Array.isArray(tags) ? tags : [],
      code: code ? code.trim() : "",
      userId: "1" // Placeholder for logged in user
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json({
      message: "Question added successfully",
      question: savedQuestion,
    });
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
