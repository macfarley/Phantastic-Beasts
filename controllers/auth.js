const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Location = require('../models/Location')
const bcrypt = require("bcrypt");

//RESTful routes
//get sign up page
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
  });

//post sign-up form
router.post("/sign-up", async (req, res) => {
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!usernameRegex.test(req.body.username)) {
      return res.status(406).send("Username must be at least 6 characters long and contain only letters and numbers.");
    }
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(406).send("Username already taken.");
    }
    const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
    if (!passwordRegex.test(req.body.password)) {
      return res.status(406).send("Password must be at least 8 characters long and contain only letters and numbers.");
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(406).send("Password and Confirm Password fields must match.");
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    //if they check the admin box in user creation set their role to admin
    if (req.body.admin) {
        req.body.role = "admin";
    }
    //if the location isn't already in the database create the entry now
    let location = await Location.findOne({ city: req.body.hometown, kingdom: req.body.kingdom });
    if (!location) {
      location = await Location.create({
      city: req.body.hometown,
      kingdom: req.body.kingdom,
      ...req.body // Assuming req.body contains other fields matching the Location schema
      });
    }
    req.body.hometown = location
    const user = await User.create(req.body);
    res.send(`Thanks for signing up ${user.username}, please wait while we send you to our homepage`);
    setTimeout(() => {
      res.redirect("../");
    }, 5000);
  });
// Sign-in route
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  }
);

router.post("/sign-in", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
//false user
    if(!userInDatabase) {
        return res.status(401).send("Login Failed.");
    }
//compare password
    const validPassword = bcrypt.compareSync(
        req.body.password, 
        userInDatabase.password
    );
    if(!validPassword) {
        return res.status(401).send("Login Failed.");
    }
// There is a user AND they had the correct password. Time to make a session!
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id
  };


  console.log(`User logged in: ${userInDatabase.username}`);

  res.redirect(`../users/${userInDatabase.username}`);
});

router.get("/sign-out", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});



module.exports = router;