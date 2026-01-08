const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const notificationRoutes = require("./routes/notificationroutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/notifications", notificationRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/notification-servicedb")
  .then(() => console.log("✅ Notification Service DB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`🚀 Notification Service running on port ${PORT}`);
});
