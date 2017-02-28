const User = require('../models/user');

var UserService = {
	save: (user_param) => {
		var user = new User();
		user.first_name = user_param.first_name;
		user.last_name = user_param.last_name;
		user.birthday = user_param.birthday;
		user.location = user_param.location;
		user.email = user_param.email;
		user.password = user_param.password;
		user.gender = user_param.gender;
		user.biography = user_param.biography;
		user.createdAt = new Date();

		user.save((err) => {
			var returnObject = {
				code: 0,
				label: 'User successfully created'
			};

			if(err){
				returnObject.code = 99;
				returnObject.label = 'An error occured while saving the user';
			}

			return returnObject;
		});
	},

	all: () => {
		User.find((err, users) => {
			var returnObject = {
				code: 0,
				label: 'Users successfully retrieved'
			}

			if(err){
				returnObject.code = 99;
				returnObject.label = 'Can not retrieve users.';
			} else {
				returnObject.users = users;
			}
		});
	},

	delete: (id) => {

	}
}

module.exports = UserService;