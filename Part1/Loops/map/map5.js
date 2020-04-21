const Piscina = require('piscina')
const { writeFile } = require('fs').promises;
const data = require('./a.json')
const pMap = require('p-map')
const { resolve } = require('path')

let agent = process.argv[3] === 'agent'

const piscina = new Piscina({
  fileName: resolve(__dirname, 'activity.js'),
  concurrentTasksPerWorker: 4,
})

async function write(data) {
  await writeFile('a1.json', JSON.stringify(data))
}

pMap(data.items, (i) => piscina.runTask({ i, agent }), { concurrency: 5 }).then(write)
