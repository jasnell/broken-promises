const EventEmitter = require('events');

const foo = new EventEmitter();

foo.on('something', async() => {
  // Yay I'm async! Right?
})

foo.emit('something');
