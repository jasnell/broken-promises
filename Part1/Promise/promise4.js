const { promisify } = require('util');
const sleep = promisify(setTimeout);

function DoSomething() {
 return new Promise((resolve) => {
    for (var n = 0; n < 1e6; n++) {}
    resolve(sleep(100));
    console.log('B');
  }).then(() => {
    console.log('hello world');
  });
}

DoSomething();
console.log('A');
