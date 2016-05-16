var fs = require('fs');

var mkpath = module.exports.mkpath = function(path) {
	
	// TODO: Create the entire path
	if (!fileExists(path)) {
		fs.mkdirSync(path);		
	}
	
}


var fileExists = module.exports.fileExists = function(path) {

	try {
		fs.accessSync(path);		
		return true;
	}
	catch (error) {
	}

	return false;		
}

var mkdir = module.exports.mkdir = function(path) {
	
	if (!fileExists(path)) {
		fs.mkdirSync(path);		
	}
	
}


