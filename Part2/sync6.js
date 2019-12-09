const { createHook } = require('async_hooks');

let count = 0;
createHook({
  init(id, type) {
    if (type === 'PROMISE')
      count++;
  }
}).enable();


let iterations = 0;
const max = 40;

function syncBusy() {
  for (var n = 0; n < 1e9; n++) {}
  return '.';
}

async function doBusy() {
  if (++iterations % max === 0)
    return null;
  return syncBusy();
}

async function beNaughty() {
  let x = Promise.resolve();
  let chunk;

  while (chunk = await Promise.race([doBusy(), x]))
    process.stdout.write(chunk);
}

beNaughty();

process.on('exit', () => {
  process._rawDebug(`${count}`);
});
