const { createHook } = require('async_hooks')

let counter = 0

const hook = createHook({
  init(id, type) {
    if (type === 'PROMISE') counter++
  }
})

hook.enable()

process.on('exit', () => {
  console.log('Promises created: ', counter)
})
