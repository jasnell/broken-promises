var m = 5

var i = setInterval(() => {
  for (var n = 0; n < 1e9; n++) {}
  console.log('test')
  if (--m === 0) clearInterval(i)
}, 500)
