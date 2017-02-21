const express = require('express');

var app = express();

app.get('/', (req, res) => {
	res.status(404).send({
		error: 'Page not found',
		name: 'Todo Application'
	});
});

app.get('/users', (req, res) => {
	res.send([
		{
			name: 'Lucas Willemot',
			age: 22,
			location: 'Blois, France'
		},
		{
			name: 'Marie Daguin',
			age: 22,
			location: 'Paris, France'
		}
	]);
});

app.listen(3000);

module.exports.app = app;