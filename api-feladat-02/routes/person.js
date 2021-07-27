const express = require('express');
const router = express.Router();
const personService = require('../service/person.service');
const createError = require("http-errors")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const people = await personService.read()
    res.json(people)
});

/* Returns one User. */
router.get('/:id', async function (request, response, next) {
    const id = parseInt(request.params.id)
    const people = await personService.read()
    const person = people.find(p => p.id == id)
    response.json(person)
});

/* Returns one user / vaccinated */
router.get('/:id/vaccinated', async function (request, response, next) {
    const id = request.params.id
    const people = await personService.read()
    const person = people.find(p => p.id == id)
    response.json(person.vaccine != 'none' ? true : false)});

/* Modifies one user (vaccine = vaccine) */
router.put('/:id/:vaccine', async function (request, response, next) {
    const id = request.params.id
    const people = await personService.read()    
    const index = people.findIndex(e=>e.id==id)
    people[index].vaccine="vaccine"
    await personService.update(people)
    response.json(people[index])});

/* Deletes all users where vaccine = vaccine */
router.delete('/:vaccine', async function (request, response, next) {
    const people = await personService.read()    
    const filteredPeople = people.filter(e=>e.vaccine!='vaccine')
    await personService.update(filteredPeople)
    response.json(filteredPeople)});

/* Records one user */
router.post('/', async function (request, response, next) {
    const newPerson = request.body
    if(!newPerson.firstName | !newPerson.lastName | !newPerson.vaccine)
        return next(new createError.BadRequest('Missing information'))
    const people = await personService.read()
    newPerson.id = people[people.length-1].id+1 
    await personService.write(newPerson)
    response.status(201)
    response.json(newPerson)
});


/* GET person count */
router.get('/count', async function (req, res, next) {
    const people = await personService.read()
    const output = people.filter(e => e.vaccine != 'none').length
    res.json(`Number of vaccinated people: ${output}`)
});

/* List of vaccinated people */
router.get('/vaccinated', async function (req, res, next) {
    const people = await personService.read()
    const output = people.filter(e => e.vaccine != 'none')
    res.json(output)
});

module.exports = router;