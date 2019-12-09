const { promisify } = require('util');
const sleep = promisify(setTimeout);

function DoSomething() {
  return new Promise(async (resolve) => {
    throw new Error('boom');
  }).catch(console.log);
}

DoSomething();
console.log('A');
