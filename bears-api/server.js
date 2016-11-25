const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bear = require('./app/models/bear');

// Connection to database
mongoose.connect('mongodb://localhost:27017/test-bears');

const app = express();

// Configure bodyparser to be able to read data from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Configure port of the application
const port = process.env.PORT || 8080;


// ========= ROUTES FOR OUR API =========
var router = express.Router();

// MIDDLEWARE to use for all request
// We can check if the user is authenticated before executing the request
router.use((req, res, next) => {
	console.log('Something is happening!');
	next();
});

router.get('/', (req, res) => {
	res.json({message: "Youpi, l'api fonctionne !"});
});

// More routes will happen here

router.route('/bears')

	.post((req, res) => {
		var bear = new Bear();
		bear.name = req.body.name;

		bear.save(err => {
			if(err)
				res.send(err);

			res.json({message: 'Bear was created!'});
		});
	})

	.get((req, res) => {
		Bear.find((err, bears) => {
			if(err)
				res.send(err);

			res.json(bears);
		});
	});

router.route('/bears/:bear_id')

	.get((req, res) => {
		Bear.findById(req.params.bear_id, (err, bear) => {
			if(err)
				res.send(err);

			res.json(bear);
		});
	})

	.put((req, res) => {
		Bear.findById(req.params.bear_id, (err, bear) => {
			if(err)
				res.send(err);

			bear.name = req.body.name;

			bear.save(err => {
				if(err)
					res.send(err);

				res.json({message: 'Bear updated!'});
			});
		});
	})

	.delete((req, res) => {
		Bear.remove({
			_id: req.params.bear_id
		}, (err, bear) => {
			if(err)
				res.send(err);

			res.json({message: 'Bear deleted!'});
		})
	});

// ========= REGISTER ROUTES =============

// All of our routes will be prefixed with /api
app.use('/api', router);

// ========= START THE SERVER ============
app.listen(port);
console.log('Our server is started on port ' + port);