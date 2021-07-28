const jwt = require('jsonwebtoken')

const Users = [{
    username: 'admin',
    password: 'test',
    role: 'admin'
},{
    username: 'user',
    password: 'test',
    role: 'user'
}]

const refreshTokens = []

module.exports.login = function (request, response) {
    const {username, password } = request.body
    const user = Users.find(
        e=>e.username == username && e.password == password
    )
    if (user){
        const accessToken = jwt.sign({
          username: user.username,
          role: user.role  
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        })

        const refreshToken = jwt.sign({
            username:user.username,
            role:user.role
        }, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)

        response.json({
            accessToken, refreshToken
        })}
        else {
            response.send('Username or password is incorrect')}}
module.exports.refresh = function (request, response, next){
    const {token}=request.body
    if (!token){
        return response.sendStatus(401)
    }
    if (!refreshTokens.includes(token)){
        console.log(refreshTokens, token)
        return response.sendStatus(403)
    }
    jwt.verify(token, process.env.REFRESH, (error, user)=>{
        if (error){
            return response.sendStatus(403)
        }
        const accessToken = jwt.sign({
            username:user.username,
            role:user.role
        }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.TOKEN_EXPIRY
        })
        response.json({
            accessToken
        })
    })
}

module.exports.logout = function (request, response){
    const {token} = request.body
    if (!refreshTokens.includes(token)){
        response.sendStatus(403)
    }
    const tokenIndex = refreshTokens.indexOf(token)
    refreshTokens.splice(tokenIndex, 1)
    response.sendStatus(200)
}