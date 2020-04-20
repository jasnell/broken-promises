const http = require('http')
const { loremIpsum } = require('lorem-ipsum')

const server = http.createServer((req, res) => {
  let num = parseInt(req.headers.num)
  const txt = loremIpsum({ count: num, units: 'words' })
  console.log(txt)
  res.end(txt);
})

server.listen(8000, () => console.log('listening'))
