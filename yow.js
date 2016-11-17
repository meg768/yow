module.exports.sprintf    = require('./sprintf.js');
module.exports.extend     = require('./extend.js');

module.exports.random     = require('./random.js');
module.exports.range      = require('./range.js');

module.exports.isType     = require('./is.js').isType;
module.exports.isArray    = require('./is.js').isArray;
module.exports.isNumber   = require('./is.js').isNumber;
module.exports.isString   = require('./is.js').isString;
module.exports.isDate     = require('./is.js').isDate;
module.exports.isObject   = require('./is.js').isObject;
module.exports.isFunction = require('./is.js').isFunction;
module.exports.isInteger  = require('./is.js').isInteger;
module.exports.isFloat    = require('./is.js').isFloat;

module.exports.mkdir      = require('./fs.js').mkdir;
module.exports.mkpath     = require('./fs.js').mkpath;
module.exports.fileExists = require('./fs.js').fileExists;
module.exports.readJSON   = require('./fs.js').readJSON;
module.exports.writeJSON  = require('./fs.js').writeJSON;

module.exports.prefixLogs   = require('./logs.js').prefix;
module.exports.redirectLogs = require('./logs.js').redirect;
