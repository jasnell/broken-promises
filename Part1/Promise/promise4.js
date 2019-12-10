const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Without running the code, can you determine the
// order in which the console.log statements will
// print?

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
