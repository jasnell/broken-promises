const Piscina = require('piscina')
const { writeFile } = require('fs').promises;
const data = require('./a.json')
const pMap = require('p-map')
const { resolve } = require('path')

const piscina = new Piscina({
  fileName: resolve(__dirname, 'activity.js'),
  concurrentTasksPerWorker: 4,
})

async function write(data) {
  await writeFile('a1.json', JSON.stringify(data))
}

pMap(data.items, (i) => piscina.runTask({ i }), { concurrency: 5 }).then(write)
