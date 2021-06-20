const yargs = require('yargs')
const { id, producer, title } = require('./options')
// beimportáljuk a factory-t
const MoviesApi = require('./movies-api')
// beimportáljuk a services-t
const MoviesService = require('./services')
// majd példányosítjuk (az adatbázis 'movies' részét parse-oljuk)
const moviesApi = MoviesApi('./movies.json', 'movies')
// ilyen volt korábban
// const { getAllMovies, findMovieById, createMovie, editMovie, removeMovie } = require('./services')
// ilyen lett (require helyett a factory-t használom)
const { getAllMovies, findMovieById, createMovie, editMovie, removeMovie } = MoviesService(moviesApi)

yargs
    .version('1.0.0')
    .usage('Usage: <command> [options]')
    // ugyanez objektum formában
    .command({command:'get', describe:'Get all movies', handler: async function(){console.log(await getAllMovies())}})
    // find parancs
    .command({command:'find', describe:'Find a movie by ID',
    builder:{id},
    handler: async function({id}){
        console.log(await findMovieById(id))}})
    // create parancs - ehhez már kell builder és handler is
    .command({command:'create', describe:'Create new movie', 
    builder: {producer, title},
    handler: async function({producer, title}){
        console.log(await createMovie(producer, title))}})
    // edit parancs - ugyanaz, mint a create, de ehhez már kell ID is
    .command({command:'edit', describe:'Edit an existing movie', 
    builder: {id, producer, title},
    handler: async function({id, producer, title}){
        console.log(await editMovie(id, producer, title))}})
    // törlés parancs ID alapján
    .command({command:'remove', describe:'Remove an existing movie',
    builder: {id},
    // filter metódussal kitörlöm az adott ID-jű filmet
    handler: async function({id}){
        await removeMovie(id); console.log('Movie deleted')}})
    .locale('en')
    .strict()
    .help()
    .parse()    // use "args" instead of "process.argv"