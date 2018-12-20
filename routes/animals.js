const express = require('express');
const router = express.Router();
const {getAllAnimals, getSingleAnimal, addNewAnimal, patchSingleAnimal, deleteSingleAnimal} = require('../db/queries/animalsqueries.js');

router.get('/', getAllAnimals);
router.get('/:id', getSingleAnimal);
router.post('/', addNewAnimal);
router.patch('/:id', patchSingleAnimal);
router.delete('/:id', deleteSingleAnimal);


module.exports = router;
