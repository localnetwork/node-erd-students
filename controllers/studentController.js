const studentModel = require('../models/studentModel');

const studentController = {
    getAllStudents: (req, res) => {
        studentModel.getAllStudents((error, results) => {
            if(error) {
                console.log('error fetching students', error);
                return res.status(500).json({ error: 'Internal server error' }); 
            }else {
                return res.status(200).json(results); 
            }
        });
    },

    getStudentById: (req, res) => {
        const studentId = req.params.id;

        studentModel.getStudentById(studentId, (error, student) => {
            if (error) {
                console.error('Error fetching student:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
    
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            return res.status(200).json(student);
        });
    },

    createStudent: (req, res) => {
        // const id = req.query.id; 
        const name = req.query.name;
        const age = req.query.age; 
        const studentData = {
            // id: id, 
            name: name,
            age: age,
        };   

        studentModel.createStudent(studentData, (createdStudent, error) => {
            console.log(studentData); 
            if (error) {
                console.error('Error creating student:', error); 
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.status(201).json({ response: '201', message: 'Student created successfully. ' });
        });
    }, 
}

module.exports = studentController; 