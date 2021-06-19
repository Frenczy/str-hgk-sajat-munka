const functions = require('./utils')

const users=[{firstName:"John", lastName:"Doe", age:30},{firstName:"Jane", lastName:"Doe", age:15}]

console.log(functions.generateUserList(users))
console.log(functions.getUserNames(users))