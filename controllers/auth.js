const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");


router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
  });

router.post("/sign-up", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.status(406).send("Username already taken.");
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(406).send("Password and Confirm Password fields must match");
      }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    //if they check the admin box in user creation set their role to admin
    if (req.body.isAdmin) {
        req.body.role = "admin";
    }
    //if the location isn't already in the database create the entry now
    const location = await Location.findOneAndUpdate(
      { name: req.body.hometown },
      { upsert: true, new: true }
    );
    req.body.hometown = location._id;
        // Create a new user in the database
    const user = await User.create(req.body);
    res.send(`Thanks for signing up ${user.username}, please wait while we send you to our homepage`);
    res.redirect("/");
  });
// Sign-in route
router.get("/sign-in", (req, res) => {
    res.render("/auth/sign-in.ejs");
  }
);

router.post("/sign-in", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });

    //does user exist?
    //if not, throw error
    if(!userInDatabase) {
        return res.status(401).send("Login Failed.");
    }
    //does password match?
    //if not, throw error
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

  res.redirect("../users/");
});

router.get("/sign-out", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});



module.exports = router;