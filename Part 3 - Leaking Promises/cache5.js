const { promisify } = require('util');
const sleep = promisify(setTimeout);

const cache = new Map();

async function maybeSleep(n) {
  const r = Math.random(10) * 10 | 0;
  if (r > 5) throw new Error('boom')
  await sleep(n);
}

function doRequest(key, n) {
  let p = cache.get(key);
  if (!p) {
    p = maybeSleep(n).finally(() => cache.delete(key));
    cache.set(key, p);
  }
  return p;
}

doRequest('foo', 200)
  .then(() => console.log('A'))
  .catch((err) => console.log(err.message));

doRequest('foo', 100)
  .then(() => console.log('B'))
  .catch((err) => console.log(err.message));

process.on('exit', () => {
  console.log(cache.size);
});
