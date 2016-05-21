var random = require('./yow.js').random;

console.log(random({A:'Ahh', B:'Bee', C:'See'}));
console.log(random(['A', 'B', 'C']));
console.log(random(100, 101));
console.log(random(1));
console.log(random('Foo'));
