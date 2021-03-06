const mongoose = require('mongoose')

const randomNames = ['Flabberer', 'Glooper', 'Plunckot', 'Milkman']

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        default: randomNames[0],
        unique: true
    }
})

module.exports = mongoose.model('User', userSchema)