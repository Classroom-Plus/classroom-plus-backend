const db = require('../models');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const secretKey = process.env.JWT_ENCRYPT_KEY;

const authenticate = (req, res, next) => {
    const bearerHeader = req.header("Authorization");
    if (bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, secretKey, (err, decoded) => {
            if (err) {
                res.sendStatus(401);
            } else {
                req.authData = decoded;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
};

module.exports = authenticate;
