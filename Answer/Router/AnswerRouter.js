let express = require('express');
let mongoose = require('mongoose');
let auth = require('../Middleware/auth');
let Answer = require('../Model/Answer');

let Router = express.Router();

/* =========================
   USER ANSWERS (STATIC ROUTE)
   ========================= */
Router.get("/useranswer", auth, async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const answers = await Answer.find({ userId });
    console.log(answers);

    res.status(200).json(answers);
  } catch (error) {
    console.error("Get User Answers Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   ADD ANSWER TO QUESTION
   ========================= */
Router.post('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { content } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid questionId" });
    }

    const senddata = await Answer.create({
      userId,
      questionId: id,
      content
    });

    res.status(201).json(senddata);
  } catch (error) {
    console.error("Error creating answer:", error);
    res.status(500).json({ message: "Server error while adding answer" });
  }
});

/* =========================
   GET ANSWER BY ID (DYNAMIC)
   ========================= */
Router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid answer id" });
    }

    const answer = await Answer.findById(id);
    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = Router;
