const { promisify } = require('util');
const sleep = promisify(setTimeout);

// We've been noticing some devs passing an async
// function to the Promise constructor...

// This is pointless. Don't do this.

function DoSomething() {
  return new Promise(async (resolve) => {
    for (var n = 0; n < 1e6; n++) {}
    resolve(await sleep(100));   // !?
  }).then(() => {
    console.log('hello world');
  });
}

DoSomething();
