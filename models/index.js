const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const data = {};

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        data[file.charAt(0).toUpperCase() + file.slice(1, -3)] = require(path.join(__dirname, file))
    });

console.log(data);

module.exports = data;
