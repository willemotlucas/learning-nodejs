const { ObjectID } = require('mongodb');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');
const jwt = require('jsonwebtoken');

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo',
	completed: true,
	completedAt: 333
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: false,
	completedAt: null
}];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
	_id: userOneId,
	email: 'willemotlucas@example.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
	}]
}, {
	_id: userTwoId,
	email: 'jen@example.com',
	password: 'userTwoPass'
}]

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
};

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		// Wait for all promises (userOne, userTwo) to be completed
		return Promise.all([userOne, userTwo]);
	}).then(() => done());
}

module.exports = { todos, users, populateTodos, populateUsers };