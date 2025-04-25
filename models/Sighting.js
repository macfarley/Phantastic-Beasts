const mongoose = require('mongoose');

const sightingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
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
        enum: ["spotted", "fled", "parlay", "vanquished", "died"],
    },
    notes: {
        type: String,
        required: false,
        maxlength: 500,
    },
});
const Sighting = mongoose.model("Sighting", sightingSchema);
module.exports = Sighting