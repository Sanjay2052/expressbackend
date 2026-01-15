const express = require("express");
const userauth = require("../middleware/auth");
const postmodel = require("../models/post");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const commentmodel=require('../models/Comment')

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const data = await postmodel.find().sort({ createdAt: -1 })
    console.log("data::",data)
    res.json(data);
  } catch (error) {
    console.error("GET POSTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
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
    console.log(description);
    

    if (!description) {
      return res.status(400).json({ message: "Description required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const newPost = await postmodel.create({
      userid: req.userid,         
      description,
      filename: req.file.filename, 
    });

    res.status(201).json({
      message: "Post created",
      post: newPost,
    });
  } catch (error) {
    console.error("POST UPLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});



router.get("/userpost", userauth, async (req, res) => {
  try {
    const data = await postmodel.find({ userid: req.userid });
    res.json(data);
  } catch (error) {
    console.error("USER POST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/comment/:postid", userauth, async (req, res) => {
    try {
        const { commentText } = req.body;
        const { postid } = req.params;

        if (!commentText) {
            return res.status(400).json({ message: "Comment cannot be empty" });
        }

        // 1. Create the new comment
        // req.userid comes from your auth middleware extracting the auth_token cookie
        const newComment = await commentmodel.create({
            postid,
            userid: req.userid, 
            commentText
        });

        // 2. Push the comment ID into the Post document
        await postmodel.findByIdAndUpdate(postid, {
            $push: { comment: newComment._id }
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error("COMMENT ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * GET ALL COMMENTS FOR A SPECIFIC POST
 * GET http://localhost:8006/api/post/comments/:postid
 */
router.get("/comments/:postid", async (req, res) => {
    try {
        const comments = await commentmodel.find({ postid: req.params.postid }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" });
    }
});
// POST http://localhost:8006/api/post/like/:postid
router.post("/like/:postid", userauth, async (req, res) => {
    try {
        const { postid } = req.params;
        const currentUserId = req.userid; // This comes from the cookie via middleware

        const post = await postmodel.findById(postid);
        if (!post) return res.status(404).json("Post not found");

        // Check if our ID is already in the likes array
        const hasLiked = post.likes.includes(currentUserId);

        if (hasLiked) {
            // REMOVE LIKE (Unlike)
            await postmodel.findByIdAndUpdate(postid, {
                $pull: { likes: currentUserId }
            });
            res.status(200).json({ liked: false });
        } else {
            // ADD LIKE
            await postmodel.findByIdAndUpdate(postid, {
                $push: { likes: currentUserId }
            });
            res.status(200).json({ liked: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error during like toggle");
    }
});
module.exports = router;
