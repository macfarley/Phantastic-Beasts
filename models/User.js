const mongoose = require("mongoose");


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
  homeTown: String,
  sightings: [sightingSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
