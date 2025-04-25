const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Sighting = require("../models/Sighting");
const Location = require('../models/Location');
const Creature = require("../models/Creature");
const { format } = require("date-fns");
const { ordinal } = require("date-fns-tz");
const session = require('express-session')

//store current user object
let userId;

//RESTful Routes
//fetch the new Sighting page
router.get('/new', (req, res) => {
   
    res.render('sightings/newSighting.ejs', { user: req.session.user.username });
});
//Create a new Sighting entry, possibly a location and creature as well.
router.post('/', async (req, res) => {
    const { date, name, category, habitat, size, city, kingdom, encounter, notes } = req.body;
    console.log(req.body)
    try {
        // Step 1: Handle Location
        let location = await Location.findOne({ city, kingdom });
        if (!location) {
            location = new Location({ city, kingdom });
            await location.save();
        }
        const locationId = location._id;
        console.log('location:', locationId);

        // Step 2: Handle Creature
        let creature = await Creature.findOne({ name });
        if (!creature) {
            creature = new Creature({ name, category, habitat: [habitat], size: [size], kingdom });
            await creature.save();
            console.log("new creature", creature)
            console.log(userId)
        } else {
            // Update habitat and size if not already present
            if (!creature.habitat.includes(habitat)) {
                creature.habitat.push(habitat);
            }
            if (!creature.size.includes(size)) {
                creature.size.push(size);
            }
            await creature.save();
            console.log("Updated creature:", creature);
        }
        const creatureId = creature._id;
        console.log(userId)
        // Step 3: Create Sighting
        const newSighting = new Sighting({
            date,
            location: locationId,
            user: req.session.user._id,
            creature: creatureId,
            encounter,
            notes
        });
        await newSighting.save();
        console.log("Sighting created:", newSighting);
        // Step 4: Update User, Location, and Creature with Sighting ID
        const currentUser = await User.findById(req.session.user._id);
        currentUser.sightings.push(newSighting._id);
        await currentUser.save();

        location.sightings.push(newSighting._id);
        await location.save();

        creature.sightings.push(newSighting._id);
        await creature.save();

        console.log("Sighting created successfully:", newSighting);
        res.redirect(`/users/${req.session.username}`);
    } catch (err) {
        console.error("Error creating sighting:", err);
        res.status(500).send("An error occurred while creating the sighting.");
    }
});

module.exports = router;