const { promisify } = require('util');
const sleep = promisify(setTimeout);

const cache = new Map();

function doRequest(key, n) {
  let p = cache.get(key);
  if (!p) {
    p = sleep(n).then(() => cache.delete(key));
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
