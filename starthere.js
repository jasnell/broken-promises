
setImmediate(async () => { })


const EventEmitter = require('events')
const e = new EventEmitter()
e.on('something', async () => { })



new Promise(async (resolve, reject) => { });



const { open, close } = require('fs')
open(__filename, 'r+', async (err, fd) => {

  close(fd, async () => { })

})

