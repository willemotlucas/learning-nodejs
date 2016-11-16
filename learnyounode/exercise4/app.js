const fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function(err, content){
	if(!err){
		const lines = content.split('\n');
		console.log(lines.length - 1);
	}
});