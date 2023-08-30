const connection = require('../config/db');

const uuid = require('uuid');


const parentModel = {
    getParents: (callback) => {
        console.log(callback); 
    }
}


module.exports = parentModel; 