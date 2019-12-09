const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function DoSomething() {
  for (var n = 0; n < 1e6; n++) {}
  await sleep(100);
  console.log('hello world');
}

DoSomething();
