const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import models
const UserService = require('./app/services/UserService');

// Connect to database
mongoose.connect('mongodb://localhost:27017/couchutc');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

var router = express.Router();

router.use((req, res, next) => {
	console.log('Something is happening!');
	next();
});

router.route('/users')
	
	.post((req, res) => {
		console.log('/users POST request received');
		
		UserService.save({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			birthday: req.body.birthday,
			location: req.body.location,
			email: req.body.email,
			password: req.body.password,
			gender: req.body.gender,
			biography: req.body.biography
		}).then((ret) => {
			console.log('ret:', ret);
			res.json(ret);
		});
	})

	.get((req, res) => {
		console.log('/users GET request received');
		console.log(UserService);

		const ret = UserService.all();

		res.json(ret);
	});

router.route('/users/:id')

	.get((req, res) => {
		console.log('/users/:id GET request received');
	})
	
	.put((req, res) => {
		console.log('/users/:id PUT request received');
	})

	.delete((req, res) => {
		console.log('/users/:id DELETE request received');
	});

app.use('/api', router);

app.listen(PORT);

console.log('Server running on port', PORT);


