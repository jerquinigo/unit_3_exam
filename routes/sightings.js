const express = require('express');
const router = express.Router();
const {getAllSightings, getAllSightingsSpecificSpecies, getSightingsFromSpecificResearcher, getSightingsForSpecificHabitat, addNewSighting,
deleteSingleSighting} = require('../db/queries/sightingsqueries.js');

router.get('/',getAllSightings);
router.get('/species/:id', getAllSightingsSpecificSpecies);
router.get('/researchers/:id', getSightingsFromSpecificResearcher);
router.get('/habitats/:id', getSightingsForSpecificHabitat)
router.post('/', addNewSighting);
router.delete('/:id', deleteSingleSighting)





module.exports = router;
