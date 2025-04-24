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
var currentUser = null;
if (session && session.username) {
    User.findOne({ username: session.username })
        .then(user => {
            currentUser = user;
        })
        .catch(err => {
            console.error("Error fetching user:", err);
        });
}
//RESTful Routes
//fetch the new Sighting page
router.get('/new', (req, res) => {
    res.render('sightings/newSighting.ejs', { user: currentUser });
});
//Create a new Sighting entry, possibly a location and creature as well.
router.post('/', (req, res) => {
    const { date, name, category, habitat, size, city, kingdom, encounter, notes } = req.body;
    try {
        Location.findOne({ city: city })
            .then(location => {
                if (!location) {
                    // If the location doesn't exist, create a new one
                    const newLocation = new Location({ city });
                    return newLocation.save();
                }
                return location;
            })
            .then(location => {
                req.body.location = location._id; // Attach location ID to the request body
            })
            .catch(err => {
                console.error("Error handling location:", err);
            });

        Creature.findOne({ name: name })
            .then(creature => {
                if (!creature) {
                    // If the creature doesn't exist, create a new one
                    const newCreature = new Creature({ name, category, habitat, size, kingdom });
                    return newCreature.save();
                }
                if (creature) {
                    // Check and update habitat and size if not already present
                    if (!creature.habitat.includes(habitat)) {
                        creature.habitat.push(habitat);
                    }
                    if (!creature.size.includes(size)) {
                        creature.size.push(size);
                    }
                    return creature.save();
                }
                return creature;
            })
            .then(creature => {
                // Create a new Sighting entry
                const newSighting = new Sighting({
                    date,
                    location,
                    user: currentUser,
                    creature: creature._id,
                    encounter,
                    notes,
                });
                return newSighting.save();
            })
            .then(newSighting => {
                // Add the sighting ID to the user's sightings array
                currentUser.sightings.push(newSighting._id);
                currentUser.save().catch(err => {
                    console.error("Error updating user sightings:", err);
                });

                // Add the sighting ID to the location's sightings array
                Location.findById(newSighting.location)
                    .then(location => {
                        location.sightings.push(newSighting._id);
                        return location.save();
                    })
                    .catch(err => {
                        console.error("Error updating location sightings:", err);
                    });

                // Add the sighting ID to the creature's sightings array
                Creature.findById(newSighting.creature)
                    .then(creature => {
                        creature.sightings.push(newSighting._id);
                        return creature.save();
                    })
                    .catch(err => {
                        console.error("Error updating creature sightings:", err);
                    });
                console.log("Sighting created successfully:", newSighting);
                res.redirect(`/users/${currentUser._id}`);
            })
            .catch(err => {
                console.error("Error creating sighting:", err);
                res.status(500).send("An error occurred while creating the sighting.");
            });
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).send("An unexpected error occurred.");
    }
});
module.exports = router;