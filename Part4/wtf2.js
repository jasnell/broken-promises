const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function First() { await sleep(300); return 'A'; }
async function Second() { await sleep(200); return 'B'; }
async function Third() { await sleep(100); return 'C'; }

async function Go() {
  const [ first, second, third ] =
    await Promise.all([
      First(),
      Second(),
      Third()
    ]);
  return { first, second, third };
}

Go().then(console.log);
