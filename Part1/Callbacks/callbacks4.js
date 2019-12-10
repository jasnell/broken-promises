const { promisify } = require('util');
const sleep = promisify(setTimeout);

// We end up with exactly the same problem when
// an error occurs.

async function WaitForSomething() {
  await sleep(100);
  functionThatDoesNotExist();
}

setTimeout(async () => {
  console.log(await WaitForSomething());
}, 100);

