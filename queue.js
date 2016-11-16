var isArray = require('./yow.js').isArray;


var Queue = module.exports = function(limit) {

	var _this = this;
	var _queue = [];
	var _promise = undefined;
	var _limit = limit == undefined ? 1000 : limit;

	_this.dequeue = function() {

		return new Promise(function(resolve, reject) {
			if (_queue.length > 0 && _promise == undefined) {

				_promise = _queue.splice(0, 1)[0];

				_promise().then(function() {
					_promise = undefined;

					function recurse() {
						_this.dequeue().then(function() {
							resolve();
						}).catch(function(error) {
							reject(error);
						});

					};

					setTimeout(recurse, 0);
				})
				.catch(function(error) {
					reject(error);
				});

			}
			else {
				resolve();
			}

		});
	}

	this.queue = function(queue) {
		if (isArray(queue))
			_queue = queue;
		else
			_queue = [queue];
	};

	this.setQueue = this.queue;

	_this.reset = function() {
		_queue = [];
	}

	_this.clear = function() {
		_queue = [];
	}


	_this.isRunning = function() {
		return _promise != undefined;
	};

	_this.isEmpty = function() {
		return _queue.length == 0;
	};


	this.prequeue = function(promise) {

		if (_queue.length > _limit) {
			console.log('Queue too big! Truncating.');

			_this.clear();
		}

		_queue.unshift(promise);
	}


	this.enqueue = function(promise, args) {

/*
		if (isArray(args))
			promise = promise.bind(args[0], args[1], args[2], args[3], args[4], args[5]);
*/

		if (_queue.length > _limit) {
			console.log('Queue too big! Truncating.');

			_this.clear();
		}

		_queue.push(promise);
	}

};
