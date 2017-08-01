
var Module = module.exports = function(fileName) {

	console.log(fileName, '*****************');

	function parse (src) {
	  var obj = {}

	  // convert Buffers before splitting into lines and processing
	  src.toString().split('\n').forEach(function (line) {
	    // matching "KEY' and 'VAL' in 'KEY=VAL'
	    var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
	    // matched?
	    if (keyValueArr != null) {
	      var key = keyValueArr[1]

	      // default undefined or missing values to empty string
	      var value = keyValueArr[2] ? keyValueArr[2] : ''

	      // expand newlines in quoted values
	      var len = value ? value.length : 0
	      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
	        value = value.replace(/\\n/gm, '\n')
	      }

	      // remove any surrounding quotes and extra spaces
	      value = value.replace(/(^['"]|['"]$)/g, '').trim()

	      obj[key] = value
	    }
	  })

	  return obj
	}

	function config (fileName) {
	  var encoding = 'utf8'


	  try {
	    // specifying an encoding returns a string instead of a buffer
	    var parsedObj = parse(fs.readFileSync(fileName, { encoding: encoding }))

		console.log('parsed', parsedObj);
	    Object.keys(parsedObj).forEach(function (key) {
			console.log(key, parsedObj[key]);
	      process.env[key] = process.env[key] || parsedObj[key]
	    })

	    return { parsed: parsedObj }
	  } catch (e) {
	    return { error: e }
	  }
	}

	var Path = require('path');

	var fileParts = Path.parse(fileName);
	var configFileName = Path.join(fileParts.dir, fileParts.name) + '.env';
	console.log(configFileName);

	config(configFileName);
//	dotenv.config(configFileName);
}
