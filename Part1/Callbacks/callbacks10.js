const fs = require('fs');

let leakedFd = false;

fs.open(__filename, 'r+', async (err, fd) => {
  if (err) throw err;
  leakedFd = true;
  // It's obviously possible to avoid the leak
  // using a try catch, but the code is getting
  // cumbersome and hard to reason about... and,
  // is the async function actually doing anything
  // for you here?
  try {
    functionThatDoesNotExist();
  } finally {
    fs.close(fd, async (err) => {
      // But.. um... what happens if this errors?
      if (err) throw err;
      leakedFd = false;
    });
  }
});

process.on('unhandledRejection', (err) => {
  console.log('Error occurred:', err.message);
});

process.on('exit', () => {
  console.log('File descriptor leaked?', leakedFd);
})
