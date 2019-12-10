
// It's important to keep in mind that there is no
// way of canceling a Promise...

async function Foo() {
  for (let n = 0; n < 1e9; n++) {}
  console.log('A');
  return 'B';
}

async function Bar() {
  for (let n = 0; n < 1e3; n++) {}
  console.log('C')
  return 'D';
}

Promise.race([Foo(), Bar()]).then(console.log);
