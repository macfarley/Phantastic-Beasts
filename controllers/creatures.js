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
router.post("/category/", async (req, res) => {
    const category = req.body.category || req.query.category;
    console.log("Category requested:", category);
    try {
        const creatures = await Creature.find({ category: category });
        let creatureNames;

        if (creatures.length === 0) {
            creatureNames = ["No creatures found in this category...yet."];
        } else {
            creatureNames = creatures.map(creature => creature.name);
        }

        res.render('creatures/showCategory.ejs', { category: category, creatureNames });
    } catch (err) {
        console.error("Error fetching creatures by category:", err);
        res.status(500).send("Internal Server Error");
    }
});
// Here is where i'll put routes for admins to edit or delete Creatures
//fetch edit page
router.get("/species/:species/edit", async (req, res) => {
    const species = req.params.species;
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).send("Access denied. Admins only.");
    }
    res.render('creatures/editCreature.ejs', {name: species, category: '', sizes: [], habitats: [], notes: []});
});
//PUT edits into Creature object
router.put('/species/:species/edit', async (req, res) =>{
    const species = req.params.species
    try {
        // Look up the creature in the database
        const creature = await Creature.findOne({ name: species });
        if (!creature) {
            return res.status(404).send("Creature not found");
        }

        // Update category with the new value
        if (req.body.category) {
            creature.category = req.body.category;
        }

        // Update habitats: add the new value if it's not already present
        if (req.body.habitats && Array.isArray(req.body.habitats)) {
            req.body.habitats.forEach(habitat => {
                if (!creature.habitat.includes(habitat)) {
                    creature.habitat.push(habitat);
                }
            });
        }

        // Update sizes: add the new value if it's not already present
        if (req.body.sizes && Array.isArray(req.body.sizes)) {
            req.body.sizes.forEach(size => {
                if (!creature.size.includes(size)) {
                    creature.size.push(size);
                }
            });
        }

        // Save the updated Creature model
        await Creature.save();

        // Redirect back to the creature's page
        res.redirect(`/creatures/species/${species}`);
    } catch (err) {
        console.error("Error updating creature:", err);
        res.status(500).send("Internal Server Error");
    }
})
//DELETE creature from the edit page
router.delete('/species/:species', async (req, res) => {
    const species = req.params.species;
    try {
        const creature = await Creature.findOneAndDelete({ name: species });
        if (!creature) {
            return res.status(404).send("Creature not found");
        }
        res.status(200).send('Creature deleted successfully. <a href="/">Return to Home</a>');
    } catch (err) {
        console.error("Error deleting creature:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;