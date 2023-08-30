const connection = require('../config/db');
const uuid = require('uuid');



// function getAllStudents(callback) {
//     const query = 'SELECT * FROM students'; 
//     connection.query(query, (error, results) => {
//         if (error) {
//             console.log('Error executing query from getAllStudents: ', error);
//             callback(error, null);
//         } else {
//             callback(null, results);  
//         }
//     });
//     console.log('from getAllStudents Model'); 
// }   


const studentModel = {
    getAllStudents: (callback) => {
        const query = 'SELECT * FROM students';
        connection.query(query, (error, results) => {
            if (error) {
            console.log('Error executing query from getAllStudents: ', error);
            callback(error, null);
            } else {
            callback(null, results);
            }
        });
    },
    getStudentById: (studentId, callback) => {
        const query = 'SELECT * FROM students WHERE id = ?';
        connection.query(query, [studentId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, null);
        }

        return callback(null, results);
        });
    },

    createStudent: (studentData, callback) => {
        // console.log(uniqueId); 
        const uniqueId = uuid.v4(); 
        const query = `INSERT INTO students (name, age, uuid) VALUES ('${studentData.name}', '${studentData.age}', '${uniqueId}')`;

        connection.query(query, [studentData.name, studentData.age], (err, result) => {
            // connection.end(); // Close the connection
            if (err) {
                return callback(err);
            }
            const createdStudent = {
                id: result.insertId, // Inserted student ID
                name: studentData.name, // Inserted student name
                age: studentData.age,
                uuid: uniqueId
            };

            callback(null, result.insertId); // Success 
        });
    },

    createStudentParentRelation: (studentId, parentId, callback) => {
        const uniqueId = uuid.v4(); 

        const query = 'INSERT INTO student_parent_relations (uuid, student_id, parent_id) VALUES (?, ?, ?)';  
        
        connection.query(query, [studentId, parentId], (error, callback) => {
            if(error) {
                return callback(error); 
            }

            const createRelation = {
                id: result.insertId,
                uuid: uniqueId,
                student_id: studentId,
                parent_id: parentId,
            }

            callback(null, result.insertId); // Success create relation.
        });
    }
}; 

module.exports = studentModel; 