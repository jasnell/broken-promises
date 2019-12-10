const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Without running the code, what happens to this error?

// Does the catch handler work?

function DoSomething() {
  return new Promise(async (resolve) => {
    throw new Error('boom');
  }).catch(console.log);
}

DoSomething();
console.log('A');
