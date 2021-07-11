// NEM MŰKÖDIK !!

const { mkdir, writeFile, unlink } = require('fs').promises
const { createReadStream, createWriteStream } = require('fs')
const { join } = require('path')
const { createGzip } = require('zlib')

// Read the source file
const copyFile = createReadStream(join(__dirname, 'lorem.txt'), {encoding:'utf8', highWaterMark: 1024})

// Write content of the source file to target file
const writeBackup = createWriteStream(join(__dirname, 'lorem.txt.bak'), {encoding:'utf8', highWaterMark: 1024})

// Read content of target and compress it
const readTarget = createReadStream(join(__dirname, `lorem.txt.bak`), {encoding:'utf8', highWaterMark: 1024})

// Write content of compressed data to .zip file
const writeZip = createWriteStream(join(__dirname, 'lorem.txt.bak.gz'), {encoding:'utf8', highWaterMark: 1024})

// Triggering the entire method
copyFile.pipe(writeBackup);
writeBackup.on('finish', ()=>{
    readTarget.pipe(createGzip()).pipe(writeZip)})

// Deleting source files
writeZip.on('finish', ()=>{
    unlink(join(__dirname, 'lorem.txt'));
    unlink(join(__dirname, 'lorem.txt.bak'))})

/* const zipFile = function (filePath) {
    createReadStream(`${filePath}.bak`, {encoding:'utf8', highWaterMark: 1024}).pipe(createGzip()).pipe(createWriteStream(`${filePath}.bak.gz`))}
const deleteFile = function (filePath){unlink(filePath, error=>{if(error) throw (error)}); unlink(`${filePath}.bak`, error=>{if(error) throw (error)})}



module.exports= {
copyFile,
deleteFile,
zipFile} */