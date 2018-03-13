const mongoose = require('mongoose');
const env = require('dotenv').config();

module.exports.connect = () => {
    return new Promise((resolve, reject) => {
        const url = process.env.MONGODB_URI || 'mongodb://localhost/test';
        const connection = mongoose.connection;

        connection.on('error', (err) => {
            reject(err);
        });

        connection.once('open', () => {
            console.log('Mongoose default connection open to ' + url);
            resolve();
        });

        connection.on('disconnect', () => {
            console.log('Mongoose default connection disconnected');
        });

        process.on('SIGINT', () => {
            connection.close(() => {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });

        mongoose.connect(url);
    });
};

module.exports.component = (schema) => {
    schema.add({
        created: {
            type: Date,
            default: new Date()
        },
        updated: {
            type: Date,
            default: new Date()
        }
    });

    schema.pre('save', function (next) {
        if (!this.created) this.created = new Date();
        this.updated = new Date();
        next();
    });

    schema.pre('update', function() {
        this.update({},{ $set: { updated: new Date() } });
    });

    if (!schema.options.toObject) schema.options.toObject = {};
    if (!schema.options.toJSON) schema.options.toJSON = {};

    let transform = (doc, ret, options) => {
        ret.id = ret._id.toString()

        delete ret._id;
        delete ret.__v;

        return ret;
    };

    schema.options.toObject.transform = transform;
    schema.options.toJSON.transform = transform;
};