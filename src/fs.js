var fs = require('fs');

module.exports.mkpath = function(path) {
	
	// TODO: Create the entire path
	if (!fileExists(path)) {
		fs.mkdirSync(path);		
	}
	
}


module.exports.mkdir = function(path) {
	
	if (!fileExists(path)) {
		fs.mkdirSync(path);		
	}
	
}


module.exports.fileExists = function(path) {

	try {
		fs.accessSync(path);		
		return true;
	}
	catch (error) {
	}

	return false;		
}
