const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  habitat: {
    type: String,
    required: true,
  },
});

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;