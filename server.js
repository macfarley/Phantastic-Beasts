const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');
const zipcodes = require('zipcodes');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";
//mongoose connection information
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
//session keeps the user logged in
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
//public folder holds stylesheets and images
app.use(express.static("public"));

//controller variables
const authController = require("./controllers/auth.js");
const userController = require('./controllers/user.js');
const creatureController = require('./controllers/creature.js');
const locationController = require('./controllers/location.js')

// RESTful routes for the app
// GET Home page
app.get("/", async (req, res) => {
    res.render("home.ejs", {
        user: req.session.user,
      });
  });

//route through auth controller for sign in or sign up
app.use("/auth", authController);
//route through user controller for user-related actions
app.use("/users", userController); //
//route through creature controller for Beastiary and Species show page
app.use("/creatures", creatureController);
//route through location controller
app.use("/locations", locationController);


//server connection port
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
