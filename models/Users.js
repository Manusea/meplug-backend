const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    username: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        require: true,
        max: 1024,
        min: 6,
        select: false
    },
    balance: {
        type: Number,
        default: 0.00
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        default: []
    }],
    date: {
        type: Date,
        default: Date.now
    },
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        default: []
    }],
    charging: {
        type: Object,
        default: {}
    }
})

module.exports = mongoose.model('User', UserSchema)