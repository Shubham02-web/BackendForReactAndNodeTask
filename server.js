const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const employeeRoutes = require("./Routes/employeeRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log(`connceted to mongodb at url ${process.env.MONGO_URI}`))
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", async function (req, res, next) {
  res.status(200).json({
    success: true,
    message: "Welcome to server page of React and Node Task",
  });
});
// Routes
app.use("/api/v1/employees", employeeRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
