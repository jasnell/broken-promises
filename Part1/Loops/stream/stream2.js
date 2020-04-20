const { createReadStream, createWriteStream } = require('fs')
const { pipeline, Transform } = require('stream')
const http = require('http')

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

function processItem(i) {
  return new Promise((resolve, rej) => {
    http.get('http://localhost:8000', {
      headers: { num: i }
    }, (res) => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => data += chunk)
      res.on('close', () => {
        resolve(data)
      })
      res.on('error', rej)
    });
  });
}

class MyTransform extends Transform {
  _transform(chunk, encoding, callback) {
    Promise.all(Array.from(chunk).map(processItem))
           .then((results) => {
             callback(null, results.join('\n') + '\n')
            })
  }
}

const file = createReadStream('a.bin', { highWaterMark: 2 })
const out = createWriteStream('a.txt')

pipeline(file, new MyTransform(), out, (err) => {
  if (err) throw err
  done = true
});

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
