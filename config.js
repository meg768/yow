

function loadConfig(fileName) {

	var json = {};

	try {
		var fs = require('fs');
		json = JSON.parse(fs.readFileSync(fileName));
	}
	catch(error) {
		console.error(error);
	}

	return json;
}

var config = loadConfig('.config');

config.load = loadConfig;

module.exports = config;
