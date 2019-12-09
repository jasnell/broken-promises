
function toUpper(items) {
  return items.map((i) => i.toUpperCase());
}

function toLower(items) {
  return items.map((i) => i.toLowerCase());
}

function reverse(items) {
  return items.map((i) => [...i].reverse().join(''));
}

function getData() {
  return Promise.resolve(
    reverse(
      toLower(
        toUpper(
          ['tEsT', 'HeLlO', 'wOrLd']))));
}

getData().then(console.log);
