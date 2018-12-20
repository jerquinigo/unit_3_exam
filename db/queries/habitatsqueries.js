const express = require('express');
const router = express.Router();
const {db} = require('./index.js');

const getAllHabitats = (req,res,next) => {
  db.any('SELECT * FROM habitats').then(habitats => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got all habitats',
      data: habitats
    })
  })
  .catch(err => {
    return next(err);
  })
}

const getSingleHabitat = (req,res,next) => {
  let habitatId = parseInt(req.params.id);
  db.one('SELECT * FROM habitats WHERE id=$1', habitatId).then(habitats => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got Single Habitat',
      data: habitats
    })
  })
  .catch(err => {
    return next(err);
  })
}

const addSingleHabitat = (req,res,next) => {
  db.result('INSERT INTO habitats(category) VALUES (${category})' ,req.body).then(habitats => {
    res.status(200)
    .json({
      status: 'success',
      message: 'added single habitat',
      data: habitats
    })
  })
  .catch(err => {
    return next(err)
  })
}


module.exports = {
getAllHabitats, getSingleHabitat, addSingleHabitat
}
