const { promisify } = require('util');
const sleep = promisify(setTimeout);

let fd = 0;

function DoSomething() {
  return new Promise(async (resolve) => {
    // Simulate allocating an fd
    fd = 1;
    throw new Error('boom');
  }).catch(() => {
    // Simulate cleaning up the fd
    fd = 0;
  });
}

DoSomething();
console.log('A');

process.on('exit', () => {
  console.log(fd);
});
