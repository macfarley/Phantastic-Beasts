const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["constructs", "dragonkin", "eldritch-horror", "giant", "magical-beast", "outsider", "plants", "undead"], // Restrict category to specific options in alphabetical order
  },
  size: {
    type: [String],
    required: true,
    enum: ["tiny", "small", "medium", "large", "huge", "gargantuan"], // Restrict size to specific options
  },
  habitat: {
    type: [String],
    required: true,
    enum: ["coastal", "desert", "forest", "grassland", "hills", "mountain", "ocean", "swamp", "underground", "urban"], // Restrict habitat to specific options in alphabetical order
  },
  sightings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sighting",
    },
  ],
});

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;