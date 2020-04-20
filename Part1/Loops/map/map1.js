const { writeFile } = require('fs').promises;
const { loremIpsum } = require('lorem-ipsum')
const data = require('./a.json')

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

Promise.all(data.items.map(async (i) => {
  // Note that this is a purely synchronous operation...
  const ret = loremIpsum({
    count: i,
    paragraphLowerBound: 1,
    paragraphUpperBound: i,
    sentenceLowerBound: 1,
    sentenceUpperBound: i,
    units: 'paragraphs' })
  return ret
})).then(write);

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
