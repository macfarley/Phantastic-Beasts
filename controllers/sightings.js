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
router.get('/sightings/new', (req, res) => {
    res.render('sightings/newSighting.ejs', { user: currentUser });
});