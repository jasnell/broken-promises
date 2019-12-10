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
