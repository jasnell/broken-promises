const EventEmitter = require('events');
const { promisify } = require('util');

// Coming soon to a Node.js release...
const foo = new EventEmitter({ captureRejections: true });
const sleep = promisify(setTimeout);

foo.on('something', async () => {
  await sleep(100);
  throw new Error('boom');
})

foo.on('error', (err) => {
  throw err;
});

foo.emit('something');

console.log('A');
