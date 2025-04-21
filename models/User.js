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
  size: {
    type: String,
    required: true,
    enum: ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"], // Restrict size to specific options
  },
  encounter: {
    type: String,
    required: true,
    enum: ["spotted", "ran away", "negotiated", "battled"], // Restrict encounter to specific options
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
