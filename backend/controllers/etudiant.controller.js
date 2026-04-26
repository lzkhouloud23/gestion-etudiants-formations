const Etudiant = require('../models/Etudiant');

// Ajouter un étudiant
exports.createEtudiant = async (req, res) => {
  try {
    const newEtudiant = new Etudiant(req.body);
    await newEtudiant.save();
    res.status(201).json(newEtudiant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lire tous les étudiants (avec les détails de leur formation grâce à populate)
exports.getAllEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.find().populate('formation');
    res.json(etudiants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};