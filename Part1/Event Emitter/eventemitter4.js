const EventEmitter = require('events');
const { promisify } = require('util');

const foo = new EventEmitter();
const sleep = promisify(setTimeout);

foo.on('something', async() => {
  await sleep(100);
  throw new Error('boom');
})

foo.emit('something');

console.log('A');
