const express = require("express");
const mongoose = require("mongoose");
const tagsrouter = require("./Routes/tags");

const app = express();

app.use(express.json()); 

mongoose
  .connect("mongodb://127.0.0.1:27017/stacktags")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/tags", tagsrouter); 

const PORT = 8013;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
