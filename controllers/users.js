const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Sighting = require("../models/Sighting");

// RESTful Routes
// Upon login, users are directed to their respective pages based on their roles.
// route to a user's list of sightings
router.get("/:username", async (req, res) => {
    const username = req.params.username;
    try {
        const foundUser = await User.findOne({ username: username });
        if (!foundUser) {
            return res.status(404).send("User not found");
        }
        console.log(foundUser);
        res.render(`/users/${foundUser.username}`, { user: foundUser });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
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