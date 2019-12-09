
async function BuildTree() {
  const obj = {};
  for (let n = 0; n < 20; n++) {
    AddSubtree(obj, n);
  }
  return obj;
}

async function AddSubtree(obj, n) {
  const tree = obj[`item${n}`] = {};
  if (n > 0)
    AddSubtree(tree, n - 1);
  return tree;
}

BuildTree().then(console.log);
