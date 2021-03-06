const mongoose = require('mongoose')
// const User = require('./User')

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Message', messageSchema)