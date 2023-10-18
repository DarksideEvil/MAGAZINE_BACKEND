const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 50,
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
    type: {
        type: String,
        minlength: 2,
        lowercase: true,
        trim: true
    },
    rating: {
        type: Number,
        default: null
    },
    category: {
        type: String,
        default: 'food',
        lowercase: true,
        trim: true
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

foodSchema.index({title: "text"});

const foodModel = mongoose.model('food', foodSchema);
// foodModel.createIndexes();

module.exports = foodModel;