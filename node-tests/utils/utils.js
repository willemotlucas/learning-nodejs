module.exports.add = (a, b) => a + b;
module.exports.square = (x) => x * x;
module.exports.setName = (user, fullName) => {
	var names = fullName.split(' ');
	user.first_name = names[0];
	user.last_name = names[1];
	return user;
}