const express = require('express');
const router = express.Router();
const {db} = require('./index.js');

const getAllResearchers = (req,res,next) => {
  db.any('SELECT * FROM researchers').then(researchers => {
    res.status(200)
    .json({
      status: 'success',
      message: 'all Researchers',
      data: researchers
    })
  })
  .catch(err => {
    return next(err);
  })
}

const getSingleResearcher = (req,res,next) => {
  let researcherId = parseInt(req.params.id);
  db.one('SELECT * FROM researchers WHERE id=$1', researcherId).then(researcher => {
    res.status(200)
    .json({
      status: 'success',
      message: 'single Researcher',
      data: researcher
    })
  })
  .catch(err => {
    return next(err)
  })
}

const addResearcher = (req,res,next) => {
  db.result('INSERT INTO researchers(name,job_title) VALUES (${name}, ${job_title})', req.body).then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'added A Researcher'
    })
  })
  .catch(err => {
    return next(err);
  })
}

const patchResearcher = (req,res,next) => {
  let patchId = parseInt(req.params.id);
  db.none('UPDATE researchers SET name=${name}, job_title=${job_title} WHERE id=${patchId}', {
    name: req.body.name,
    job_title: req.body.job_title,
    patchId: patchId
  }).then(() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'updated a user'
    })
  })
  .catch(err => {
    return next(err);
  })
}

const deleteResearcher = (req,res,next) => {
  let deleteId = parseInt(req.params.id);
  db.result('DELETE FROM researchers WHERE id=$1', deleteId).then(researcher => {
    res.status(200)
    .json({
      status: 'success',
      message: 'deleted Researcher',
      data: researcher
    })
  })
  .catch(err => {
    return next(err);
  })
}

module.exports = {
getAllResearchers, getSingleResearcher, addResearcher, patchResearcher, deleteResearcher
}
