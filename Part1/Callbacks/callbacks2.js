// What happens when an error occurs within the async callback?
// How do you catch and trap the error?

setTimeout(async () => {
  throw new Error('boom');
}, 100);

