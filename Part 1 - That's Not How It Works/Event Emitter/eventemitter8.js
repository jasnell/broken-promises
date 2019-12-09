const EventEmitter = require('events');
const { promisify } = require('util');

const foo = new EventEmitter();
const sleep = promisify(setTimeout);

foo.on('something', () => {
  sleep(100)
    .then(() => {
      throw new Error('boom');
    })
    .catch((err) => {
      // Escape the Promise error handling trap
      process.nextTick(() => foo.emit('error', err));
    });
})

foo.on('error', (err) => {
  throw err;
});

foo.emit('something');

console.log('A');
