const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const commentRoutes = require("./routes/commentroutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/comments", commentRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/comment-servicedb")
  .then(() => console.log("✅ Comment Service DB Connected"))
  .catch((err) => console.error(err));

const PORT =4001;
app.listen(PORT, () => {
  console.log(`🚀 Comment Service running on port ${PORT}`);
});
