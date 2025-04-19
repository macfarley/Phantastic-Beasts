const mongoose = require('mongoose');


const LocationSchema = new mongoose.Schema({
    city: { type: String, required: true },
    kingdom: { type: String, required: true },
    creatures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creature'
    }],
    homeOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;