const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function WaitForSomething() {
  await sleep(100);
  throw new Error('boom');
}

setTimeout(async () => {
  console.log(await WaitForSomething());
}, 100);

