# Yow

Toolbox for Node. Contains stuff you only wished was there in the first place.

## Installation

	npm install yow --save
	
## Methods

- **sprintf(args)**        - Just as you would expect. Uses the npm module 'sprintf-js'.
- **extend(args)**         - Again, just as you would expect. Uses the npm module 'extend'.
- **mkdir(path)**          - Creates the directory you specify. It will create multiple directories if they do not exit.
- **fileExists(path)**     - Nothing fancy, it just returns true/false.
- **isType(object, type)** - Returns true/false if typeof equals 'type'
- **isArray(object)**      - Is object an array?
- **isNumber(object)**     - Is object a JavaScript number object?
- **isString(object)**     - Iects object a string?
- **isDate(object)**       - Is object a Date object?
- **isObj(object)**        - Is object an object? BTW **null** is not an object.
- **choose(array)**        - Returns a randomly chosen object in the specified array.
- **rand(min, max)**       - Returns a random number from min to max (inclusive).
