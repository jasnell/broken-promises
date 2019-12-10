const EventEmitter = require('events');
const { promisify } = require('util');

// Coming soon to a Node.js release... captureRejections
// makes EventEmitter expect and understand async
// functions.

const foo = new EventEmitter({ captureRejections: true });
const sleep = promisify(setTimeout);

foo.on('something', async () => {
  await sleep(100);
  functionThatDoesNotExist();
})

// Just don't make your error handler async!!
foo.on('error', (err) => {
  throw new Error('boom');
});

foo.emit('something');

console.log('A');
