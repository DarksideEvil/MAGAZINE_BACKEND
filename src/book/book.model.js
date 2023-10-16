const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    desc: {
        type: String,
        minlength: 2,
        required: true
    },
    rating: {
        type: Number,
        default: null
    },
    category: {
        type: String,
        default: 'book'
    },
    count: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

const bookModel = mongoose.model('book', bookSchema);
module.exports = bookModel;