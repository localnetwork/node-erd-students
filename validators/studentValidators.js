const connection = require('../config/db');

const studentModel = require('../models/studentModel'); 

const studentValidator = {
    isNameExists: (name, callback) => {
        const query = 'SELECT id FROM students WHERE name = ?';
        connection.query(query, [name], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results.length > 0);
        });
    }, 

    ageNotNull: (age) => {
        return age !== null;
    },
}

module.exports = studentValidator; 