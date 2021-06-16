const generateUserList = function (users){
    return users.map(e=>({fullName:e.firstName+" "+e.lastName, adult:e.age>17}))}

const getUserNames = function (users){
    return users.map(e=>(`${e.firstName} ${e.lastName}`)).join(', ')}

module.exports = Object.freeze({
    generateUserList: generateUserList,
    getUserNames: getUserNames})

const userArray=[{firstname:"John", lastname:"Doe", age:30}, {firstname:"Jane", lastname:"Doe", age:15}]

