const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    city: { type: String, required: true },
    kingdom: { 
        type: String, 
        required: true, 
        enum: [
            'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 
            'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 
            'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 
            'missouri', 'montana', 'nebraska', 'nevada', 'new hampshire', 'new jersey', 'new mexico', 
            'new york', 'north carolina', 'north dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 
            'rhode island', 'south carolina', 'south dakota', 'tennessee', 'texas', 'utah', 'vermont', 
            'virginia', 'washington', 'west virginia', 'wisconsin', 'wyoming'
        ] 
    },
    creatures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creature'
    }],
    homeOf: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;