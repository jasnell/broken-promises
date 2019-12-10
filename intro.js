const promise = new Promise((resolve, reject) => {
  for (let n = 0; n < 1e9; n++) {}

  setTimeout(() => resolve('hello world'), 1000)

  let n = 10
  const i = setInterval(() => {
    resolve(--n)
    console.log(n)
    if (n === 0) throw new Error('foo')
  }, 2000)
});

promise.then(() => console.log('done!'))

promise.then(() => console.log('no, really'))

promise.catch((err) => console.log('oops!'))

promise.finally(() => console.log('fin'))
