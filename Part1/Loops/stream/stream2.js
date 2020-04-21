const { createReadStream, createWriteStream } = require('fs')
const { pipeline, Transform } = require('stream')
const http = require('http')

let agent;
if (process.argv[3] === 'agent')
  agent = new http.Agent({ keepAlive: true, maxSockets: 10 })

function processItem(i) {
  return new Promise((resolve, rej) => {
    http.get('http://localhost:8000', {
      headers: { num: i }, agent
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
});
