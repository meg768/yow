module.exports.sprintf    = require('sprintf-js').sprintf;
module.exports.extend     = require('extend');

module.exports.isType     = require('./src/istype.js').isType;
module.exports.isArray    = require('./src/istype.js').isArray;
module.exports.isNumber   = require('./src/istype.js').isNumber;
module.exports.isString   = require('./src/istype.js').isString;
module.exports.isDate     = require('./src/istype.js').isDate;
module.exports.isObject   = require('./src/istype.js').isObject;
module.exports.isFunction = require('./src/istype.js').isFunction;

module.exports.rand       = require('./src/random.js').rand;
module.exports.choose     = require('./src/random.js').choose;
	
module.exports.sprintf    = require("sprintf-js").sprintf; 
module.exports.extend     = require('extend'); 

module.exports.Events     = require('./src/events.js'); 

module.exports.mkdir      = require('./src/fs.js').mkdir;
module.exports.mkpath     = require('./src/fs.js').mkpath;
module.exports.fileExists = require('./src/fs.js').fileExists;

