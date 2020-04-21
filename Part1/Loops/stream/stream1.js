const { createReadStream, createWriteStream } = require('fs')
const { pipeline, Transform } = require('stream')
const http = require('http')

let agent;
if (process.argv[3] === 'agent')
  agent = new http.Agent({ keepAlive: true, maxSockets: 10 })

class MyTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const i = chunk[0];
    http.get('http://localhost:8000', {
        headers: { num: i }, agent
      }, (res) => {
      let data = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => data += chunk)
      res.on('close', () => {
        callback(null, data)
      })
      res.on('error', callback)
    });
  }
}

const file = createReadStream('a.bin', { highWaterMark: 1})
const out = createWriteStream('a.txt')

pipeline(file, new MyTransform(), out, (err) => {
  if (err) throw err
});

