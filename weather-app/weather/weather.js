const request = require('request');

var Weather = {
	fetchWeather: (latitude, longitude) => {
		return new Promise((resolve, reject) => {
			request({
				url: `https://api.darksky.net/forecast/599b21b9ab89ac4bd6921e8f640f7e63/${latitude},${longitude}`,
				json: true
			}, (error, response, body) => {
				if(!error && response.statusCode === 200){
					resolve({
						temperature: body.currently.temperature,
						apparentTemperature: body.currently.apparentTemperature

					});
				} else {
					reject('Unable to fetch weather');
				}
			});
		});
	}
}

module.exports = Weather;

