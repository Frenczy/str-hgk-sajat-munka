const fsp = require('fs').promises;
const { join } = require('path');

const read = async () => {
    const jsonContent = await fsp.readFile(
        join('database', 'person.json'),
        'utf8');    
        return JSON.parse(jsonContent)};

const write = async (newPerson) => {
    const jsonContent = await read()
    jsonContent.push(newPerson)
    await fsp.writeFile(join('database','person.json'), JSON.stringify(jsonContent))
}

const update = async (people) => {
    await fsp.writeFile(join('database','person.json'), JSON.stringify(people))
}

module.exports = {
    read, write, update
};