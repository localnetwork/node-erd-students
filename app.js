const express = require('express');
const app = express();

const PORT = process.env.NODE_PORT || 3001;

// // Load routes
const studentRoute = require('./routes/studentRoute');


// Load other routes
app.use('/students', studentRoute);


// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!'); 
});

// Use other routes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});