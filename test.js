


var Queue = require('./queue.js');

var queue = new Queue();

function print(text) {
	return new Promise(function(resolve, reject) {
		console.log(text);
		setTimeout(resolve, 2000);
	});
}

queue.enqueue(print.bind(null, 'Hej'));
queue.enqueue(print.bind(null, 'Då!'));

queue.dequeue().then(function() {
	console.log('Klar!');
})
.catch(function(error) {
	console.log(error);
});
