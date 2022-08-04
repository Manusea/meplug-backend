const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    brand: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    generation: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    modification_engine: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    specs: {
        type: Object,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Car', CarSchema)