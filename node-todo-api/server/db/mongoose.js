const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Using promises instead of callback functions
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };