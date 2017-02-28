const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	birthday: Date,
	gender: String,
	location: String,
	biography: String,
	hosting: Boolean,
	createdAt: Date,
	updatetAt: Date
});

module.exports = mongoose.model('User', UserSchema);