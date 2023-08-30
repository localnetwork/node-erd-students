const express = require('express');
const router = express.Router();


// GET /parents/ - Get all parents.
router.get('/', studentController.getAllParents);


// // GET /parents/:id - Get a student by ID. 
// router.get('/:id', studentController.getParentById); 

// // POST /parents
// router.post('/', studentController.createParent); 

// module.exports = router;