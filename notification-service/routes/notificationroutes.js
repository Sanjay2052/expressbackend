const express = require("express");
const Notification = require("../models/notification");
const auth = require("../middleware/auth.middleware");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { userId, message, type, itemId } = req.body;

    if (!userId || !message || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const notification = await Notification.create({
      userId:userId,
      message:message,
      type:type,
      itemId:itemId
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/usernotification", auth, async (req, res) => {
  try {
    let id=req.userId
    const notifications = await Notification.find({
      userId: id
    })
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch("/:id/read", auth, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
