const express = require("express");
const router = express.Router();
const Sighting = require("../models/Sighting");
const Creature = require("../models/Creature");


// RESTful Routes
// Show Full Beastiary
router.get("/", async (req, res) => {
    try {
        const creatures = await Creature.find({}, "name");
        const creatureNames = creatures.map(creature => creature.name);

        res.render('creatures/indexBeastiary.ejs', { creatureNames });
    } catch (err) {
        console.error("Error fetching creatures:", err);
        res.status(500).send("Internal Server Error");
    }
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
//route to find all creatures of a certain category
router.post("/category/:category", async (req, res) => {
    const category = req.params.category;
    try {
        const creatures = await Creature.find({ category: category });
        if (creatures.length === 0) {
            return res.status(404).send("No creatures found in this category");
        }

        const creatureNames = creatures.map(creature => creature.name);

        res.render('creatures/showCategory.ejs', { category, creatureNames });
    } catch (err) {
        console.error("Error fetching creatures by category:", err);
        res.status(500).send("Internal Server Error");
    }
});
// Here is where i'll put routes for admins to edit or delete Creatures


module.exports = router;