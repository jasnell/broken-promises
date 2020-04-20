const http = require('http')
const { loremIpsum } = require('lorem-ipsum')

const server = http.createServer((req, res) => {
  const num = req.headers['num'] | 0
  res.end(loremIpsum({
    count: num,
    paragraphLowerBound: 1,
    paragraphUpperBound: num,
    sentenceLowerBound: 1,
    sentenceUpperBound: num,
    units: 'paragraphs' }));
})

server.listen(8000, () => console.log('listening'))
