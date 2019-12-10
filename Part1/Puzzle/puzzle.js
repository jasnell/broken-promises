const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function bar(n, s, t) {
  setImmediate(() => process.stdout.write(s));
  await sleep(n);
  return t;
}

async function foo() {
  process.stdout.write('L');
  for (const m of await Promise.all([bar(20, 'N', 'R'), bar(10, 'T', 'E')]))
    process.stdout.write(m)
}

sleep(50).then(() => process.stdout.write('A'));

new Promise((res) => {
  process.stdout.write('H');
  res('O');
}).then((m) => process.stdout.write(m))
  .finally(() => process.stdout.write('M'));

queueMicrotask(() => process.stdout.write(' '));

process.nextTick(() => process.stdout.write('L'));

setTimeout(() => process.stdout.write('L'), 100);

setImmediate(() => process.stdout.write('O'));

process.stdout.write('E');

foo();
