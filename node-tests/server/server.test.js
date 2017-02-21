const request = require('supertest');
var app = require('./server').app;
const expect = require('expect');


it('should return hello world response', (done) => {
	request(app)
		.get('/')
		.expect(404)
		.expect((res) => {
			expect(res.body).toInclude({
				error: 'Page not found'
			});
		})
		.end(done);
});

it('should return an array of users', (done) => {
	request(app)
		.get('/users')
		.expect(200)
		.expect((res) => {
			expect(res.body)
				.toBeA('array')
				.toInclude({name: 'Marie Daguin', age: 22, location: 'Paris, France'})
				.toInclude({name: 'Lucas Willemot', age: 22, location: 'Blois, France'});
		})
		.end(done);
});