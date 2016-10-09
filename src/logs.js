var sprintf    = require('sprintf-js').sprintf;
var isString   = require('./is.js').isString;
var isFunction = require('./is.js').isFunction;
var mkpath     = require('./fs.js').mkpath;
var path       = require('path');

var prefixLogs = module.exports.prefixLogs = function(fn) {

	var funcs = {
		log: console.log,
		error: console.error,
		warn: console.warn,
		info: console.info
	};

	if (fn == undefined) {
		fn = function() {
			var date = new Date();
			return sprintf('%04d-%02d-%02d %02d:%02d.%02d: ', date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

		}
	}

	for (var key in funcs) {
		console[key] = function() {
			var prefix = typeof fn == 'function' ? fn() : fn;

			if (key == 'error')
				process.stderr.write(prefix);
			else
				process.stdout.write(prefix);

			funcs[key].apply(console, arguments);

		}
	}

}

var redirectLogs = module.exports.redirectLogs = function(logFile) {

	if (logFile == undefined) {
		var date = new Date();
		logFile = sprintf('logs/%04d-%02d-%02d-%02d-%02d-%02d.log', date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
	}

	if (isFunction(logFile))
		logFile = logFile();

	if (isString(logFile))
		mkpath(path.dirname(logFile));

	var fs = require('fs');
	var access = fs.createWriteStream(logFile, {'flags': 'a'});

	process.stderr.write = process.stdout.write = access.write.bind(access);

	process.on('uncaughtException', function(err) {
		console.error((err && err.stack) ? err.stack : err);
	});
}
