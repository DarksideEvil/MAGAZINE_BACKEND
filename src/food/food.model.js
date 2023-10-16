const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
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
    type: {
        type: String,
        minlength: 2
    },
    rating: {
        type: Number,
        default: null
    },
    category: {
        type: String,
        default: 'food'
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