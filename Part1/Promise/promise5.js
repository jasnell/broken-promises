const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Similar to promise4, without running the code,
// can you determine the order in which the console.log
// statements will print?

// What good is the async function actually providing?

function DoSomething() {
 return new Promise(async (resolve) => {
    for (var n = 0; n < 1e6; n++) {}
    resolve(await sleep(100));   // !?
    console.log('B');
  }).then(() => {
    console.log('hello world');
  });
}

DoSomething();
console.log('A');
