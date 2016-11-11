
var isArray   = require('./is.js').isArray;
var isNumber  = require('./is.js').isNumber;
var isInteger = require('./is.js').isInteger;
var isFloat   = require('./is.js').isFloat;
var isObject  = require('./is.js').isObject;

var range = module.exports.range = function(min, max, step) {

	var items = [];

	for (var i = min; i < max; i += step)
		items.push(i);
}
