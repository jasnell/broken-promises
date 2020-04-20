const { writeFile } = require('fs').promises
const { promisify } = require('util')
const randomFill = promisify(require('crypto').randomFill)

const count = parseInt(process.argv[2]) || 10
console.log('Generating ', count)

const buf = Buffer.allocUnsafe(count)

async function processItems() {
  await randomFill(buf)
}

async function write(data) {
  return writeFile('a.bin', buf)
}

processItems().then(write)
