const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const cookieParser = require("cookie-parser");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const dbURL = process.env.DB_URL;
const bodyParser = require("body-parser");
const passport = require("passport");

mongoose.connect(dbURL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser(process.env.SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://www.admin.geekclash.in",
      "https://geekclash.in",
      process.env.SITE_URL,
      process.env.ADMIN_URL,
    ],
    credentials: true,
  })
);
// Allow requests from the specified origin(s)
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const leaderboardRoutes = require("./routes/leaderboardRoutes");
app.use("/leaderboard", leaderboardRoutes);

const user = require("./routes/userRoutes");
app.use("/user", user);

const admin = require("./routes/adminRoutes");
app.use("/admin", admin);

const quiz = require("./routes/quizRoutes");
app.use("/quiz", quiz);

const payments = require("./routes/payments");
app.use("/payments", payments);

const reward = require("./routes/rewardRoute");
app.use("/reward", reward);

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  console.log(err);
  res.status(statusCode).json(err.message);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
