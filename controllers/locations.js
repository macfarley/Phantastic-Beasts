const express = require("express");
const router = express.Router();
const Location = require("../models/location");


// RESTful Routes
// Upon login, users are directed to their respective pages based on their roles.
router.get("/", (req, res) => {
    res.render("/locations/indexMap.ejs");
});
// view a certain city when they click the name
router.get("/:zipCode", (req, res) => {
    const zipCode = req.params.zipCode;
    Location.findOne({ zipCode: zipCode }, (err, foundLocation) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while fetching the location.");
            return;
        }
        if (!foundLocation) {
            res.status(404).send("Location not found.");
            return;
        }
        res.render("/locations/showLocation.ejs", { location: foundLocation });
    });
});
// Here is where i'll put routes for admins to edit or delete Locations


module.exports = router;