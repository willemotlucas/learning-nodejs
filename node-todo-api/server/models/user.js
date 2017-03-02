const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

// Define instance methods

UserSchema.methods.toJson = function() {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id, email']);
};

UserSchema.methods.generateAuthToken = function() {
	var user = this;

	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	
	user.tokens.push({access, token});
	return user.save().then((user) => {
		return token;
	});
};

// Create User model from user schema

var User = mongoose.model('User', UserSchema);

module.exports = { User };