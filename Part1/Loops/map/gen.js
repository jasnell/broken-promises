const { writeFile } = require('fs').promises
const { promisify } = require('util')
const randomFill = promisify(require('crypto').randomFill)

const count = parseInt(process.argv[2]) || 10
console.log('Generating ', count)

const buf = Buffer.allocUnsafe(count)

async function processItems() {
  const data = { items: new Array(buf.length) }
  await randomFill(buf)
  for (let n = 0; n < buf.length; n++)
    data.items[n] = buf[n]
  return data
}

async function write(data) {
  return writeFile('a.json', JSON.stringify(data))
}

processItems().then(write)
