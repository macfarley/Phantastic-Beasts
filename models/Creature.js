const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Constructs", "Dragonkin", "Eldritch Horror", "Magical Beast", "Outsider", "Plants", "Undead"], // Restrict category to specific options in alphabetical order
  },
  size: {
    type: String,
    required: true,
    enum: ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"], // Restrict size to specific options
  },
  habitat: {
    type: String,
    required: true,
    enum: ["Coastal", "Desert", "Forest", "Grassland", "Hills", "Mountains", "Ocean", "Swamp", "Underground", "Urban"], // Restrict habitat to specific options in alphabetical order
  },
});

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;