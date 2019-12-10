const { open, close } = require('fs').promises;

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
