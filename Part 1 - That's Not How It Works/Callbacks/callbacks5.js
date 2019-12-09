const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function WaitForSomething() {
  await sleep(100);
  throw new Error('boom');
}

setTimeout(() => {
  WaitForSomething()
    .then(console.log)
    .catch(console.log)
}, 100);

