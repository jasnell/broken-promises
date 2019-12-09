let iterations = 0;
const max = 40;

function syncBusy() {
  for (var n = 0; n < 1e9; n++) {}
  return '.';
}

async function doBusy() {
  if (++iterations % max === 0)
    return null;
  return await syncBusy();
}

async function beNaughty() {
  let x = Promise.resolve();
  let chunk;

  while (chunk = await Promise.race([doBusy(), x]))
    process.stdout.write(chunk);
}

beNaughty();
