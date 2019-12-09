const { promisify } = require('util');
const sleep = promisify(setTimeout);

function DoSomething() {
 return new Promise(async (resolve) => {
    for (var n = 0; n < 1e6; n++) {}
    resolve(await sleep(100));   // !?
  }).then(() => {
    console.log('hello world');
  });
}

DoSomething();
