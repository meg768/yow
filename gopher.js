var clientRequest = require('client-request');

var sprintf  = require('./sprintf.js');
var extend   = require('./extend.js');
var isArray  = require('./is.js').isArray;
var isString = require('./is.js').isString;
var isObject = require('./is.js').isObject;

var Gopher = module.exports = function(baseURL, defaultOptions) {

	this.get = function(path, options) {
		return this.request('GET', path, o	ptions);
	}

	this.put = function(path, options) {
		return this.request('PUT', path, options);
	}

	this.post = function(path, options) {
		return this.request('POST', path, options);
	}

	this.delete = function(path, options) {
		return this.request('DELETE', path, options);
	}

	this.request = function(method, path, options) {

		method  = method.toUpperCase();
		options = extend({}, defaultOptions, options || {});

		function buildPath() {

			if (path == undefined)
				return '';

			return '/' + path;
		};

		function buildQuery() {

			var query = options.query;

			if (query == undefined)
				return '';

			function uriEncode(value) {

				if (isArray(value)) {
					value = value.join(',');
				}
				else if (isObject(value)) {
					value = JSON.stringify(value);
				}

				return encodeURIComponent(value);
			}

			var array = Object.keys(query).map(function(key) {
				return encodeURIComponent(key) + '=' + uriEncode(query[key]);
			});

			return '?' + array.join('&');
		}

		function buildHeaders() {
			var headers = {};
			return headers;
		};

		function buildBody() {
			return '';
		};

		function buildURI() {
			return baseURL + buildPath() + buildQuery();
		};

		return new Promise(function(resolve, reject) {

			var requestOptions = {};
			requestOptions.method  = method;
			requestOptions.uri     = buildURI();
			requestOptions.headers = buildHeaders();
			requestOptions.body    = buildBody();

			if (options.debug) {
				console.log('Gopher request:', JSON.stringify(requestOptions, null, '    '));
			}

			clientRequest(requestOptions, function (error, response, body) {

				if (!error && response.statusCode == 200) {
					var contentType = '';

					if (response.headers && isString(response.headers['content-type'])) {
						contentType = response.headers['content-type'];
					}

					if (contentType.match("application/json")) {

						try {
							// Parse JSON first
							var json = JSON.parse(body);

							// And resolve if succeeded
							resolve(json);
						}

						catch (error) {
							reject(error);
						}
					}
					else {
						resolve(body.toString());
					}
				}
				else {

					if (error == null)
						error = body.toString();

					try {
						error = JSON.parse(error);
					}
					catch (error) {
					}

					reject(error);

				}
			});

		});
	}


};
/*
function test() {

	var yahoo = new Gopher('https://query.yahooapis.com', {debug:false});

	function getQuote(ticker) {
		var query = {};

		query.q        = 'select * from yahoo.finance.quotes where symbol =  "' + ticker + '"';
		query.format   = 'json';
		query.env      = 'store://datatables.org/alltableswithkeys';
		query.callback = '';

		yahoo.get('v1/public/yql', {query:query}).then(function(data) {
			var quotes = data.query.results.quote;

			if (typeof qoutes != 'Array')
				quotes = [quotes];

			console.log(ticker, '=', quotes[0].LastTradePriceOnly);

		})

		.catch (function(error) {
			console.log(error);

		});

	}

	getQuote('AAPL');

};

test();
*/
