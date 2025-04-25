const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Sighting = require("../models/Sighting");
const Location = require('../models/Location');
const Creature = require("../models/Creature");


// RESTful Routes
// Show Full Beastiary
router.get("/", (req, res) => {
    Creature.find({}, "name", (err, creatures) => {
        if (err) {
            console.error("Error fetching creatures:", err);
            return res.status(500).send("Internal Server Error");
        }

        const creatureNames = creatures.map(creature => creature.name);

        res.render('/creatures/beastiary.ejs', { creatureNames });
    });
});
// route to a certain Creature page
router.get("/species/:species", async (req, res) => {
    let species = req.params.species;
    if (species) {
        species = species.replace(/([A-Z])/g, ' $1').trim();
    }
    try {
        const creature = await Creature.findOne({ name: species });
        if (!creature) {
            return res.status(404).send("Creature not found");
        }

        const sightings = await Sighting.find({ creature: creature._id });

        res.render('creatures/showCreature.ejs', {
            name: creature.name,
            category: creature.category,
            sizes: creature.size,
            habitats: creature.habitat,
            notes: sightings.map(sighting => sighting.notes)
        });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Internal Server Error");
    }

});
//route to find all creatures of a certain caregory

// Here is where i'll put routes for admins to edit or delete Creatures


module.exports = router;