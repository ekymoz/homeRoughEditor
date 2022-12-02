function isObjectsEquals(a, b, message = false) {
  if (message) console.log(message)
  let isOK = true
  for (let prop in a) {
    if (a[prop] !== b[prop]) {
      isOK = false
      break
    }
  }
  return isOK
}

function minMoveGrid(mouse, _pox, _poy) {
  return Math.abs(Math.abs(_pox - mouse.x) + Math.abs(_poy - mouse.y))
}
