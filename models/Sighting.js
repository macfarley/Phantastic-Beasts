const mongoose = require('mongoose');

const sightingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
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
        required: false,
        enum: ["Spotted", "Ran Away", "Negotiated", "Battled but Escaped", "Vanquished Creature", "Entry Ends.  This journal was found on a dead adventurer."], // Restrict encounter to specific options
    },
    notes: {
        type: String,
        required: false,
        maxlength: 200,
    },
});
const Sighting = mongoose.model("Sighting", sightingSchema);
module.exports = Sighting