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

process.on('exit', () => {
  console.log('File descriptor leaked?', leakedFd);
})
