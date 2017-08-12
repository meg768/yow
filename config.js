

var config = {};

function loadConfig(fileName) {

	var json = {};

	try {
		var fs = require('fs');
		json = JSON.parse(fs.readFileSync(fileName));
	}
	catch(error) {
		console.error(error);
	}

	json.load = loadConfig;

	return json;
}

var config = loadConfig('.config');


module.exports = config;
