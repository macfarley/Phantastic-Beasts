const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const Sighting = require('../models/Sighting')

// RESTful Routes
// Upon login, users are directed to their respective pages based on their roles.
router.get("/", async (req, res) => {
    const foundLocations = await Location.find({});
    const foundSightings = await Sighting.find({});
    res.render("locations/indexMap.ejs", { locations: foundLocations, sightings: foundSightings });
});
// view a certain city when they click the name

// Here is where i'll put routes for admins to edit or delete Locations


module.exports = router;