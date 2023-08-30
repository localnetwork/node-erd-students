const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.NODE_PORT || 3005;



// ADDED BODY PARSER TO GET THE BODY VALUES FROM REQUEST.

app.use(bodyParser.json()); // Parse JSON data 
app.use(bodyParser.urlencoded({ extended: true })); 

// Load routes
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