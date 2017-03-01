const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
		_id: new ObjectID(),
		text: 'First test todo',
	}, {
		_id: new ObjectID(),
		text: 'Second test todo'
	}
];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

describe('POST /todos', () => {

	it('should create a new todo', (done) => {
		var text = 'Test todo text';
		var _id = null;

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
				_id = res.body._id;
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				Todo.find({_id}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((err) => done(err));
			});
	});

	it('should not create a new todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((err) => done(err));
			});
	});

});

describe('GET /todos', () => {

	it('should return all todos', (done) => {
		request(app)
			.get('/todos')
			.send()
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});

});

describe('GET /todos/:id', () => {

	it('should return the unique todo', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return 404 error for invalid id', (done) => {
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done);
	});

	it('should return 404 error if no todo found', (done) => {
		var id = new ObjectID().toHexString();

		request(app)
			.get(`/todos/${id}`)
			.expect(404)
			.end(done);
	});

});