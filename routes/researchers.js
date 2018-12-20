const express = require('express');
const router = express.Router();
const {getAllResearchers, getSingleResearcher, addResearcher, patchResearcher, deleteResearcher} = require('../db/queries/researchersqueries.js');

router.get('/',getAllResearchers);
router.get('/:id',getSingleResearcher);
router.post('/', addResearcher);
router.patch('/:id', patchResearcher);
router.delete('/:id', deleteResearcher);

module.exports = router;
