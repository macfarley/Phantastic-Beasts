const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Sighting = require("../models/Sighting");
const Location = require('../models/Location');
const Creature = require("../models/Creature");
const { format } = require("date-fns");
const session = require('express-session')

// RESTful Routes
// Upon login, users are directed to their respective pages based on their roles.
router.get("/", async (req, res) => {
    const foundLocations = await Location.find({});
    res.render("locations/indexMap.ejs", { locations: foundLocations });
});
// view a certain city when they click the name
router.get('/:city', async (req, res) => {
    const city = req.params.city;
    const foundLocation = await Location.findOne({ city: city });
    if (!foundLocation) {
        return res.status(404).send("Location not found");
    }
    const sightings = await Sighting.find({ location: foundLocation._id });
    let creatureNames = [];
    if (sightings.length === 0) {
        creatureNames = "No sightings in this city...yet.";
    } else {
        for (const sighting of sightings) {
            const creature = await Creature.findById(sighting.creature);
            if (creature) {
                creatureNames.push(creature.name);
            }
        }
    }
    let foundUsers = [];
    if (!foundLocation.homeOf || foundLocation.homeOf.length === 0) {
        foundUsers = "No Explorers have registered with the Guild in this city yet.";
    }
    if (foundLocation.homeOf && foundLocation.homeOf.length > 0) {
        for (const userId of foundLocation.homeOf) {
            const user = await User.findById(userId);
            if (user) {
                foundUsers.push(user.username);
            }
        }
    }
    // res.send({location: foundLocation, creatures: creatureNames, explorers: foundUsers})
    res.render("locations/showLocation.ejs", { location: foundLocation, creatures: creatureNames, explorers: foundUsers });
    
});
    

// Here is where i'll put routes for admins to edit or delete Locations


module.exports = router;