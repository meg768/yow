const fs = require('fs');
const Path = require('path');
const mkpath = require('./mkpath.js');
const fileExists = require('./fileExists.js');

let configFile = '';
let config = {};

module.exports.load = function(fileName) {

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

module.exports.save = function() {

	if (!fileExists(configFile)) {
		mkpath(Path.dirname(configFile));
	}

	fs.writeFileSync(configFile, JSON.stringify(config, null, '\t'));
}