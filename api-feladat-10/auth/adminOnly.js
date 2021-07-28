module.exports = function (request, response, next){
    if (request.user.role != "admin"){
        return response.sendStatus(401)
    }
    next()
}