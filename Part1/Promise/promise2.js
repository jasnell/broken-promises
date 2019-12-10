const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Equivalent to promise1, but using legacy Promise
// syntax... Aain, do you know when each part is
// going to execute?

function DoSomething() {
 return new Promise((resolve) => {
    for (var n = 0; n < 1e6; n++) {}
    resolve(sleep(100));
  }).then(() => {
    console.log('hello world');
  });
}

DoSomething();
