const EventEmitter = require('events');
const { promisify } = require('util');

const foo = new EventEmitter();
const sleep = promisify(setTimeout);

foo.on('something', async () => {
  await sleep(100);
  // You can catch and forward the error to the
  // event emitter yourself...
  try {
    functionThatDoesNotExist();
  } catch (err) {
    // Escape the Promise error handling trap!
    process.nextTick(() => foo.emit('error', err));
  }
})

// But what happens if the error handler
// throws an error?
foo.on('error', (err) => {
  throw new Error('boom');
});

foo.emit('something');

console.log('A');
