const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Using promises instead of callback functions
mongoose.connect('mongodb://localhost:27017/todo-app');

module.exports = { mongoose };