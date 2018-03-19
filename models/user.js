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
        type: String
    },
    age: {
        type: Number
    },
    /*
    *
    */
    messenger_id: {
        type: String,
        unique: true
    }
});

user.plugin(component);

module.exports = mongoose.model('User', user);