const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function First() { await sleep(100); return 'A'; }
async function Second() { await sleep(200); return 'B'; }
async function Third() { await sleep(300); return 'C'; }

async function Go() {
  return await (new Promise(async (resolve) => {
    resolve({ first: await First() });
  }))
  .then(async (obj) => {
    return { ...obj, second: await Second() };
  })
  .then(async (obj) => {
    return { ...obj, third: await Third() };
  });
}

Go().then(console.log);
