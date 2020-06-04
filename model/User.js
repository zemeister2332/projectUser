const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }

});

let User = module.exports = mongoose.model('User', userSchema);
