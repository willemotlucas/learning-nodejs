const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

geocode.geocodeAddress(argv.address).then((location) => {
	console.log(location.address);
	return weather.fetchWeather(location.latitude, location.longitude);
}).then((weather) => {
	console.log(`It's ${weather.temperature}° but it feels like ${weather.apparentTemperature}°`);
}).catch((errorMessage) => {
	console.log(errorMessage);
});

