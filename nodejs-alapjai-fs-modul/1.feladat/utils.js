const { mkdir, writeFile } = require('fs').promises

const createFoldersAndFiles = function (){
         mkdir('controllers')
        .then(function(){writeFile('./controllers/site.controller.js','')})
        .then(function(){mkdir('routers')})
        .then(function(){writeFile('./routers/site.router.js','')})
        .then(function(){mkdir('./views')})
        .then(function(){writeFile('./views/index.html','')})
        .then(function(){writeFile('./app.js','')})}

module.exports = {
    createFoldersAndFiles}