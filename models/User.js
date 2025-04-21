const mongoose = require("mongoose");
const Location = require("./Location.js");
const Creature = require('./Creature.js')

const sightingSchema = new mongoose.Schema({
  creature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Creature",
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  encounter: {
    type: String,
    required: true,
    enum: ["Spotted", "Ran Away", "Negotiated", "Battled but Escaped", "Vanquished Creature", "Entry Ends.  This journal was found on a dead adventurer."], // Restrict encounter to specific options
  },
});

const userSchema = new mongoose.Schema({ 
  name: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  sessionSecret: {
    type: String,
    required: true,
  },
  role: { 
    type: String, 
    required: true, 
    enum: ["user", "admin"], // Restrict role to "user" or "admin"
    default: "user" // Default role is "user"
  },
  homeTown: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location", // Reference the Location model
  },
  sightings: [sightingSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
