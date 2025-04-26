const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Sighting = require("../models/Sighting");
const Location = require('../models/Location');
const Creature = require("../models/Creature");
const { format } = require("date-fns");
const session = require('express-session')


// RESTful Routes
// Upon login, users are directed to their pages.
router.get('/', async (req, res) => {
    if (!req.session.user) {
        res.redirect("/home");
    } else {
        res.redirect(`/users/${req.session.user.username}`);
    }
}); 
// route to a user's profile
router.get("/:username", async (req, res) => {
    const username = req.params.username;    
    try {
        const foundUser = await User.findOne({ username: username });
        if (!foundUser) {
            return res.status(404).send("User not found");
        }
    //fetch the user's hometown 
        const hometown = await Location.findById(foundUser.homeTown);
        var city = hometown ? hometown.city : "Unknown City";
        var kingdom = hometown ? hometown.kingdom : "Unknown Kingdom";
    //fetch all the user's sightings
        let foundSightings = await Sighting.find({ _id: { $in: foundUser.sightings } });
        if (!foundSightings.length) {
            foundSightings = "This explorer has not recorded any sightings yet.";
        }else {
    //store creatures in sightings in an array
        var creatures = [];
        for (const sighting of foundSightings) {
            const creature = await Creature.findById(sighting.creature);
            if (creature) {
            creatures.push(creature);
            }
            }
        //store dates of sightings
        var dates = []
        for (const sighting of foundSightings) {
                dates.push(format(new Date(sighting.date), "MMMM dd, yyyy"));
            }
        }
                
        //render the showUser page 
        res.render("users/showUser.ejs", {currentUser: req.session.user.username, user: foundUser, sightings: foundSightings, city: city, kingdom: kingdom, creature: creatures, date: dates });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request.");
    }
});

// Here is where i'll put routes for admins to edit or delete Users who request


module.exports = router;