const express = require('express');
const router = express.Router();
const {db} = require('./index.js');

const getAllSightings = (req,res,next) => {
  db.any('SELECT * FROM sightings').then(sightings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got all sightings',
      data: sightings
    })
  })
  .catch(err => {
    return next(err)
  })
}

const getAllSightingsSpecificSpecies = (req,res,next) => {
  let speciesId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE species_id=$1', speciesId).then(sightings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got all sightings from a specific species',
      data: sightings
    })
  })
  .catch(err => {
    return next(err)
  })
}

const getSightingsFromSpecificResearcher = (req,res,next) => {
  let researcherId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE researcher_id=$1', researcherId).then(sightings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'sightings from specific researcher',
      data: sightings
    })
  })
  .catch(err => {
    return next(err)
  })
}

const getSightingsForSpecificHabitat = (req,res,next) => {
  let habitatId = parseInt(req.params.id);
  db.any('SELECT * FROM sightings WHERE habitat_id=$1', habitatId).then(sightings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got sightings for specific habitat',
      data: sightings
    })
  })
  .catch(err => {
    return next(err);
  })
}

const addNewSighting = (req,res,next) => {
  req.body.researcher_id = parseInt(req.body.researcher_id);
  req.body.species_id = parseInt(req.body.species_id);
  req.body.habitat_id = parseInt(req.body.habitat_id);
  db.none('INSERT INTO sightings(researcher_id,species_id,habitat_id) VALUES (${researcher_id}, ${species_id}, ${habitat_id})', req.body).then(sightings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'added new sighting',
      data: sightings
    })
  })
  .catch(err => {
    return next(err)
  })
}

const deleteSingleSighting = (req,res,next) => {
  let sightingId = parseInt(req.params.id);
  db.result('DELETE FROM sightings WHERE id=$1', sightingId).then(sightings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'deleted single sighting',
      data: sightings
    })
  })
  .catch(err => {
    return next(err)
  })
}

module.exports = {
getAllSightings, getAllSightingsSpecificSpecies, getSightingsFromSpecificResearcher, getSightingsForSpecificHabitat, addNewSighting, deleteSingleSighting
}
