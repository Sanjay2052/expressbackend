const express = require("express");
const userauth = require("../middleware/auth");
const postmodel = require("../models/post");
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await postmodel.find()
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    },
});



const upload = multer({ storage });


router.post("/", userauth, upload.single("image"), async (req, res) => {
    try {
        const { description } = req.body;

        const newPost = await postmodel.create({
            userid: req.userid,
            description,
            filename: req.file.filename
        });

        res.status(201).json({
            message: "Post created",
            post: newPost,
        });
    } catch (error) {
        res.status(500).json({ message: "Post upload failed" });
    }
});


router.get("/userpost", userauth, async (req, res) => {
    try {
        const data = await postmodel.find({ userid: req.user });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
