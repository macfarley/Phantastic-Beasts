const mongoose = require("mongoose");
const Location = require("./Location.js");
const Sighting = require('./Sighting.js')



const userSchema = new mongoose.Schema({ 
  username: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  role: { 
    type: String, 
    required: true, 
    enum: ["user", "admin"], // Restrict role to "user" or "admin"
    default: "user" // Default role is "user"
  },
  class: {
    type: String,
    required: true,
    enum: ["Bard", "Barbarian", "Cleric", "Druid", "Fighter", "Paladin", "Ranger", "Rogue", "Wizard"] // Restrict class to specific values
  },
  homeTown: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location", // Reference the Location model
    required: true
  },
  sightings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sighting" // Reference the Sighting model
  }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
