const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    specs: {
        type: Object,
        required: true,
    },
})

module.exports = mongoose.model('Car', CarSchema)