# Yow

Toolbox for Node. Contains stuff you only wished was there in the first place.

## Installation

````bash
npm install yow --save
````

## Methods

### General Purpose

````javascript
var sprintf = require('yow/sprintf');
var vsprintf = require('yow/vsprintf');
var once = require('yow/once');
````

- **sprintf(args)**        - Just as you would expect. Uses the npm module 'sprintf-js'.
- **vsprintf(args)**       - Just as you would expect. Uses the npm module 'sprintf-js'.
- **once(fn, context)**    - Call a function just once and return the same result.


### File System

````javascript
var mkdir = require('yow/mkdir')
var mkpath = require('yow/mkpath');
var fileExists = require('yow/fileExists');
var readJSON = require('yow/readJSON');
var writeJSON = require('yow/writeJSON');
````

- **mkdir(path)**                 - Creates the directory you specify.
- **mkpath(path)**                - Creates the directory you specify. It will create multiple directories if they do not exit.
- **fileExists(path)**            - Nothing fancy, it just returns true/false.
- **readJSON(fileName)**          - Reads a JSON file and returns the contents.
- **writeJSON(fileName, object)** - Writes an object to a JSON file.

### Type Checks

````javascript
var isArray = require('yow/isArray');
var isNumber = require('yow/isNumber');
var isString = require('yow/isString');
var isDate = require('yow/isDate');
var isFunction = require('yow/isFunction');
var isObject = require('yow/isObject');
var isInteger = require('yow/isInteger');
var isFloat = require('yow/isFloat');
````

- **isType(object, type)**  - Returns true/false if typeof equals 'type'.
- **isArray(object)**       - Is object an array?
- **isNumber(object)**      - Is object a JavaScript **Number** object?
- **isString(object)**      - Is object a **String** object?
- **isDate(object)**        - Is object a **Date** object (and contains a valid date)?
- **isFunction(object)**    - Is object a **function** object?
- **isObject(object)**      - Is object an object? BTW **null** is not an object.
- **isInteger(object)**     - Is object an integer?
- **isFloat(object)**       - Is object a float? Please note that isFloat(1.0) returns false.

### Random

````javascript
var random = require('yow/random');
````

- **random()**              - Returns Math.random().
- **random(integer)**       - Returns a random number from 0 to the integer specified (exclusive).
- **random(min, max)**      - Returns a random number from min to max (inclusive).
- **random(array)**         - Returns a randomly chosen object in the specified array.
- **random(object)**        - Returns a randomly chosen object property.

Also available as require('yow/random')

### Range

````javascript
var range = require('yow/range');
````

- **range(min, max, step)** - Returns an range array generated by **min**, **max**, and **step**.

### Console/Logging

````javascript
require('yow/prefixConsole');
````
- **prefixConsole(fn)** - Adds a prefix to all **console** methods.

### Timer

````javascript
var Timer = require('yow/timer');
var timer = new Timer();
````

- **timer.setTimer(delay, fn)** - Executes the specified function **fn** after a delay.
	Previously set timers are cancelled.

- **timer.cancel()** - Cancels the timer.

### Request

````javascript
var Request = require('yow/request');
var request = new Request(options);
````

A light-weight http/https request module.

````javascript
function example() {

	var Request = require('yow/request');
	var yahoo = new Request('https://query.yahooapis.com');

	function getQuote(ticker) {
		var query = {};

		query.q        = 'select * from yahoo.finance.quotes where symbol =  "' + ticker + '"';
		query.format   = 'json';
		query.env      = 'store://datatables.org/alltableswithkeys';
		query.callback = '';

		yahoo.get('/v1/public/yql', {query:query}).then(function(response) {
			var quotes = response.body.query.results.quote;

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
````

- **request.request(options)** - See https://nodejs.org/api/http.html#http_http_request_options_callback for documentation.
- **request.get(options)**     - Same as request('GET', options)
- **request.post(options)**    - Same as request('POST', options)
- **request.delete(options)**  - Same as request('DELETE', options)
- **request.put(options)**     - Same as request('PUT', options)
