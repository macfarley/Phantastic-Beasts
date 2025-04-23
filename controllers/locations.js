const express = require("express");
const router = express.Router();
const Location = require("../models/location");


// RESTful Routes
// Upon login, users are directed to their respective pages based on their roles.
router.get("/", (req, res) => {
    res.render("/locations/indexMap.ejs");
});
// view a certain city when they click the name

// Here is where i'll put routes for admins to edit or delete Locations


module.exports = router;