var isArray = require('./yow.js').isArray;


var Queue = module.exports = function(limit) {

	var _this    = this;
	var _queue   = [];
	var _running = false;
	var _limit   = limit == undefined ? 1000 : limit;

	_this.dequeue = function() {

		return new Promise(function(resolve, reject) {
			if (_queue.length > 0 && !_running) {

				_running = true;

				// Get next function in line
				var fn = _queue.splice(0, 1)[0];

				// Call it, and wait for complete
				fn().then(function() {
					_running = false;

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
					_running = false;
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
		return _running;
	};

	_this.isEmpty = function() {
		return _queue.length == 0;
	};

	this.prequeue = function(fn) {

		if (_queue.length > _limit) {
			console.log('Queue too big! Truncating.');
			_queue = [fn];
		}
		else {
			_queue.unshift(fn);

		}

	}

	this.enqueue = function(fn) {

		if (_queue.length > _limit) {
			console.log('Queue too big! Truncating.');
			_queue = [fn];
		}
		else {
			_queue.push(fn);

		}

	}

};
