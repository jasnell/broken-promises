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
      foo.emit('error', err);
    });
})

foo.on('error', console.log);

foo.emit('something');

console.log('A');
