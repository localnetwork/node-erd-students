const studentValidator = require('../validators/studentValidators'); 
const studentModel = require("../models/studentModel");

const studentController = {
  getAllStudents: (req, res) => {
    studentModel.getAllStudents((error, results) => {
      if (error) {
        console.log("error fetching students", error);
        return res.status(500).json({ error: "Internal server error" });
      } else {
        return res.status(200).json(results);
      }
    });
  },

  getStudentById: (req, res) => {
    const studentId = req.params.id;

    studentModel.getStudentById(studentId, (error, student) => {
      if (error) {
        console.error("Error fetching student:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      return res.status(200).json(student);
    });
  },

  createStudent: (req, res) => {
    // const id = req.query.id;
    const name = req.body.name;
    const age = req.body.age;
    const parent_id = req.body.parent_id;

    const studentData = {
      // id: id, 
      name: name,
      age: age,
    };


    
    studentValidator.isNameExists(name, (error, nameExists) => {
      if (error) {
        console.error("Error checking name existence:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (nameExists) {
        return res.status(400).json({ error: "Student already exist" });
      }

      if(!studentValidator.ageNotNull(age)) {
        return res.status(400).json({ error: 'Age should not be empty.' })
      }


      // if(!studentValidator.isNoParent(studentId, (error, noParent))) { 
      //   console.error('Error creating student that has no parent:', error);
      //   return res.status(500).json({ error: 'No parent has been associated.' })
      // } 


      studentValidator.isParentExists(parent_id, (error, parent) => {
        if(error) {
          console.log('errorrr'); 
        }
        
        if(parent){ 
          // return res.status(201).json({
          //   message: "Has Parent"
          // });
          console.log('has parent'); 
          studentModel.createStudentParentRelation(id, (error) => {
            
          });
        }else { 
          return res.status(500).json({ error: "Parent can't be found." });
        } 
      });
  
      studentModel.createStudent((error) => {

        if(error) {
          console.log('error type: ' + error.sqlState); 
          return res.status(500).json({response: error.sqlState, message: "Student cannot be created due to mysqlstate error: " + error.sqlState})
        }
        return res
            .status(201)
            .json({ response: 201, message: "Student created successfully. " });

      });
    });
  },
};

module.exports = studentController;
