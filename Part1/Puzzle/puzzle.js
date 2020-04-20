const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function bar(n, s, t) {
  setImmediate(() => process.stdout.write(s));
  await sleep(n);
  return t;
}

async function foo() {
  process.stdout.write('L');
  for (const m of await Promise.all([bar(20, 'F', 'O'), bar(10, 'I', 'N')]))
    process.stdout.write(m)
}

sleep(50).then(() => process.stdout.write('!'));

new Promise((res) => {
  process.stdout.write('H');
  res('O');
}).then((m) => process.stdout.write(m))
  .finally(() => process.stdout.write('L'));

queueMicrotask(() => process.stdout.write(' '));

process.nextTick(() => process.stdout.write('L'));

setTimeout(() => process.stdout.write('!'), 100);

setImmediate(() => process.stdout.write('I'));

process.stdout.write('E');

foo();
