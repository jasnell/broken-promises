const Piscina = require('piscina')
const { writeFile } = require('fs').promises;
const data = require('./a.json')
const { resolve } = require('path')

let agent = process.argv[3] === 'agent'

const piscina = new Piscina({
  fileName: resolve(__dirname, 'activity.js'),
  concurrentTasksPerWorker: 2,
})

async function write(data) {
  await writeFile('a1.json', JSON.stringify(data))
}

Promise.all(data.items.map(async (i) => piscina.runTask({ i, agent }))).then(write)
