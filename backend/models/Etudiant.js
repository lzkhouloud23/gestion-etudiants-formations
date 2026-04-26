const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String },
  // C'est ici qu'on fait la liaison avec le modèle Formation
  formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation' }
});

module.exports = mongoose.model('Etudiant', etudiantSchema);