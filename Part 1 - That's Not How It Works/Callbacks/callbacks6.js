const fs = require('fs');

fs.open('file_that_does_not_exist', 'r+', async (err) => {
  if (err) throw err
});
