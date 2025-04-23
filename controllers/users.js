const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Sighting = require("../models/Sighting");

// RESTful Routes
// Upon login, users are directed to their respective pages based on their roles.
// route to a user's list of sightings
router.get("/:username", (req, res) => {
User.findOne({ username: req.params.username }, (err, foundUser) => {
    if (err || !foundUser) {
        return res.status(404).send("User not found");
    }
    res.render("users/showUser.ejs", { user: foundUser });
});
});
//fetch a form page to edit sighting
router.get('/:username/:sightingId/edit', (req, res) => {
    if (req.session.username === req.params.username) {
        Sighting.findById(req.params.sightingId, (err, foundSighting) => {
            if (err || !foundSighting) {
                return res.status(404).send("Sighting not found");
            }
            res.render("sightings/editSighting.ejs", { sighting: foundSighting });
        });
    } else {
        res.status(403).send("Unauthorized");
    }
});
// 
// Here is where i'll put routes for admins to edit or delete Users who request


module.exports = router;