const express = require('express');
const router = express.Router();
const {db} = require('./index.js');

const getAllTaggings = (req,res,next) => {
  db.any('SELECT * FROM taggings').then(taggings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got all taggings',
      data: taggings
    })
  })
  .catch(err => {
    return next(err);
  })
}


const getSingleTagging = (req,res,next) => {
  let tagId = parseInt(req.params.id);
  db.one('SELECT * FROM taggings WHERE id=$1', tagId).then(tagging => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got one tag',
      data: tagging
    })
  })
  .catch(err => {
    return next(err)
  })
}

const allTaggingsSpecificUser = (req,res,next) => {
  let researcherId = parseInt(req.params.id);
  db.any('SELECT * from taggings WHERE researcher_id=$1', researcherId).then(taggings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'got tag from specific user',
      data: taggings
    })
  })
  .catch(err => {
    return next(err);
  })
}

const getAllTaggingsFromSpecificAnimal = (req,res,next) => {
  let animalId = parseInt(req.params.id);
  db.any('SELECT * FROM taggings WHERE animal_id=$1', animalId).then(taggings => {
    res.status(200)
    .json({
      status: 'success',
      message: 'all tags from specific animal',
      data: taggings
    })
  })
  .catch(err => {
    return next(err);
  })
}

const addNewTagging = (req,res,next) => {
  db.result('INSERT INTO taggings(animal_id,researcher_id) VALUES (${animal_id}, ${researcher_id})', {
  animal_id: parseInt(req.body.animal_id),
  researcher_id: parseInt(req.body.researcher_id)
}).then(tagging => {
  res.status(200)
  .json({
    status: 'sucess',
    message: 'added new tagging',
    data: tagging
  })
})
.catch(err => {
  return next(err);
 })
}

module.exports = {
getAllTaggings, getSingleTagging, allTaggingsSpecificUser, getAllTaggingsFromSpecificAnimal, addNewTagging
}
