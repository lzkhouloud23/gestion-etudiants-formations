const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String },
    niveau: { 
        type: String, 
        enum: ['Licence', 'Master', 'Ingénieur', 'Doctorat', 'Autre'],
        required: true 
    },
    departement: { type: String }
});

module.exports = mongoose.model('Formation', formationSchema);