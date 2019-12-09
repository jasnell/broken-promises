const EventEmitter = require('events');

const foo = new EventEmitter();

foo.on('something', async() => {
  console.log('B');
})

foo.emit('something');

console.log('A');
