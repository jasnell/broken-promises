
async function BuildTree() {
  const obj = {};
  for (let n = 0; n < 20; n++) {
    await AddSubtree(obj, n);
  }
  return obj;
}

async function AddSubtree(obj, n) {
  const tree = obj[`item${n}`] = {};
  if (n > 0)
    await AddSubtree(tree, n - 1);
  return tree;
}

BuildTree().then(console.log);
