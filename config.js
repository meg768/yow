

function loadConfig() {

	var fs = require('fs');
	var json = {};

	try {
		json = JSON.parse(fs.readFileSync('.config'));
	}
	catch(error) {
		console.error(error);
	}

	return json;
}

var config = module.exports = loadConfig();
