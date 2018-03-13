const mongoose = require('mongoose');
const {component} = require('../utils/database');

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    age: {
        type: Number
    }
});

user.plugin(component);

module.exports = mongoose.model('User', user);