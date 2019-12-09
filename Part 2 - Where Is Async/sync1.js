
async function BuildTree() {
  const obj = {};
  for (let n = 0; n < 500; n++) {
    AddSubtree(obj, n);
  }
  return obj;
}


async function AddSubtree(obj, n) {
  const tree = obj[`item${n}`] = {};
  return tree;
}

BuildTree().then(console.log);
