const { writeFile } = require('fs').promises;
const { loremIpsum } = require('lorem-ipsum')
const data = require('./a.json')

const { monitorEventLoopDelay } = require('perf_hooks')
const h = monitorEventLoopDelay()
h.enable()

const start = process.hrtime.bigint()
let done = false
let counter = 0
let maxHeapUsed = 0;
let maxHeapTotal = 0;


function a() {
  const mu = process.memoryUsage()
  maxHeapUsed = Math.max(maxHeapUsed, mu.heapUsed)
  maxHeapTotal = Math.max(maxHeapTotal, mu.heapTotal)
  counter++
  if (!done) setImmediate(a)
}
setImmediate(a)

async function write(data) {
  await writeFile('a1.json', JSON.stringify(data))
  done = true
}

Promise.all(data.items.map(async (i) => {
  // Note that this is a purely synchronous operation...
  return loremIpsum({ count: i, units: 'words' })
})).then(write);

process.on('exit', () => {
  console.log(
    process.hrtime.bigint() - start,
    h.min,
    h.max,
    h.mean,
    h.percentile(50),
    h.percentile(99),
    maxHeapUsed,
    maxHeapTotal,
    counter)
})
