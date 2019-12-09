const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function Foo() {
  await sleep(100);
  console.log('A');
  return 'B';
}

async function Bar() {
  await sleep(50);
  console.log('C')
  return 'D';
}
