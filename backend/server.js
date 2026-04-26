const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.log("❌ Erreur MongoDB:", err));

// Route de test
app.get('/', (req, res) => {
  res.send("Le serveur fonctionne !");
});

const PORT = process.env.PORT || 3001;
// Import des routes
const etudiantRoutes = require('./routes/etudiant.routes');

// Utilisation des routes
app.use('/api/etudiants', etudiantRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});