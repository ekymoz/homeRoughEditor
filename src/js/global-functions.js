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

function cursor(tool) {
  // REVIEW: Comment out for now until I can grab these resources
  // if (tool === 'grab')
  //   tool =
  //     "url('https://wiki.openmrs.org/s/en_GB/7502/b9217199c27dd617c8d51f6186067d7767c5001b/_/images/icons/emoticons/add.png') 8 8, auto"
  // if (tool === 'scissor')
  //   tool =
  //     "url('https://maxcdn.icons8.com/windows10/PNG/64/Hands/hand_scissors-64.png'), auto"
  // if (tool === 'trash')
  //   tool =
  //     "url('https://cdn4.iconfinder.com/data/icons/common-toolbar/36/Cancel-32.png'), auto"
  // if (tool === 'validation')
  //   tool =
  //     "url('https://images.fatguymedia.com/wp-content/uploads/2015/09/check.png'), auto"
  // linElement.css('cursor', tool)
}

function fullscreen() {
  // go full-screen
  let i = document.body
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
