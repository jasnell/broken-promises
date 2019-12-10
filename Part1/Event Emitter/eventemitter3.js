const EventEmitter = require('events');
const { promisify } = require('util');

const foo = new EventEmitter();
const sleep = promisify(setTimeout);

// Passing an async function to event emitter
// does allow you to do some interesting things...

foo.on('something', async () => {
  await sleep(100);
  console.log('B');
})

foo.emit('something');

console.log('A');
