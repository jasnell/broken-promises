
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
