# node-yow

Contains stuff for Node You Only Wished was there in the first place.

# Installation

	npm install yow
	
# Contents

	mkdir(path)
	
Creates the directory you specify. It will create multiple directories if they do not exit.

	fileExists(path)
	
Nothing fancy, it just returns true/false.

	isType(object, type)
	
Returns true/false if typeof equals 'type'

	isArray(object)
	isNumber(object)
	isString(object)
	isDate(object)
	
Returns just as you would expect. BTW null is not an object.

	choose(array)
	
Returns a randomly chosen object in the specified array

	rand(min, max)
	
Returns a random number from min to max (inclusive)
	
	