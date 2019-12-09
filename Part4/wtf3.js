const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function First() { await sleep(100); return 'A'; }
async function Second() { await sleep(200); return 'B'; }
async function Third() { await sleep(300); return 'C'; }

async function Go() {
  const first = await First();
  const second = await Second();
  const third = await Third();
  return { first, second, third };
}

Go().then(console.log);
