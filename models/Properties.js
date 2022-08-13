const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    address: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    profit: {
        type: Number,
        default: 0.00
    },
    devices: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Property", PropertySchema);
