const { writeFile } = require('fs').promises;
const { loremIpsum } = require('lorem-ipsum')
const data = require('./a.json')

async function write(data) {
  await writeFile('a1.json', JSON.stringify(data))
}

Promise.all(data.items.map(async (i) => {
  // Note that this is a purely synchronous operation...
  return loremIpsum({ count: i, units: 'words' })
})).then(write);
