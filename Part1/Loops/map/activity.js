const http = require('http')

module.exports = ({ i }) => {
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
  }).catch(console.log);
}
