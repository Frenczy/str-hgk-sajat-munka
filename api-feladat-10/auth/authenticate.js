const jwt = require('jsonwebtoken')

module.exports = function(request, response, next){
    const authHeader = request.headers.authorization

    if (authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user)=>{
            if(error){
                return response.sendStatus(403)
            }
            request.user = user
            next()
        })
    } else {
        response.sendStatus(401)
    }
}