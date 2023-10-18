const mongoose = require('mongoose');

const dressSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 30,
        trim: true,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    desc: {
        type: String,
        minlength: 2,
        trim: true,
        required: true
    },
    rating: {
        type: Number,
        default: null
    },
    type: {
        type: String,
        minlength: 2,
        trim: true,
        lowercase: true
    },
    category: {
        type: String,
        lowercase: true,
        trim: true,
        default: 'dress'
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

dressSchema.index({title: "text"});

const dressModel = mongoose.model('dress', dressSchema);
// dressModel.createIndexes();

module.exports = dressModel;