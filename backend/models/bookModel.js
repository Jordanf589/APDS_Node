const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
}, {timestamp : true})

module.exports = mongoose.model('Book', bookSchema)