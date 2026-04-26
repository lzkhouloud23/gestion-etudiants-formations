const express = require('express');
const router = express.Router();
const etudiantCtrl = require('../controllers/etudiant.controller');

router.post('/', etudiantCtrl.createEtudiant);
router.get('/', etudiantCtrl.getAllEtudiants);

module.exports = router;