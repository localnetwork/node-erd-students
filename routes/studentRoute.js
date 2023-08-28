const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');


// GET /students/ - Get all students.
router.get('/', studentController.getAllStudents);


// GET /students/:id - Get a student by ID. 
router.get('/:id', studentController.getStudentById); 

// POST /students
router.post('/', studentController.createStudent); 

module.exports = router;