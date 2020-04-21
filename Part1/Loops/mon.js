const { createHook } = require('async_hooks')
const { monitorEventLoopDelay } = require('perf_hooks')

const start = process.hrtime.bigint()

let counter = 0
let maxHeapUsed = 0
let maxHeapTotal = 0
let promiseCount = 0

const hook = createHook({
  init(id, type) {
    if (type === 'PROMISE') promiseCount++
  }
})
hook.enable()

const h = monitorEventLoopDelay()
h.enable()

function a() {
  const mu = process.memoryUsage()
  maxHeapUsed = Math.max(maxHeapUsed, mu.heapUsed)
  maxHeapTotal = Math.max(maxHeapTotal, mu.heapTotal)
  counter++
  setImmediate(a).unref()
}
setImmediate(a).unref()

process.on('exit', () => {
  console.log('runtime,min,max,mean,50th,99th,heapused,heaptotal,promises,ticks')
  console.log(
    `${process.hrtime.bigint() - start},` +
    `${h.min},` +
    `${h.max},` +
    `${h.mean},` +
    `${h.percentile(50)},` +
    `${h.percentile(99)},` +
    `${maxHeapUsed},` +
    `${maxHeapTotal},` +
    `${promiseCount},` +
    `${counter}`)
})
