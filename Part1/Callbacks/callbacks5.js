const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function WaitForSomething() {
  await sleep(100);
  functionThatDoesNotExist();
}

// We can do better by not passing an async
// function to as a callback and properly
// handling our Promise chain...
setTimeout(() => {
  WaitForSomething()
    .then(console.log)
    .catch(console.log)
}, 100);

