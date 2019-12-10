const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Given the function, do you know when each
// part is going to execute when DoSomething()
// is called?

async function DoSomething() {
  for (var n = 0; n < 1e6; n++) {}
  await sleep(100);
  console.log('hello world');
}

DoSomething();
