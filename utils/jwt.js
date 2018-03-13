const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const key = process.env.JWT_ENCRYPT_KEY;

const signToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, key, (err, token) => {
            !err ? resolve(token) : reject(err);
        });
    });
};

const verifyToken = (token) => {
    return new Promise((reject, resolve) => {
        jwt.verify(token, key, (err, decoded) => {
            !err ? resolve(decoded) : reject(err);
        });
    });
};

/*
const signToken = (payload, callback) => {
    jwt.sign(payload, key, callback);
};

const verifyToken = (token, callback) => {
    jwt.verify(token, key, callback);
};
*/

module.exports = {
    signToken,
    verifyToken,
};
