const EventEmitter = require('events');

const foo = new EventEmitter();

// It is important to keep in mind that eventemitter
// always emits events synchronously, invoking handler
// callbacks in the order they were registered.

foo.on('something', async() => {
  console.log('B');
})

foo.emit('something');

console.log('A');
