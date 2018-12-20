const express = require('express');
const router = express.Router();
const {getAllHabitats, getSingleHabitat, addSingleHabitat} = require('../db/queries/habitatsqueries.js');

router.get('/', getAllHabitats);
router.get('/:id', getSingleHabitat);
router.post('/', addSingleHabitat);

module.exports = router;
