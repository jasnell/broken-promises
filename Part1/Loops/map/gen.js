const { writeFile } = require('fs').promises
const { promisify } = require('util')
const randomFill = promisify(require('crypto').randomFill)

const buf = Buffer.allocUnsafe(100)

async function process() {
  const data = { items: new Array(buf.length) }
  await randomFill(buf)
  for (let n = 0; n < buf.length; n++)
    data.items[n] = buf[n]
  return data
}

async function write(data) {
  return writeFile('a.json', JSON.stringify(data))
}

process().then(write)
