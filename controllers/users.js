const express = require("express");
const User = require("../models/User");
const router = express.Router();

// RESTful Routes
// Upon login, users are directed to their respective pages based on their roles.
router.get("/", (req, res) => {
    if (req.user && req.user.role === "admin") {
        return res.render('/users/indexUser.ejs');
    }
    try {
        res.render('/users/showUser.ejs');
    } catch (error) {
        console.error("Error rendering user page:", error);
        res.status(500).send("Internal Server Error");
    }
});
// route to a user's list of sightings
router.get("/:userName", (req, res) => {
    User.findOne({ userName: req.params.userName }, (err, user) => {
        if (err) {
            console.error("Error finding user:", err);
            return res.status(500).send("Internal Server Error");
        }
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render('/users/showUser.ejs', { user });
    });
    res.render('/users/showUser.ejs');
});
// Here is where i'll put routes for admins to edit or delete Users who request


module.exports = router;