const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    phone: {
        type: String,
        default: null,
        minlength: 11,
        maxlength: 14
    },
    silverPoint: {
        type: Number,
        default: 0
    },
    goldPoint: {
        type: Number,
        default: 0
    },
    expenses: {
        type: []
    },
    email: {
        type: String,
        minlength: 4,
        maxlength: 35,
        unique: true,
        required: true
    },
    role: {
        type: String,
        minlength: 3,
        maxlength: 20,
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024
    }
},{
    timestamps: true,
    versionKey: false
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;