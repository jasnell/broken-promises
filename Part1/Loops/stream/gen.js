const { writeFile } = require('fs').promises
const { promisify } = require('util')
const randomFill = promisify(require('crypto').randomFill)

const buf = Buffer.allocUnsafe(10)

async function process() {
  await randomFill(buf)
}

async function write(data) {
  return writeFile('a.bin', buf)
}

process().then(write)
