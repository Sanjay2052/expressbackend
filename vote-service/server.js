const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const voteRoutes = require("./routes/voteroutes");

dotenv.config();
const app = express();

app.use(express.json());


app.use("/votes", voteRoutes);

mongoose
  .connect("mongodb://localhost:27017/vote-servicedb")
  .then(() => console.log("✅ Vote Service DB Connected"))
  .catch((err) => console.error(err));


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Vote Service running on port ${PORT}`);
});
