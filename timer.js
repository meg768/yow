
var Timer = module.exports = function() {

	var _this = this;
	var _timer = undefined;

	_this.cancel = function() {
		if (_timer != undefined)
			clearTimeout(_timer);

		_timer = undefined;
	};

	_this.setTimer = function(delay, fn) {
		if (delay == undefined)
			delay = 3000;

		_this.cancel();

		_timer = setTimeout(function() {
			_this.cancel();
			fn();
		}, delay);

	};

};
