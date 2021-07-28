const mongoose = require('mongoose')

const VaccineSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    efficiency: {
        type: Number,
        min: 1,
        max: 100}}, 
    {timestamps:false})

module.exports = mongoose.model('Vaccine', VaccineSchema)