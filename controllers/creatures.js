const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Creature = require("../models/Creature");


// RESTful Routes
// Show Full Beastiary
router.get("/", (req, res) => {
    try {
        if (req.session.user) {
            Creature.find({}, (err, creatures) => {
                if (err) {
                    console.error("Error fetching creatures:", err);
                    return res.status(500).send("Internal Server Error");
                }
                res.render('/creatures/indexBeastiary.ejs', { creatures });
            });
        } else {
            res.status(403).send("Forbidden: You must be logged in to view this page.");
        }
    } catch (error) {
        console.error("Error rendering Beastiary:", error);
        res.status(500).send("Internal Server Error");
    }
});
//Jump to a certain Category
router.get("/:category", async (req, res) => {
    try {
        await Creature.find({ category: req.params.category }, (err, creatures) => {
            if (err) {
                console.error("Error finding creatures by category:", err);
                return res.status(500).send("Internal Server Error");
            }
            if (creatures.length === 0) {
                return res.status(404).send("No creatures found in this category");
            }
            res.render('/creatures/indexBeastiary.ejs', { creatures, category: req.params.category, uniqueId: req.params.category });
        });
    } catch (err) {
        console.error("Error finding creatures by category:", err);
        return res.status(500).send("Internal Server Error");
    }
});
// route to a certain Creature page
router.get("/:species", (req, res) => {
    Creature.findOne({ name: req.params.species }, (err, creature) => {
        if (err) {
            console.error("Error finding creature:", err);
            return res.status(500).send("Internal Server Error");
        }
        if (!creature) {
            return res.status(404).send("Creature not found");
        }
        res.render('/creatures/showCreature.ejs', { creature });
    });    
});
// Here is where i'll put routes for admins to edit or delete Creatures


module.exports = router;