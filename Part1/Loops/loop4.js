const { promisify } = require('util');
const sleep = promisify(setTimeout);

// What happens when we increase the number
// of iterations?

var data = Array(1000);
for (let n = 0; n < data.length; n++)
  data[n] = n;

async function process() {
  setImmediate(() => console.log('next tick'));
  return await Promise.all(data.map(async (i) => {
    for (let n = 0; n < 1e6; n++) {}
    await sleep(1000);
    return -i;
  }));
}

process().then(console.log);
