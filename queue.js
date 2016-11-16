

var isFunction = require('./yow.js').isFunction;

var Module = module.exports = function() {

	var _this = this;
	var _queue = [];
	var _fn = undefined;

	_this.dequeue = function(callback) {
		if (_queue.length > 0 && _fn == undefined) {

			_fn = _queue.splice(0, 1)[0];

			_fn(function() {
				_fn = undefined;

				if (_queue.length > 0) {
					setTimeout(function() {
						_this.dequeue(callback);
					}, 0);

				}
				else {
					if (isFunction(callback))
						callback();
				}
			});

		}
		else {
			if (isFunction(callback))
				callback();
		}
	}

	_this.clear = function() {
		_queue = [];
		_fn    = undefined;
	}

	_this.isRunning = function() {
		return _fn != undefined;
	};

	_this.isEmpty = function() {
		return _queue.length == 0;
	};


	this.enqueue = function(fn) {

		if (_queue.length > 50) {
			console.log('Queue too big! Truncating.');

			_this.clear();
		}

		_queue.push(fn);
	}

};
