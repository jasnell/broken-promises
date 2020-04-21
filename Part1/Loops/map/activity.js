const http = require('http')

const _agent = new http.Agent({ keepAlive: true, maxSockets: 10 })

module.exports = ({ i, agent}) => {
  return new Promise((resolve, rej) => {
    http.get('http://localhost:8000', { headers: { num: i }, agent : agent ? _agent : undefined }, (res) => {
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
