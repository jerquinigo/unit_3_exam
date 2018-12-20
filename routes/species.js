const express = require('express');
const router = express.Router();
const {getAllSpecies, getSingleSpecie, addSingleSpecie} = require('../db/queries/speciesqueries.js')

router.get('/', getAllSpecies);
router.get('/:id', getSingleSpecie);
router.post('/', addSingleSpecie);



module.exports = router;
