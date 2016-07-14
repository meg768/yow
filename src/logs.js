var sprintf    = require('sprintf-js').sprintf;
var isString   = require('./is.js').isString;
var isFunction = require('./is.js').isFunction;
var mkpath     = require('./fs.fs').mkpath;
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
			var output = '';
			var prefix = typeof fn == 'function' ? fn() : fn;

			if (typeof arguments[0] == 'string') {
				arguments[0].split('\n').forEach(function(line) {

					if (output != '')
						output += '\n';

					output += prefix + line;
				});
			}
			else {
				output = prefix + arguments[0];
			}

			arguments[0] = output;

			funcs[key].apply(console, arguments);

		}
	}

}

var redirectLogs = module.exports.redirectLogs = function(logFile) {

	if (logfile == undefined) {
		var date = new Date();
		logFile = sprintf('logs/%04d-%02d-%02d-%02d-%02d.log', date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes());
	}

	if (isFunction(logFile))
		logFile = logFile();

	if (isString(logFile))
		mkpath(path.dirname(logFile));

	var fs = require('fs');
	var access = fs.createWriteStream(logFile);

	process.stderr.write = process.stdout.write = access.write.bind(access);

	process.on('uncaughtException', function(err) {
		console.error((err && err.stack) ? err.stack : err);
	});
}
