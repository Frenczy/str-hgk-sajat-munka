const mongoose = require('mongoose')

const PersonSchema = mongoose.Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    vaccine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vaccine'
    },
}, {timeStamps: true})

module.exports = mongoose.model('Person', PersonSchema)