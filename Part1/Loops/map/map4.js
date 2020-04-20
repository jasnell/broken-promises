const { writeFile } = require('fs').promises;
const data = require('./a.json')
const http = require('http')
const pMap = require('p-map')

const { monitorEventLoopDelay } = require('perf_hooks')
const h = monitorEventLoopDelay()
h.enable()

const start = process.hrtime.bigint()

let done = false
let counter = 0

function a() {
  counter++
  if (!done) setImmediate(a)
}
setImmediate(a)

async function write(data) {
  await writeFile('a1.json', JSON.stringify(data))
  done = true
}

function mapper(i) {
  return new Promise((resolve, rej) => {
    http.get('http://localhost:8000', { headers: { num: i } }, (res) => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => data += chunk)
      res.on('close', () => {
        resolve(data)
      })
      res.on('error', rej)
    })
  })
}

pMap(data.items, mapper, { concurrency: 2 }).then(write)

process.on('exit', () => {
  console.log(
    process.hrtime.bigint() - start,
    h.min,
    h.max,
    h.mean,
    h.percentile(50),
    h.percentile(99),
    counter)
})
