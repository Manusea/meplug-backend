const mongoose = require("mongoose");

const OutletSchema = new mongoose.Schema({
    device_id: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    usage: {
        type: Object,
        default: {}
    },
});

module.exports = mongoose.model("Outlet", OutletSchema);