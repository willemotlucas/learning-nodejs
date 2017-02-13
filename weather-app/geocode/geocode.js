const request = require('request');

var Geocode = {
	geocodeAddress: (address) => {
		return new Promise((resolve, reject) => {
			const encodedAddress = encodeURIComponent(address);

			request({
				url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
				json: true
			}, (error, response, body) => {
				if(error){
					reject('Unable to connect to Google servers');
				} else if(body.status === 'ZERO_RESULTS') {
					reject('Unable to find this address');
				} else if(body.status === 'OK') {
					resolve({
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitude: body.results[0].geometry.location.lng
					});
				}
			});
		});
	}
}

module.exports = Geocode;