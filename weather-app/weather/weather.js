const request = require('request');

var Weather = {
	fetchWeather: (latitude, longitude, callback) => {
		request({
			url: `https://api.darksky.net/forecast/599b21b9ab89ac4bd6921e8f640f7e63/${latitude},${longitude}`,
			json: true
		}, (error, response, body) => {
			if(!error && response.statusCode === 200){
				callback(undefined, {
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature

				});
			} else {
				callback('Unable to fetch weather');
			}
		});
	}
}

module.exports = Weather;

