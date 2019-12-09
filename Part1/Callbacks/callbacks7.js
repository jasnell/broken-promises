const fs = require('fs');

let leakedFd;

fs.open(__filename, 'r+', async (err, fd) => {
  if (err) throw err;
  leakedFd = fd;
  throw new Error('boom');
});

process.on('unhandledRejection', console.log);

process.on('exit', () => {
  console.log(leakedFd);
})
