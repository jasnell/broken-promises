const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Developers should use Promise.race sparingly!
// It's way too easy to kill performance.

async function Foo() {
  await sleep(1000);
  console.log('A');
  return 'B';
}

async function Bar() {
  await sleep(50);
  console.log('C')
  return 'D';
}

Promise.race([Foo(), Bar()]).then(console.log);
