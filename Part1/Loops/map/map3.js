const Piscina = require('piscina')
const { writeFile } = require('fs').promises;
const data = require('./a.json')
const { resolve } = require('path')

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

const piscina = new Piscina({
  fileName: resolve(__dirname, 'activity.js'),
  concurrentTasksPerWorker: 2,
})

async function foo(i) {
  return piscina.runTask({ i })
}

async function write(data) {
  await writeFile('a1.json', JSON.stringify(data))
  done = true
}

Promise.all(data.items.map(foo)).then(write)

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
    counter);
});
