const express = require('express');
const router = express.Router();
const {getAllTaggings, getSingleTagging, allTaggingsSpecificUser, getAllTaggingsFromSpecificAnimal, addNewTagging} = require('../db/queries/taggingsqueries.js');

router.get('/', getAllTaggings);
router.get('/:id', getSingleTagging);
router.get('/researchers/:id', allTaggingsSpecificUser)
router.get('/animals/:id', getAllTaggingsFromSpecificAnimal);
router.post('/', addNewTagging)

module.exports = router;
