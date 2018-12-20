const express = require('express');
const router = express.Router();
const {db} = require('./index.js');


const getAllAnimals = (req,res,next) => {
  db.any('SELECT * FROM animals').then(animals => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got all animals',
      data: animals
    })
  })
  .catch(err => {
    return next(err);
  })
}

const getSingleAnimal = (req,res,next) => {
  let animalId = parseInt(req.params.id);
  db.one('SELECT * FROM animals WHERE id=$1', animalId).then(animals => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got single animal',
      data: animals
    })
  })
  .catch(err => {
    return next(err)
  })
}

const addNewAnimal = (req,res,next) => {
  req.body.species_id = parseInt(req.body.species_id)
  db.none('INSERT INTO animals(species_id,nickname) VALUES (${species_id},${nickname})', req.body)
  .then(animals => {
    res.status(200)
    .json({
      status: 'success',
      message: 'added new Animal',
      data: animals
    })
  })
  .catch(err => {
    return next(err);
  })
}

const patchSingleAnimal = (req,res,next) => {
  let patchId = parseInt(req.params.id);
  db.none('UPDATE animals SET species_id=${species_id}, nickname=${nickname} WHERE id=${patchId}', {
    species_id: parseInt(req.body.species_id),
    nickname: req.body.nickname,
    patchId: patchId
  }).then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'updated single animal',
    })
  })
  .catch(err => {
    return next(err);
  })
}

const deleteSingleAnimal = (req,res,next) => {
  let deleteId = parseInt(req.params.id);
  db.result('DELETE FROM animals WHERE id=$1', deleteId).then(animals => {
    res.status(200)
    .json({
      status: 'success',
      message: 'deleted single animal',
      data: animals
    })
  })
  .catch(err => {
    return next(err);
  })
}

module.exports = {
getAllAnimals, getSingleAnimal, addNewAnimal, patchSingleAnimal, deleteSingleAnimal

}
