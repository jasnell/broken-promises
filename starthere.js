
// When is javascript running?
// (a)
setInterval(() => {
  for (var n = 0; n < 1e9; n++) {}
  console.log('test')
}, 500)
















// Developers Love Async Functions!

// They'll use them everywhere, even where
// they make absolutely no sense!

setImmediate(async () => {
  throw new Error('boom')
 })



















const EventEmitter = require('events')
const e = new EventEmitter()
e.on('something', async () => { })

























const { open, close } = require('fs')
open(__filename, 'r+', async (err, fd) => {

  close(fd, async () => { })

})






















new Promise(async (resolve, reject) => {
  throw new Error()
})

























// Passing Async Functions Where They Are Not Expected
// Is Actively Dangerous as it can lead to memory and
// resource leaks, hidden bugs, and general nastiness.

process.on('unhandledRejection', () => {})

fs.open('file_that_does_not_exist', 'r+', async (err, fd) => {
  if (err) throw err
  close(fd, () => {})
})






















// Another Favorite Passtime for developers is mixing
// callbacks and Promises together
// (callbacks8)

const fs = require('fs');

let leakedFd = false;

fs.open(__filename, 'r+', async (err, fd) => {
  if (err) throw err;
  leakedFd = true;
  functionThatDoesNotExist();
  fs.close(fd, async (err) => {
    if (err) throw err;
    leakedFd = false;
  });
});

process.on('unhandledRejection', (err) => {
  console.log('Error occurred:', err.message);
});







// (callbacks9)
const { open } = require('fs').promises;

var leakedFd = false;

// By avoiding mixing callbacks and Promises, we keep the
// code easier to read, easier to reason about, and easier
// to avoid bugs.

async function openAndClose() {
  let fd;
  try {
    fd = await open(__filename, 'r+');
    leakedFd = true;
    functionThatDoesNotExist();
  } finally {
    if (fd) await fd.close();
    leakedFd = false;
  }
}

openAndClose()
  .catch((err) => console.log('Error occurred:', err.message));

process.on('exit', () => {
  console.log('file descriptor leaked?', leakedFd);
});






// (callbacks11)
const fs = require('fs');

let leakedFd = false;

// Mixing callbacks and Promises with proper error
// handling is just... cumbersome.
function openAndClose() {
  return new Promise((resolve, reject) => {
    fs.open(_filename, 'r+', (err, fd) => {
      if (err) {
        reject(err);
        return;
      }
      leakedFd = true;
      try {
        functionThatDoesNotExist();
        resolve();
      } finally {
        fs.close(fd, (err) => {
          if (err) {
            reject(err);
            return;
          }
          leakedFd = false;
        });
      }
    })
  });
}

openAndClose()
  .catch((err) => console.log('Error occurred:', err.message));

process.on('exit', () => {
  console.log('File descriptor leaked?', leakedFd);
})





// (eventemitter4)
const EventEmitter = require('events');
const { promisify } = require('util');

const foo = new EventEmitter();
const sleep = promisify(setTimeout);

foo.on('something', async () => {
  await sleep(100);
  functionThatDoesNotExist();
})

// Attaching a error handler to the emitter
// does not help.
foo.on('error', console.log);

foo.emit('something');

console.log('A');


















// (eventemitter8)
const EventEmitter = require('events');
const { promisify } = require('util');

const foo = new EventEmitter();
const sleep = promisify(setTimeout);

foo.on('something', async () => {
  await sleep(100);
  // You can catch and forward the error to the
  // event emitter yourself...
  try {
    functionThatDoesNotExist();
  } catch (err) {
    // Escape the Promise error handling trap!
    process.nextTick(() => foo.emit('error', err));
  }
})

// But what happens if the error handler
// throws an error?
foo.on('error', (err) => {
  throw new Error('boom');
});

foo.emit('something');

console.log('A');






// eventemitter9
const EventEmitter = require('events');
const { promisify } = require('util');

// Coming soon to a Node.js release... captureRejections
// makes EventEmitter expect and understand async
// functions.

const foo = new EventEmitter({ captureRejections: true });
const sleep = promisify(setTimeout);

foo.on('something', async () => {
  await sleep(100);
  functionThatDoesNotExist();
})

// Just don't make your error handler async!!
foo.on('error', (err) => {
  throw new Error('boom');
});

foo.emit('something');

console.log('A');









// (promise9)
const { openSync, closeSync } = require('fs');

let leakedFd = false;

function DoSomething() {
  let fd = 0;
  return new Promise(async (resolve) => {
    fd = openSync(__filename, 'r+');
    leakedFd = true;
    functionThatDoesNotExist();
  }).catch(() => {
    closeSync(fd);
    leakedFd = false;
  });
}

DoSomething();

process.on('exit', () => {
  console.log('File descriptor leaked?', leakedFd);
});









// and then and then and then .... (sync8)

async function toUpper(items) {
  return items.map((i) => i.toUpperCase());
}

async function toLower(items) {
  return items.map((i) => i.toLowerCase());
}

async function reverse(items) {
  return items.map((i) => [...i].reverse().join(''));
}

async function getData() {
  return ['tEsT', 'HeLlO', 'wOrLd'];
}

getData()
  .then(toUpper)
  .then(toLower)
  .then(reverse)
  .then(console.log);





// (sync12)

function toUpper(items) {
  return items.map((i) => i.toUpperCase());
}

function toLower(items) {
  return items.map((i) => i.toLowerCase());
}

function reverse(items) {
  return items.map((i) => [...i].reverse().join(''));
}

function getData() {
  return Promise.resolve(
    reverse(
      toLower(
        toUpper(
          ['tEsT', 'HeLlO', 'wOrLd']))));
}

getData().then(console.log);











// (loop4)
const { promisify } = require('util');
const sleep = promisify(setTimeout);

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









// (wtf1)
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



// (wtf2, wtf3)






