const fs = require('fs');
const Path = require('path');
const mkpath = require('./mkpath.js');
const fileExists = require('./fileExists.js');

let configFile = '';
let config = {};

function load(fileName) {

	if (fileName == undefined)
		fileName = '.config';

	if (!fileExists(configFile)) {
		configFile = Path.join(Path.dirname(process.argv[1]), fileName);
	}

	if (!fileExists(configFile)) {
		configFile = Path.resolve(process.cwd(), fileName);
	}
	
	if (fileExists(configFile)) {
		config = JSON.parse(fs.readFileSync(configFile));	
	}

	return config;
}

function save() {

	if (!fileExists(configFile)) {
		mkpath(Path.dirname(configFile));
	}

	fs.writeFileSync(configFile, JSON.stringify(config, null, '\t'));
}

module.exports = load;
module.exports.load = load;
module.exports.save = save;
