const { writeFile } = require('fs').promises;
const data = require('./a.json')
const http = require('http')

async function write(data) {
  await writeFile('a1.json', JSON.stringify(data))
}

Promise.all(data.items.map((i) => {
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
})).then(write)
