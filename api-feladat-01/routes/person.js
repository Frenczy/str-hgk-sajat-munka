const express = require('express');
const router = express.Router();
const personService = require('../service/person.service');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const people = await personService.read()   
  res.json(people)});

  /* GET person count */
router.get('/count', async function(req, res, next) {
    const people = await personService.read()
    const output = people.filter(e=>e.vaccine != 'none').length
  res.json(`Number of vaccinated people: ${output}`)});

  router.get('/vaccinated', async function(req, res, next) {
    const people = await personService.read()
    const output = people.filter(e=>e.vaccine != 'none')
  res.json(output)});

module.exports = router;