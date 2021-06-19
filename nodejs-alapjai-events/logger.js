const eventEmitter = require('events')

// létrehozok egy új osztályt az eventEmitter kiterjesztésével
class Logger extends eventEmitter{
    error(par){console.log('\x1b[31m', par)}    // piros
    success(par){console.log('\x1b[32m', par)}} // zöld

// példányosítom a Loggert, mint eseményfigyelőt
const esemenyFigyelo = new Logger()

// importálom a szükséges modulokat
const { createReadStream, createWriteStream } = require ('fs')
const { Transform } = require('stream')

// a transzformációhoz az alábbi fájlt fogjuk használni:
const filePath='nodejs-alapjai-events/lorem.txt'

// létrehozom a stream olvasáshoz - transzformációhoz - íráshoz szükséges metódusokat
const streamolvasas = createReadStream(filePath, {encoding:'utf8', highWaterMark:1024})
const upperCase = new Transform({transform(chunk, encoding, callback){
    this.push(chunk.toString().split(' ').map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(' ')); callback()}})
const streamiras = createWriteStream(`${filePath}.bak`)

// meghívom a stream.on metódusait
streamolvasas.on("error", e=>esemenyFigyelo.error(e))
upperCase.on("error", e=>esemenyFigyelo.error(e))
streamiras.on("error", e=>esemenyFigyelo.error(e))
streamolvasas.on("end", e=>esemenyFigyelo.success('File transform successful.'))

// végrehajtom a fenti utasításokat
streamolvasas.pipe(upperCase).pipe(streamiras)