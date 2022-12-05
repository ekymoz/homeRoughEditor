function limitObj(equation, size, coords) {
  const Px = coords.x
  const Py = coords.y
  const Aq = equation.A
  const Bq = equation.B
  let pos1, pos2
  if (Aq === 'v') {
    pos1 = { x: Px, y: Py - size / 2 }
    pos2 = { x: Px, y: Py + size / 2 }
  } else if (Aq === 'h') {
    pos1 = { x: Px - size / 2, y: Py }
    pos2 = { x: Px + size / 2, y: Py }
  } else {
    const A = 1 + Aq * Aq
    const B = -2 * Px + 2 * Aq * Bq + -2 * Py * Aq
    const C = Px * Px + Bq * Bq - 2 * Py * Bq + Py * Py - (size * size) / 4 // -N
    const Delta = B * B - 4 * A * C
    const posX1 = (-B - Math.sqrt(Delta)) / (2 * A)
    const posX2 = (-B + Math.sqrt(Delta)) / (2 * A)
    pos1 = { x: posX1, y: Aq * posX1 + Bq }
    pos2 = { x: posX2, y: Aq * posX2 + Bq }
  }
  return [pos1, pos2]
}

function isObjectsEquals(a, b) {
  let isOK = true
  for (const prop in a) {
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

function cursor(tool) {
  switch (tool) {
    case 'grab':
      tool =
        "url('https://wiki.openmrs.org/s/en_GB/7502/b9217199c27dd617c8d51f6186067d7767c5001b/_/images/icons/emoticons/add.png') 8 8, auto"
      break
    case 'scissor':
      tool =
        "url('https://maxcdn.icons8.com/windows10/PNG/64/Hands/hand_scissors-64.png'), auto"
      break
    case 'trash':
      tool =
        "url('https://cdn4.iconfinder.com/data/icons/common-toolbar/36/Cancel-32.png'), auto"
      break
    case 'validation':
      tool =
        "url('https://images.fatguymedia.com/wp-content/uploads/2015/09/check.png'), auto"
      break
    default:
      return
  }

  document.getElementById('lin').style.cursor = tool
}

function fullscreen() {
  // go full-screen
  const i = document.body
  if (i.requestFullscreen) {
    i.requestFullscreen()
  } else if (i.webkitRequestFullscreen) {
    i.webkitRequestFullscreen()
  } else if (i.mozRequestFullScreen) {
    i.mozRequestFullScreen()
  } else if (i.msRequestFullscreen) {
    i.msRequestFullscreen()
  }
}

function outFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

function raz_button() {
  $('#rect_mode').removeClass('btn-success')
  $('#rect_mode').addClass('btn-default')
  $('#select_mode').removeClass('btn-success')
  $('#select_mode').addClass('btn-default')
  $('#line_mode').removeClass('btn-success')
  $('#line_mode').addClass('btn-default')
  $('#partition_mode').removeClass('btn-success')
  $('#partition_mode').addClass('btn-default')
  $('#door_mode').removeClass('btn-success')
  $('#door_mode').addClass('btn-default')
  $('#node_mode').removeClass('btn-success')
  $('#node_mode').addClass('btn-default')
  $('#text_mode').removeClass('btn-success')
  $('#text_mode').addClass('btn-default')
  $('#room_mode').removeClass('btn-success')
  $('#room_mode').addClass('btn-default')
  $('#distance_mode').removeClass('btn-success')
  $('#distance_mode').addClass('btn-default')
  $('#object_mode').removeClass('btn-success')
  $('#object_mode').addClass('btn-default')
  $('#stair_mode').removeClass('btn-success')
  $('#stair_mode').addClass('btn-default')
}

function pushToConstruc(construc, path, fill, stroke, strokeDashArray) {
  construc.push({
    path: path,
    fill: fill,
    stroke: stroke,
    strokeDashArray: strokeDashArray,
  })
}
