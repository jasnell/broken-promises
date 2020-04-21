const EventEmitter = require('events');

// When using Race or All, if the underlying async API
// provides a mechanism for cancelation the pending
// operation, then a signaling mechanism like event
// emitter can be used to interject the ability to
// cancel. This, however, can be subject to race
// conditions that are not unlike thread synchronization

function createPromise(monitor, timeout, value) {
  return new Promise((res, rej) => {
    const t = setTimeout(() => {
      res(value);
      monitor.emit('resolved');
    }, timeout);
    monitor.on('resolved', () => {
      clearTimeout(t);
      rej('canceled')
    });
  });
}

function Foo(monitor) {
  return createPromise(monitor, 1000, 'B');
}

function Bar(monitor) {
  return createPromise(monitor, 10, 'A');
}

const monitor = new EventEmitter();

Promise.race([Foo(monitor), Bar(monitor)]).then(console.log);
