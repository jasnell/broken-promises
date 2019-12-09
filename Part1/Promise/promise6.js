const { promisify } = require('util');
const sleep = promisify(setTimeout);

function DoSomething() {
  return new Promise((resolve) => {
    throw new Error('boom');
  }).catch(console.log);
}

DoSomething();
console.log('A');
