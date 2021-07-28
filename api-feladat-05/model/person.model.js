const mongoose = require('mongoose')

const PersonSchema = mongoose.Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    vaccine: String
}, {timeStamps: true})

module.exports = mongoose.model('Person', PersonSchema)