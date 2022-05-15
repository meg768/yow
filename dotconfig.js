const fs = require('fs');
const Path = require('path');

function loadConfig(fileName = '.config') {
	let configFile = Path.resolve(process.cwd(), fileName);

	if (!fs.existsSync(configFile)) {
		configFile = Path.join(Path.dirname(process.argv[1]), fileName);
	}

	let config = {};

	if (fs.existsSync(configFile)) {
		try {
			config = fs.existsSync(configFile) ? JSON.parse(fs.readFileSync(configFile)) : {};	
		}
		catch(error) {
		}
	
	}

	return config;
}

module.exports = loadConfig();