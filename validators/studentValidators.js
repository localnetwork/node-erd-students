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

    isParentExists: (parent_id, callback) => {
        const query = 'SELECT id from parents WHERE id = ? limit 1';

        connection.query(query, [parent_id], (error, results) => {
            if(error) {
                return callback(error, null); 
            }

            return callback(null, results.length)
        });

    },

    // hasParent: (student_id, callback) => {
    //     console.log(student_id); 
    //     const query = 'SELECT student_id from parent_student_relations WHERE student_id = ?'; 
    //     // console.log(query); 
    //     console.log(callback);  
    //     connection.query(query, [student_id], (error, results)=> {
    //         if(error) {
    //             return callback(error, null);
    //         }

    //         // return callback(null, results.length > 0); 
    //     });
    // }
}

module.exports = studentValidator; 