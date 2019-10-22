var fs = require('fs');

module.exports = function(path) {

	try {
		fs.accessSync(path);		
		return true;
	}
	catch (error) {
	}  

	return false;		
}