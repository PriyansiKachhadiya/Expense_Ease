const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const expenseRoutes = require("./src/Routes/expenseRoutes.cjs");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./src/Models/user.cjs")
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sessionOptions = {
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized :true,
  cookie:{
    expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly : true,

  }

}

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  next();
})


// Routes
app.use("/expenses", expenseRoutes);

// Database connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
})();

// Error handling
app.use((req, res, next) => res.status(404).json({ message: "Route not found" }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(3000, () => console.log("App is listening on port 3000"));
