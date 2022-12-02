document.getElementById('button-new').addEventListener('click', function () {
  const myModal = new bootstrap.Modal($('#myModal'))
  myModal.show()
})

document.addEventListener('fullscreenchange', function () {
  if (
    !document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.mozFullScreenElement &&
    !document.msFullscreenElement
  ) {
    $('#nofull_mode').display = 'none'
    $('#full_mode').show()
  }
})

$(document).on('click', '#lin', function (event) {
  event.preventDefault()
})
