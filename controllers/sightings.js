const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Sighting = require("../models/Sighting");
const Location = require('../models/Location');
const Creature = require("../models/Creature");

const session = require('express-session')

//store current user object
let userId;

//RESTful Routes
//fetch the new Sighting page
router.get('/new', (req, res) => {
   
    res.render('sightings/newSighting.ejs', { user: req.session.user.username });
});
//Create a new Sighting entry, possibly a location and creature as well.
router.post('/new', async (req, res) => {
    const { date, name, category, habitat, size, city, kingdom, encounter, notes } = req.body;
    console.log(req.body, req.session)
    try {
        // Step 1: Handle Location
        var location = await Location.findOne({ city, kingdom });
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
        console.log("Sighting created.", newSighting);
        // Step 4: Update User, Location, and Creature with Sighting ID
        await User.findByIdAndUpdate(
            req.session.user._id,
            { $push: { sightings: newSighting._id } },
            { new: true }
        );
        
        await Location.findByIdAndUpdate(
            locationId,
            { $push: { sightings: newSighting._id } },
            { new: true }
        );

        await Creature.findByIdAndUpdate(
            creatureId,
            { $push: { sightings: newSighting._id } },
            { new: true }
        );

        console.log("Sighting added to other models.", newSighting);
        res.redirect(`../users/${req.session.user.username}`);
    } catch (err) {
        console.error("Error creating sighting:", err);
        res.status(500).send("An error occurred while creating the sighting.");
    }
});
//from the user's page, fetch an edit page for a particular sighting
router.get('/edit/:sightingId', async (req, res) => {
    const sightingId = req.params.sightingId;
    const sighting = await Sighting.findById(sightingId).populate('creature').populate('location');
    res.render('sightings/editSighting.ejs', { user: req.session.user.username, sighting });
})
//from the edit page, handle the update of the sighting
router.put('/edit/:sightingId', async (req, res) => {
    const sightingId = req.params.sightingId;
    const { date, encounter, notes } = req.body;
    try {
        const updatedSighting = await Sighting.findByIdAndUpdate(sightingId, { date, encounter, notes }, { new: true });
        console.log("Sighting updated:", updatedSighting);
        res.redirect(`/users/${req.session.user.username}`);
    } catch (err) {
        console.error("Error updating sighting:", err);
        res.status(500).send("An error occurred while updating the sighting.");
    }
});
//from the edit page, delete the entire entry instead.
router.delete('/delete/:sightingId', async (req, res) => {
    const sightingId = req.params.sightingId;
    try {
        await Sighting.findByIdAndDelete(sightingId);
        console.log("Sighting deleted:", sightingId);
        res.redirect(`/users/${req.session.user.username}`);
    } catch (err) {
        console.error("Error deleting sighting:", err);
        res.status(500).send("An error occurred while deleting the sighting.");
    }
});


module.exports = router;