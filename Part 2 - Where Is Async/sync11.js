
function toUpper(items) {
  return items.map((i) => i.toUpperCase());
}

function toLower(items) {
  return items.map((i) => i.toLowerCase());
}

function reverse(items) {
  return items.map((i) => [...i].reverse().join(''));
}

async function getData() {
  return await reverse(
    await toLower(
      await toUpper(
        ['tEsT', 'HeLlO', 'wOrLd'])));
}

getData().then(console.log);
