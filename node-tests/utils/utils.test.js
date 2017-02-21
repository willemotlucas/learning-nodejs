const utils = require('./utils');
const expect = require('expect');

it('should add two numbers', () => {
	var result = utils.add(33, 11);

	expect(result).toBe(44).toBeA('number');
});

it('should square a number', () => {
	var result = utils.square(3);

	expect(result).toBe(9).toBeA('number');
});

it('should expect some values', () => {
	// expect(12).toNotBe(11);
	// expect({name: 'Lucas'}).toEqual({name: 'Lucas'});
	// expect([2, 3, 4]).toExclude(5);
	// expect({
	// 	name: 'Lucas',
	// 	age: 22,
	// 	location: 'Blois'
	// }).toInclude({
	// 	age: 22
	// });
});

it('should split full name of a user', () => {
	var user = utils.setName({
		age: 22,
		location: 'Blois, France'
	}, 'Lucas Willemot');

	expect(user).toBeA('object').toInclude({first_name: 'Lucas', last_name: 'Willemot'});
});