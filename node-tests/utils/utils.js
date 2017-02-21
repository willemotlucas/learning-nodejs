module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
	setTimeout(() => {
		callback(a + b);
	}, 100);
}

module.exports.square = (x) => x * x;

module.exports.asyncSquare = (x, callback) => {
	setTimeout(() => {
		callback(x * x);
	}, 100)
}

module.exports.setName = (user, fullName) => {
	var names = fullName.split(' ');
	user.first_name = names[0];
	user.last_name = names[1];
	return user;
}

