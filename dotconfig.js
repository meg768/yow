const fs = require('fs');
const Path = require('path');

function loadConfig(fileName) {
	let configFile = '';
	let config = {};

	try {
		if (!fs.existsSync(configFile)) {
			configFile = Path.join(Path.dirname(process.argv[1]), fileName);
		}
	
		if (!fs.existsSync(configFile)) {
			configFile = Path.resolve(process.cwd(), fileName);
		}
		
		if (fs.existsSync(configFile)) {
			config = JSON.parse(fs.readFileSync(configFile));	
		}
	}
	catch(error) {
		config.error = error;
	}

	return config;
}

module.exports = loadConfig('.config');