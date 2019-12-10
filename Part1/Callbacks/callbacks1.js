// Developers frequently pass async functions as callbacks.
// The following may look harmless...

setTimeout(async () => {
  console.log('hello world');
}, 100);

