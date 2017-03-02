const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

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

describe('DELETE /todos/:id', () => {

	it('should remove the todo', (done) => {
		const hexId = todos[0]._id.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) => {
				if(err)
					return done(err);

				Todo.findById(hexId).then((todo) => {
					expect(todo).toNotExist();
					done();
				}).catch((err) => done(err));
			});
	});

	it('should return 404 error for todo not found', (done) => {
		var id = new ObjectID().toHexString();

		request(app)
			.delete(`/todos/${id}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 error for invalid ID', (done) => {
		request(app)
			.delete('/todos/134')
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id', () => {

	it('should update the todo', (done) => {
		const hexId = todos[1]._id.toHexString();
		todos[1].completed = true;
		todos[1].text = 'An updated text from test';

		request(app)
			.patch(`/todos/${hexId}`)
			.send(todos[1])
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe('An updated text from test');
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toExist();
			})
			.end((err, res) => {
				if(err){
					return done(err);
				}

				Todo.findById(hexId).then((todo) => {
					expect(todo.text).toBe('An updated text from test');
					expect(todo.completed).toBe(true);
					expect(todo.completedAt).toExist();
					done();
				}).catch((err) => done(err));
			});
	});

	it('should clear completedAt when to do is not completed', (done) => {
		const hexId = todos[0]._id.toHexString();
		todos[0].completed = false;

		request(app)
			.patch(`/todos/${hexId}`)
			.send(todos[0])
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toNotExist();
			})
			.end((err, res) => {
				if(err){
					return done(err);
				}

				Todo.findById(hexId).then((todo) => {
					expect(todo.completed).toBe(false);
					expect(todo.completedAt).toNotExist();
					done();
				}).catch((err) => done(err));
			})
	});

	it('should not update the todo for to do not found', (done) => {
		const hexId = new ObjectID().toHexString();
		todos[1].completed = true;

		request(app)
			.patch(`/todos/${hexId}`)
			.send(todos[1])
			.expect(404)
			.end(done);
	});

	it('should not update the todo for invalid ID', (done) => {
		todos[1].completed = true;

		request(app)
			.patch('/todos/123')
			.send(todos[1])
			.expect(404)
			.end(done);
	});
});