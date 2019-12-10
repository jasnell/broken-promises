const EventEmitter = require('events');
const { promisify } = require('util');

const foo = new EventEmitter();
const sleep = promisify(setTimeout);

// But what happens when something fails?
// How can you handle the error?

foo.on('something', async() => {
  await sleep(100);
  functionThatDoesNotExist();
})

// Attaching a error handler to the emitter
// does not help.
foo.on('error', console.log);

foo.emit('something');

console.log('A');
