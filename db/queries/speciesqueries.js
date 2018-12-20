const express = require('express');
const router = express.Router();
const {db} = require('./index.js');

const getAllSpecies = (req,res,next) => {
  db.any('SELECT * FROM species').then(species => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got all the species',
      data: species
    })
  })
  .catch(err => {
    return next(err);
  })
}

const getSingleSpecie = (req,res,next) => {
  let singleSpecie = parseInt(req.params.id);
  db.one('SELECT * FROM species WHERE id=$1', singleSpecie).then(species => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got single specie',
      data: species
    })
  })
  .catch(err => {
    return next(err)
  })
}

const addSingleSpecie = (req,res,next) => {
  db.none('INSERT INTO species(name,is_mammal) VALUES (${name},${is_mammal})', req.body).then(species => {
    res.status(200)
    .json({
      status: 'success',
      message: 'added single Specie',
      data: species
    })
  })
  .catch(err => {
    return next(err);
  })
}

module.exports = {
  getAllSpecies, getSingleSpecie, addSingleSpecie
}
