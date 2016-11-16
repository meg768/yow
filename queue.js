
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

	_this.clear = function() {
		_queue = [];
		_promise = undefined;
	}

	_this.isRunning = function() {
		return _promise != undefined;
	};

	_this.isEmpty = function() {
		return _queue.length == 0;
	};


	this.enqueue = function(promise) {

		if (_queue.length > _limit) {
			console.log('Queue too big! Truncating.');

			_this.clear();
		}

		_queue.push(promise);
	}

};
