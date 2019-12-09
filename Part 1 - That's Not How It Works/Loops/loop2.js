const { promisify } = require('util');
const sleep = promisify(setTimeout);

var data = Array(100);
for (let n = 0; n < data.length; n++)
  data[n] = n;

async function process() {
  setImmediate(() => console.log('next tick'));
  return await Promise.all(data.map((i) => {
    return new Promise((resolve) => {
      for (let n = 0; n < 1e6; n++) {}
      sleep(1000).then(()=>{
        resolve(-i);
      });
    });
  }));
}

process().then(console.log);
