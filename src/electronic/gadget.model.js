const mongoose = require('mongoose');

const electronicSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 50,
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
    type: {
        type: String,
        minlength: 2,
    },
    guarantee: {
        type: [
            {
                date: { type: Date, default: Date.now },
                term: { type: Date, default: null }
            }
        ]
    },
    service: {
        type: Boolean,
        default: null
    },
    category: {
        type: String,
        default: 'tech'
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

electronicSchema.index({title: "text"});

const electronicModel = mongoose.model('electronic', electronicSchema);
// electronicModel.createIndexes();

module.exports = electronicModel;