const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function WaitForSomething() {
  await sleep(100);
  functionThatDoesNotExist();
}

// But if you really want to use Promises,
// there's a more obvious solution that's
// been staring at us.

sleep(100)
  .then(WaitForSomething)
  .then(console.log)
  .catch(console.log)

// Key lesson: It's best to avoid mixing
// callbacks and Promises, but if you're
// going to mix them, do so with caution!
