const fs = require('fs');

// A more practical example...

fs.open('file_that_does_not_exist', 'r+', async (err, fd) => {
  if (err) throw err
  close(fd, () => {});
});
