const { createGzip } = require('zlib')
const { createReadStream, createWriteStream } = require('fs')
const { unlink } = require('fs').promises

const copyFile = function (filePath) {
    createReadStream(filePath, {encoding:'utf8', highWaterMark: 1024}).pipe(createWriteStream(`${filePath}.bak`))}
const zipFile = function (filePath) {
    createReadStream(`${filePath}.bak`, {encoding:'utf8', highWaterMark: 1024}).pipe(createGzip()).pipe(createWriteStream(`${filePath}.bak.gz`))}
const deleteFile = function (filePath){unlink(filePath, error=>{if(error) throw (error)}); unlink(`${filePath}.bak`, error=>{if(error) throw (error)})}

module.exports= {
copyFile,
deleteFile,
zipFile}