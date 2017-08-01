

var Config = module.exports = function (fileName) {

	var Path = require('path');

	var fileParts = Path.parse(fileName);
	var configFileName = Path.join(fileParts.dir, fileParts.name) + '.json';

	try {
		console.log('Reading fkle', configFileName);
		return JSON.parse(fs.readFileSync(fileName));

	}
	catch(error) {
		return {};
	}
}
