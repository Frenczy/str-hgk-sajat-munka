const http = require('http')
const router = require('./routers/router')
const port = 8080
const dataLogger = require('./data-logger/dataLogger')

http.createServer(function(request, response){
    dataLogger(request)
    router[request.url] ?
    router[request.url](response) :
    router['/404'](response)
})
.on('error', function(e){console.log(`Server error: ${e.message}`)})
.on('listening', function(){console.log(`Server is running at http://127.0.0.1:${port}!`)})
.listen(port)