const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function WaitForSomething() {
  await sleep(100);
  return 'foo';
}

setTimeout(async () => {
  console.log(await WaitForSomething());
}, 100);

