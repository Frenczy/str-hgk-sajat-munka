// aszinkron verzió
const { readFile, writeFile } = require('fs').promises

// factory object
const MoviesApi = function(path, property){ return {
    async get () {
        const adatString = await readFile(path)
        // a datastring az egész JSON file, a property a "movies" része
        const adat = JSON.parse(adatString)[property]
        return adat
    },
    async save (adat) {
        await writeFile(path, JSON.stringify({[property]:adat}))}}}

module.exports = MoviesApi