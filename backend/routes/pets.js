const express = require('express');
const router = express.Router();

const { getAllPets } = require('../controllers/petsController');

// GET /api/pets
router.get('/', getAllPets);

module.exports = router;
