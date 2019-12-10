const EventEmitter = require('events');

const foo = new EventEmitter();

// Passing async functions to APIs that do not
// expect async functions seems to be a favorite
// passtime of many JavaScript developers.

foo.on('something', async() => {
  // Yay I'm async! Right?
})

foo.emit('something');
