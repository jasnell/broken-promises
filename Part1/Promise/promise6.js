const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Without running the code, what happens to this error?

function DoSomething() {
  return new Promise((resolve) => {
    throw new Error('boom');
  }).catch(console.log);
}

DoSomething();
console.log('A');
