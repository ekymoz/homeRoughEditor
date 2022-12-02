WALLS = []
OBJDATA = []
ROOM = []
HISTORY = []
wallSize = 20
partitionSize = 8
const visibleLayers = new Set(['walls'])
let activeLayer = 'walls'
let drag = 'off'
let action = 0
let magnetic = 0
let construc = 0
let Rcirclebinder = 8
let mode = 'select_mode'
let modeOption
let linElement = $('#lin')
let taille_w = linElement.width()
let taille_h = linElement.height()
let offset = linElement.offset()
let grid = 20
// showRib = true
let showArea = true
let meter = 60
let grid_snap = 'off'
let colorbackground = '#ffffff'
let colorline = '#fff'
let colorroom = '#f0daaf'
let colorWall = '#666'
let pox = 0
let poy = 0
let segment = 0
let xpath = 0
let ypath = 0
let tactile = false
let width_viewbox = taille_w
let height_viewbox = taille_h
let ratio_viewbox = height_viewbox / width_viewbox
let originX_viewbox = 0
let originY_viewbox = 0
let sizeText = []
let showAllSizeStatus = 0

const MIN_ZOOM = 0
const MAX_ZOOM = 100

// Used to track This is the initial zoom level
let zoom = 50
// The ratio the screen is scaled
let scaleFactor = 1

// const visibleLayerCheckboxes = document.querySelectorAll(
//   '[name="visible_layer"]',
// )








document.getElementById('redo').addEventListener('click', function () {
  if (HISTORY.index < HISTORY.length) {
    load(HISTORY.index)
    HISTORY.index++
    $('#undo').removeClass('disabled')
    if (HISTORY.index === HISTORY.length) {
      $('#redo').addClass('disabled')
    }
  }
})

document.getElementById('undo').addEventListener('click', function () {
  if (HISTORY.index > 0) {
    $('#undo').removeClass('disabled')
    if (HISTORY.index - 1 > 0) {
      HISTORY.index--
      load(HISTORY.index - 1)
      $('#redo').removeClass('disabled')
    }
  }
  if (HISTORY.index === 1) $('#undo').addClass('disabled')
})


document.getElementById('button-new').addEventListener('click', function () {
  const myModal = new bootstrap.Modal($('#myModal'))
  myModal.show()
})

$('svg').each(function () {
  $(this)[0].setAttribute(
    'viewBox',
    originX_viewbox +
      ' ' +
      originY_viewbox +
      ' ' +
      width_viewbox +
      ' ' +
      height_viewbox,
  )
})

// document.getElementById('report_mode').addEventListener("click", function () {
//     if (typeof (globalArea) === "undefined") return false;
//     mode = "report_mode";
//     $('#panel').hide();
//     $('#reportTools').show(200, function () {
//         document.getElementById('reportTotalSurface').innerHTML = "Total surface : <b>" + (globalArea / 3600).toFixed(1) + "</b> m²";
//         $('#reportTotalSurface').show(1000);
//         document.getElementById('reportNumberSurface').innerHTML = "Number of rooms : <b>" + ROOM.length + "</b>";
//         $('#reportNumberSurface').show(1000);
//         let number = 1;
//         let reportRoom = '<div class="row">\n';
//         for (let k in ROOM) {
//             let nameRoom = "Room n°" + number + " <small>(sans nom)</small>";
//             if (ROOM[k].name != "") nameRoom = ROOM[k].name;
//             reportRoom += '<div class="col-md-6"><p>' + nameRoom + '</p></div>\n';
//             reportRoom += '<div class="col-md-6"><p>Surface : <b>' + ((ROOM[k].area) / 3600).toFixed(2) + '</b> m²</p></div>\n';
//             number++;
//         }
//         reportRoom += '</div><hr/>\n';
//         reportRoom += '<div>\n';
//         let switchNumber = 0;
//         let plugNumber = 0;
//         let lampNumber = 0;
//         for (let k in OBJDATA) {
//             if (OBJDATA[k].class === 'energy') {
//                 if (OBJDATA[k].type === 'switch' || OBJDATA[k].type === 'doubleSwitch' || OBJDATA[k].type === 'dimmer') switchNumber++;
//                 if (OBJDATA[k].type === 'plug' || OBJDATA[k].type === 'plug20' || OBJDATA[k].type === 'plug32') plugNumber++;
//                 if (OBJDATA[k].type === 'wallLight' || OBJDATA[k].type === 'roofLight') lampNumber++;
//             }
//         }
//         reportRoom += '<p>Switch number : ' + switchNumber + '</p>';
//         reportRoom += '<p>Electric outlet number : ' + plugNumber + '</p>';
//         reportRoom += '<p>Light point number : ' + lampNumber + '</p>';
//         reportRoom += '</div>';
//         reportRoom += '<div>\n';
//         reportRoom += '<h2>Energy distribution per room</h2>\n';
//         number = 1;
//         reportRoom += '<div class="row">\n';
//         reportRoom += '<div class="col-md-4"><p>Label</p></div>\n';
//         reportRoom += '<div class="col-md-2"><small>Swi.</small></div>\n';
//         reportRoom += '<div class="col-md-2"><small>Elec. out.</small></div>\n';
//         reportRoom += '<div class="col-md-2"><small>Light.</small></div>\n';
//         reportRoom += '<div class="col-md-2"><small>Watts Max</small></div>\n';
//         reportRoom += '</div>';
//
//         let roomEnergy = [];
//         for (let k in ROOM) {
//             reportRoom += '<div class="row">\n';
//             let nameRoom = "Room n°" + number + " <small>(no name)</small>";
//             if (ROOM[k].name != "") nameRoom = ROOM[k].name;
//             reportRoom += '<div class="col-md-4"><p>' + nameRoom + '</p></div>\n';
//             switchNumber = 0;
//             plugNumber = 0;
//             let plug20 = 0;
//             let plug32 = 0;
//             lampNumber = 0;
//             let wattMax = 0;
//             let plug = false;
//             for (let i in OBJDATA) {
//                 if (OBJDATA[i].class === 'energy') {
//                     if (OBJDATA[i].type === 'switch' || OBJDATA[i].type === 'doubleSwitch' || OBJDATA[i].type === 'dimmer') {
//                         if (roomTarget = editor.rayCastingRoom(OBJDATA[i])) {
//                             if (isObjectsEquals(ROOM[k], roomTarget)) switchNumber++;
//                         }
//                     }
//                     if (OBJDATA[i].type === 'plug' || OBJDATA[i].type === 'plug20' || OBJDATA[i].type === 'plug32') {
//                         if (roomTarget = editor.rayCastingRoom(OBJDATA[i])) {
//                             if (isObjectsEquals(ROOM[k], roomTarget)) {
//                                 plugNumber++;
//                                 if (OBJDATA[i].type === 'plug' && !plug) {
//                                     wattMax += 3520;
//                                     plug = true;
//                                 }
//                                 if (OBJDATA[i].type === 'plug20') {
//                                     wattMax += 4400;
//                                     plug20++;
//                                 }
//                                 if (OBJDATA[i].type === 'plug32') {
//                                     wattMax += 7040;
//                                     plug32++;
//                                 }
//                             }
//                         }
//                     }
//                     if (OBJDATA[i].type === 'wallLight' || OBJDATA[i].type === 'roofLight') {
//                         if (roomTarget = editor.rayCastingRoom(OBJDATA[i])) {
//                             if (isObjectsEquals(ROOM[k], roomTarget)) {
//                                 lampNumber++;
//                                 wattMax += 100;
//                             }
//                         }
//                     }
//                 }
//             }
//             roomEnergy.push({
//                 switch: switchNumber,
//                 plug: plugNumber,
//                 plug20: plug20,
//                 plug32: plug32,
//                 light: lampNumber
//             });
//             reportRoom += '<div class="col-md-2"><b>' + switchNumber + '</b></div>\n';
//             reportRoom += '<div class="col-md-2"><b>' + plugNumber + '</b></div>\n';
//             reportRoom += '<div class="col-md-2"><b>' + lampNumber + '</b></div>\n';
//             reportRoom += '<div class="col-md-2"><b>' + wattMax + '</b></div>\n';
//             number++;
//             reportRoom += '</div>';
//         }
//         reportRoom += '<hr/><h2>Standard details NF C 15-100</h2>\n';
//         number = 1;
//
//         for (let k in ROOM) {
//             reportRoom += '<div class="row">\n';
//             let nfc = true;
//             let nameRoom = "Room n°" + number + " <small>(no name)</small>";
//             if (ROOM[k].name != "") nameRoom = ROOM[k].name;
//             reportRoom += '<div class="col-md-4"><p>' + nameRoom + '</p></div>\n';
//             if (ROOM[k].name === "") {
//                 reportRoom +=
//                     '<div class="col-md-8"><p><i class="fa fa-ban" aria-hidden="true" style="color:red"></i> The room has no label, Home Rough Editor cannot provide you with information.</p></div>\n';
//             } else {
//                 if (ROOM[k].name === "Salon") {
//                     for (let g in ROOM) {
//                         if (ROOM[g].name === "Salle à manger") {
//                             roomEnergy[k].light += roomEnergy[g].light;
//                             roomEnergy[k].plug += roomEnergy[g].plug;
//                             roomEnergy[k].switch += roomEnergy[g].switch;
//                         }
//                     }
//                     reportRoom += '<div class="col-md-8">';
//                     if (roomEnergy[k].light === 0) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>1 controlled light point</b> <small>(actually ' +
//                             roomEnergy[k].light + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (roomEnergy[k].plug < 5) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>5 power outlets</b> <small>(actually ' +
//                             roomEnergy[k].plug + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (nfc) reportRoom += '<i class="fa fa-check" aria-hidden="true" style="color:green"></i>';
//                     reportRoom += '</div>';
//                 }
//                 if (ROOM[k].name === "Salle à manger") {
//                     reportRoom +=
//                         '<div class="col-md-8"><p><i class="fa fa-info" aria-hidden="true" style="color:blue"></i> This room is linked to the <b>living room / living room</b> according to the standard.</p></div>\n';
//                 }
//                 if (ROOM[k].name.substr(0, 7) === "Chambre") {
//                     reportRoom += '<div class="col-md-8">';
//                     if (roomEnergy[k].light === 0) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>1 controlled light point</b> <small>(actually ' +
//                             roomEnergy[k].light + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (roomEnergy[k].plug < 3) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>3 power outlets</b> <small>(actually ' +
//                             roomEnergy[k].plug + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (nfc) reportRoom += '<i class="fa fa-check" aria-hidden="true" style="color:green"></i>';
//                     reportRoom += '</div>';
//                 }
//                 if (ROOM[k].name === "SdB") {
//                     reportRoom += '<div class="col-md-8">';
//                     if (roomEnergy[k].light === 0) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>1 light point</b> <small>(actually ' +
//                             roomEnergy[k].light + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (roomEnergy[k].plug < 2) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>2 power outlets</b> <small>(actually ' +
//                             roomEnergy[k].plug + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (roomEnergy[k].switch === 0) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>1 switch</b> <small>(actually ' +
//                             roomEnergy[k].switch + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (nfc) reportRoom += '<i class="fa fa-check" aria-hidden="true" style="color:green"></i>';
//                     reportRoom += '</div>';
//                 }
//                 if (ROOM[k].name === "Couloir") {
//                     reportRoom += '<div class="col-md-8">';
//                     if (roomEnergy[k].light === 0) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>1 controlled light point</b> <small>(actually ' +
//                             roomEnergy[k].light + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (roomEnergy[k].plug < 1) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>1 power outlet</b> <small>(actually ' +
//                             roomEnergy[k].plug + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (nfc) reportRoom += '<i class="fa fa-check" aria-hidden="true" style="color:green"></i>';
//                     reportRoom += '</div>';
//                 }
//                 if (ROOM[k].name === "Toilette") {
//                     reportRoom += '<div class="col-md-8">';
//                     if (roomEnergy[k].light === 0) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>1 light point</b>. <small>(actually ' +
//                             roomEnergy[k].light + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (nfc) reportRoom += '<i class="fa fa-check" aria-hidden="true" style="color:green"></i>';
//                     reportRoom += '</div>';
//                 }
//                 if (ROOM[k].name === "Cuisine") {
//                     reportRoom += '<div class="col-md-8">';
//                     if (roomEnergy[k].light === 0) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>1 controlled light point</b> <small>(actually ' +
//                             roomEnergy[k].light + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (roomEnergy[k].plug < 6) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>6 power outlets</b> <small>(actually ' +
//                             roomEnergy[k].plug + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (roomEnergy[k].plug32 === 0) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>1 32A power outlet</b> <small>(actually ' +
//                             roomEnergy[k].plug32 + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (roomEnergy[k].plug20 < 2) {
//                         reportRoom +=
//                             '<p><i class="fa fa-exclamation-triangle" style="color:orange" aria-hidden="true"></i> This room must have at least <b>2 20A power outlets</b> <small>(actually ' +
//                             roomEnergy[k].plug20 + ')</small>.</p>\n';
//                         nfc = false;
//                     }
//                     if (nfc) reportRoom += '<i class="fa fa-check" aria-hidden="true" style="color:green"></i>';
//                     reportRoom += '</div>';
//                 }
//             }
//             number++;
//             reportRoom += '</div>';
//         }
//
//         document.getElementById('reportRooms').innerHTML = reportRoom;
//         $('#reportRooms').show(1000);
//     });
//
//
// });

document.getElementById('wallWidth').addEventListener('input', function () {
  let sliderValue = this.value
  binder.wall.thick = sliderValue
  binder.wall.type = 'normal'
  editor.architect(WALLS)
  let objWall = editor.objFromWall(binder.wall) // LIST OBJ ON EDGE
  for (let w = 0; w < objWall.length; w++) {
    objWall[w].thick = sliderValue
    objWall[w].update()
  }
  rib()
  document.getElementById('wallWidthVal').textContent = sliderValue
})

document.getElementById('bboxTrash').addEventListener('click', function () {
  binder.obj.graph.remove()
  binder.graph.remove()
  OBJDATA.splice(OBJDATA.indexOf(binder.obj), 1)
  $('#objBoundingBox').hide(100)
  $('#panel').show(200)
  fonc_button('select_mode')
  $('#boxinfo').html('Deleted object')
  delete binder
  rib()
})

document.getElementById('bboxStepsAdd').addEventListener('click', function () {
  let newValue = document.getElementById('bboxStepsVal').textContent
  if (newValue < 15) {
    newValue++
    binder.obj.value = newValue
    binder.obj.update()
    document.getElementById('bboxStepsVal').textContent = newValue
  }
})

document
  .getElementById('bboxStepsMinus')
  .addEventListener('click', function () {
    let newValue = document.getElementById('bboxStepsVal').textContent
    if (newValue > 2) {
      newValue--
      binder.obj.value = newValue
      binder.obj.update()
      document.getElementById('bboxStepsVal').textContent = newValue
    }
  })

document.getElementById('bboxWidth').addEventListener('input', function () {
  let sliderValue = this.value
  let objTarget = binder.obj
  objTarget.size = (sliderValue / 100) * meter
  objTarget.update()
  binder.size = (sliderValue / 100) * meter
  binder.update()
  document.getElementById('bboxWidthVal').textContent = sliderValue
})

document.getElementById('bboxHeight').addEventListener('input', function () {
  let sliderValue = this.value
  let objTarget = binder.obj
  objTarget.thick = (sliderValue / 100) * meter
  objTarget.update()
  binder.thick = (sliderValue / 100) * meter
  binder.update()
  document.getElementById('bboxHeightVal').textContent = sliderValue
})

document.getElementById('bboxRotation').addEventListener('input', function () {
  let sliderValue = this.value
  let objTarget = binder.obj
  objTarget.angle = sliderValue
  objTarget.update()
  binder.angle = sliderValue
  binder.update()
  document.getElementById('bboxRotationVal').textContent = sliderValue
})

document
  .getElementById('doorWindowWidth')
  .addEventListener('input', function () {
    let sliderValue = this.value
    let objTarget = binder.obj
    let wallBind = editor.rayCastingWalls(objTarget, WALLS)
    if (wallBind.length > 1) {
      wallBind = wallBind[wallBind.length - 1]
    }
    let limits = limitObj(wallBind.equations.base, sliderValue, objTarget)
    if (
      qSVG.btwn(limits[1].x, wallBind.start.x, wallBind.end.x) &&
      qSVG.btwn(limits[1].y, wallBind.start.y, wallBind.end.y) &&
      qSVG.btwn(limits[0].x, wallBind.start.x, wallBind.end.x) &&
      qSVG.btwn(limits[0].y, wallBind.start.y, wallBind.end.y)
    ) {
      objTarget.size = sliderValue
      objTarget.limit = limits
      objTarget.update()
      binder.size = sliderValue
      binder.limit = limits
      binder.update()
      document.getElementById('doorWindowWidthVal').textContent = sliderValue
    }
    inWallRib(wallBind)
  })

document.getElementById('objToolsHinge').addEventListener('click', function () {
  let objTarget = binder.obj
  let hingeStatus = objTarget.hinge // normal - reverse
  if (hingeStatus === 'normal') {
    objTarget.hinge = 'reverse'
  } else objTarget.hinge = 'normal'
  objTarget.update()
})

document.getElementById('sizePolice').addEventListener('input', function () {
  document.getElementById('labelBox').style.fontSize = this.value + 'px'
})

$('#textToLayer').on('hidden.bs.modal', function (e) {
  fonc_button('select_mode')
  action = 0
  let textToMake = document.getElementById('labelBox').textContent
  if (textToMake != '' && textToMake != 'Your text') {
    binder = new editor.obj2D(
      'free',
      'text',
      document.getElementById('labelBox').style.color,
      snap,
      0,
      0,
      0,
      'normal',
      0,
      {
        text: textToMake,
        size: document.getElementById('sizePolice').value,
      },
    )
    binder.update()
    OBJDATA.push(binder)
    binder.graph.remove()
    $('#boxText').append(OBJDATA[OBJDATA.length - 1].graph)
    OBJDATA[OBJDATA.length - 1].update()
    delete binder
    $('#boxinfo').html('Added text')
    save()
  } else {
    $('#boxinfo').html('Selection mode')
  }
  document.getElementById('labelBox').textContent = 'Your text'
  document.getElementById('labelBox').style.color = '#333333'
  document.getElementById('labelBox').style.fontSize = '15px'
  document.getElementById('sizePolice').value = 15
})

document.getElementById('lin').addEventListener('wheel', (event) => {
  event.preventDefault()
  if (event.deltaY > 0) {
    zoom_maker('zoomout', 20)
  } else {
    zoom_maker('zoomin', 20)
  }
})

// document.getElementById('showRib').addEventListener('click', function () {
//   if (document.getElementById('showRib').checked) {
//     $('#boxScale').show(200)
//     $('#boxRib').show(200)
//     showRib = true
//   } else {
//     $('#boxScale').hide(100)
//     $('#boxRib').hide(100)
//     showRib = false
//   }
// })

// document.getElementById('showArea').addEventListener('click', function () {
//   if (document.getElementById('showArea').checked) {
//     $('#boxArea').show(200)
//   } else {
//     $('#boxArea').hide(100)
//   }
// })

// document.getElementById('showLayerRoom').addEventListener('click', function () {
//   if (document.getElementById('showLayerRoom').checked) {
//     $('#boxRoom').show(200)
//   } else {
//     $('#boxRoom').hide(100)
//   }
// })

// document
//   .getElementById('showLayerEnergy')
//   .addEventListener('click', function () {
//     if (document.getElementById('showLayerEnergy').checked) {
//       $('#boxEnergy').show(200)
//     } else {
//       $('#boxEnergy').hide(100)
//     }
//   })

// document.getElementById("showLayerFurniture").addEventListener("click", function () {
//   if (document.getElementById("showLayerFurniture").checked) {
//     $('#boxFurniture').show(200);
//   }
//   else {
//     $('#boxFurniture').hide(100);
//   }
// });

document.getElementById('applySurface').addEventListener('click', function () {
  $('#roomTools').hide(100)
  $('#panel').show(200)
  binder.remove()
  delete binder
  let id = $('#roomIndex').val()
  //COLOR
  let data = $('#roomBackground').val()
  ROOM[id].color = data
  //ROOM NAME
  let roomName = $('#roomName').val()
  if (roomName === 'None') {
    roomName = ''
  }
  ROOM[id].name = roomName
  //ROOM SURFACE
  let area = $('#roomSurface').val()
  ROOM[id].surface = area
  //SHOW SURFACE
  let show = document.querySelector('#seeArea').checked
  ROOM[id].showSurface = show
  //ACTION PARAM
  let action = document.querySelector('input[type=radio]:checked').value
  ROOM[id].action = action
  if (action === 'sub') {
    ROOM[id].color = 'hatch'
  }
  if (action != 'sub' && data === 'hatch') {
    ROOM[id].color = 'gradientNeutral'
  }
  $('#boxRoom').empty()
  $('#boxSurface').empty()
  editor.roomMaker(Rooms)
  $('#boxinfo').html('Updated room')
  fonc_button('select_mode')
})

document
  .getElementById('resetRoomTools')
  .addEventListener('click', function () {
    $('#roomTools').hide(100)
    $('#panel').show(200)
    binder.remove()
    delete binder
    $('#boxinfo').html('Updated room')
    fonc_button('select_mode')
  })

document.getElementById('wallTrash').addEventListener('click', function () {
  let wall = binder.wall
  for (let k in WALLS) {
    if (isObjectsEquals(WALLS[k].child, wall)) WALLS[k].child = null
    if (isObjectsEquals(WALLS[k].parent, wall)) {
      WALLS[k].parent = null
    }
  }
  WALLS.splice(WALLS.indexOf(wall), 1)
  $('#wallTools').hide(100)
  wall.graph.remove()
  binder.graph.remove()
  editor.architect(WALLS)
  rib()
  mode = 'select_mode'
  $('#panel').show(200)
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

$('#distance_mode').click(function () {
  linElement.css('cursor', 'crosshair')
  $('#boxinfo').html('Add a measurement')
  fonc_button('distance_mode')
})

$('#room_mode').click(function () {
  linElement.css('cursor', 'pointer')
  $('#boxinfo').html('Config. of rooms')
  fonc_button('room_mode')
})

$('#select_mode').click(function () {
  $('#boxinfo').html('Mode "select"')
  if (typeof binder != 'undefined') {
    binder.remove()
    delete binder
  }

  fonc_button('select_mode')
})

$('#line_mode').click(function () {
  linElement.css('cursor', 'crosshair')
  $('#boxinfo').html('Creation of wall(s)')
  multi = 0
  action = 0
  // snap = calcul_snap(event, grid_snap);
  //
  // pox = snap.x;
  // poy = snap.y;
  fonc_button('line_mode')
})

$('#partition_mode').click(function () {
  linElement.css('cursor', 'crosshair')
  $('#boxinfo').html('Creation of thin wall(s)')
  multi = 0
  fonc_button('partition_mode')
})

$('#rect_mode').click(function () {
  linElement.css('cursor', 'crosshair')
  $('#boxinfo').html('Room(s) creation')
  fonc_button('rect_mode')
})

$('.door').click(function () {
  linElement.css('cursor', 'crosshair')
  $('#boxinfo').html('Add a door')
  $('#door_list').hide(200)
  fonc_button('door_mode', this.id)
})

$('.electrical').click(function () {
  linElement.css('cursor', 'crosshair')
  $('#boxinfo').html('Add electrical')
  $('#electrical_list').hide(200)
  fonc_button('electrical_mode', this.id)
})

$('.network').click(function () {
  linElement.css('cursor', 'crosshair')
  $('#boxinfo').html('Add network')
  $('#network_list').hide(200)
  fonc_button('network_mode', this.id)
})

$('.window').click(function () {
  linElement.css('cursor', 'crosshair')
  $('#boxinfo').html('Add a window')
  $('#door_list').hide(200)
  $('#window_list').hide(200)
  fonc_button('door_mode', this.id)
})

$('.object').click(function () {
  cursor('move')
  $('#boxinfo').html('Add an object')
  fonc_button('object_mode', this.id)
})

$('#stair_mode').click(function () {
  cursor('move')
  $('#boxinfo').html('Add stair')
  fonc_button('object_mode', 'simpleStair')
})

$('#node_mode').click(function () {
  $('#boxinfo').html(
    'Cut a wall<br/><span style="font-size:0.7em">Warning : Cutting the wall of a room can cancel its ' +
      'configuration</span>',
  )
  fonc_button('node_mode')
})

$('#text_mode').click(function () {
  $('#boxinfo').html(
    'Add text<br/><span style="font-size:0.7em">Place the cursor to the desired location, then ' +
      'type your text.</span>',
  )
  fonc_button('text_mode')
})

$('#grid_mode').click(function () {
  if (grid_snap === 'on') {
    grid_snap = 'off'
    $('#boxinfo').html('Help grid off')
    $('#grid_mode').removeClass('btn-success')
    $('#grid_mode').addClass('btn-warning')
    $('#grid_mode').html('GRID OFF')
    $('#boxgrid').css('opacity', '0.5')
  } else {
    grid_snap = 'on'
    $('#boxinfo').html('Help grid on')
    $('#grid_mode').removeClass('btn-warning')
    $('#grid_mode').addClass('btn-success')
    $('#grid_mode').html('GRID ON <i class="fa fa-th" aria-hidden="true"></i>')
    $('#boxgrid').css('opacity', '1')
  }
})

// Window Event Listeners
window.addEventListener('resize', function (event) {
  width_viewbox = $('#lin').width()
  height_viewbox = $('#lin').height()
  document
    .querySelector('#lin')
    .setAttribute(
      'viewBox',
      originX_viewbox +
        ' ' +
        originY_viewbox +
        ' ' +
        width_viewbox +
        ' ' +
        height_viewbox,
    )
})

window.addEventListener('load', function () {
  if (localStorage.getItem('history')) {
    let historyTemp = JSON.parse(localStorage.getItem('history'))
    load(historyTemp.length - 1, 'boot')
    save('boot')
  }
})

document.addEventListener('keydown', function (event) {
  if (mode === 'text_mode') {
    return
  }

  switch (event.keyCode) {
    case 37:  // left arrow
      zoom_maker('zoomleft', 100, 30)
      break;
    case 38:  // up arrow
      zoom_maker('zoomtop', 100, 30)
      break;
    case 39:  // right arrow
      zoom_maker('zoomright', 100, 30)
      break;
    case 40:  // down arrow
      zoom_maker('zoombottom', 100, 30)
      break;
    case 107: // +
      zoom_maker('zoomin', 20, 50)
      break;
    case 109: // -
      zoom_maker('zoomout', 20, 50)
      break;
  }
})

document.querySelector('#lin').addEventListener('mousedown', mouseDownHandler, true)
document.querySelector('#lin').addEventListener(
  'mousemove',
  throttle(function (event) {
    mouseMoveHandler(event)
  }, 30),
)
document.querySelector('#lin').addEventListener('mouseup', mouseUpHandler)

$(document).on('click', '#lin', function (event) {
  event.preventDefault()
})

// for (let checkbox of visibleLayerCheckboxes) {
//   checkbox.addEventListener('click', function (event) {
//     const layer = event.currentTarget.value
//     if (visibleLayers.has(layer)) {
//       visibleLayers.delete(layer)
//     } else {
//       visibleLayers.add(layer)
//     }
//   })
// }

// REVIEW: What does this do?
document
  .querySelector('#panel')
  .addEventListener('mousemove', function (event) {
    if ((mode == 'line_mode' || mode == 'partition_mode') && action == 1) {
      action = 0
      if (typeof binder != 'undefined') {
        binder.remove()
        delete binder
      }
      $('#linetemp').remove()
      $('#line_construc').remove()
      lengthTemp.remove()
      delete lengthTemp
    }
  })







function initHistory(boot = false) {
  HISTORY.index = 0
  if (!boot && localStorage.getItem('history')) {
    localStorage.removeItem('history')
  }

  if (localStorage.getItem('history') && boot === 'recovery') {
    let historyTemp = JSON.parse(localStorage.getItem('history'))
    load(historyTemp.length - 1, 'boot')
    save('boot')
  }

  if (boot === 'newSquare') {
    if (localStorage.getItem('history')) localStorage.removeItem('history')
    HISTORY.push({
      objData: [],
      wallData: [
        {
          thick: 20,
          start: { x: 540, y: 194 },
          end: { x: 540, y: 734 },
          type: 'normal',
          parent: 3,
          child: 1,
          angle: 1.5707963267948966,
          equations: {
            up: { A: 'v', B: 550 },
            down: { A: 'v', B: 530 },
            base: { A: 'v', B: 540 },
          },
          coords: [
            { x: 550, y: 204 },
            { x: 530, y: 184 },
            { x: 530, y: 744 },
            { x: 550, y: 724 },
          ],
          graph: { 0: {}, context: {}, length: 1 },
        },
        {
          thick: 20,
          start: { x: 540, y: 734 },
          end: { x: 1080, y: 734 },
          type: 'normal',
          parent: 0,
          child: 2,
          angle: 0,
          equations: {
            up: { A: 'h', B: 724 },
            down: { A: 'h', B: 744 },
            base: { A: 'h', B: 734 },
          },
          coords: [
            { x: 550, y: 724 },
            { x: 530, y: 744 },
            { x: 1090, y: 744 },
            { x: 1070, y: 724 },
          ],
          graph: { 0: {}, context: {}, length: 1 },
        },
        {
          thick: 20,
          start: { x: 1080, y: 734 },
          end: { x: 1080, y: 194 },
          type: 'normal',
          parent: 1,
          child: 3,
          angle: -1.5707963267948966,
          equations: {
            up: { A: 'v', B: 1070 },
            down: { A: 'v', B: 1090 },
            base: { A: 'v', B: 1080 },
          },
          coords: [
            { x: 1070, y: 724 },
            { x: 1090, y: 744 },
            { x: 1090, y: 184 },
            { x: 1070, y: 204 },
          ],
          graph: { 0: {}, context: {}, length: 1 },
        },
        {
          thick: 20,
          start: { x: 1080, y: 194 },
          end: { x: 540, y: 194 },
          type: 'normal',
          parent: 2,
          child: 0,
          angle: 3.141592653589793,
          equations: {
            up: { A: 'h', B: 204 },
            down: { A: 'h', B: 184 },
            base: { A: 'h', B: 194 },
          },
          coords: [
            { x: 1070, y: 204 },
            { x: 1090, y: 184 },
            { x: 530, y: 184 },
            { x: 550, y: 204 },
          ],
          graph: { 0: {}, context: {}, length: 1 },
        },
      ],
      roomData: [
        {
          coords: [
            { x: 540, y: 734 },
            { x: 1080, y: 734 },
            { x: 1080, y: 194 },
            {
              x: 540,
              y: 194,
            },
            { x: 540, y: 734 },
          ],
          coordsOutside: [
            { x: 1090, y: 744 },
            { x: 1090, y: 184 },
            { x: 530, y: 184 },
            {
              x: 530,
              y: 744,
            },
            { x: 1090, y: 744 },
          ],
          coordsInside: [
            { x: 1070, y: 724 },
            { x: 1070, y: 204 },
            { x: 550, y: 204 },
            {
              x: 550,
              y: 724,
            },
            { x: 1070, y: 724 },
          ],
          inside: [],
          way: ['0', '2', '3', '1', '0'],
          area: 270400,
          surface: '',
          name: '',
          color: 'gradientWhite',
          showSurface: true,
          action: 'add',
        },
      ],
    })
    HISTORY[0] = JSON.stringify(HISTORY[0])
    localStorage.setItem('history', JSON.stringify(HISTORY))
    load(0)
    save()
  }

  if (boot === 'newL') {
    if (localStorage.getItem('history')) localStorage.removeItem('history')
    HISTORY.push({
      objData: [],
      wallData: [
        {
          thick: 20,
          start: { x: 447, y: 458 },
          end: { x: 447, y: 744 },
          type: 'normal',
          parent: 5,
          child: 1,
          angle: 1.5707963267948966,
          equations: {
            up: { A: 'v', B: 457 },
            down: { A: 'v', B: 437 },
            base: { A: 'v', B: 447 },
          },
          coords: [
            { x: 457, y: 468 },
            { x: 437, y: 448 },
            { x: 437, y: 754 },
            { x: 457, y: 734 },
          ],
          graph: { 0: {}, context: {}, length: 1 },
        },
        {
          thick: 20,
          start: { x: 447, y: 744 },
          end: { x: 1347, y: 744 },
          type: 'normal',
          parent: 0,
          child: 2,
          angle: 0,
          equations: {
            up: { A: 'h', B: 734 },
            down: { A: 'h', B: 754 },
            base: { A: 'h', B: 744 },
          },
          coords: [
            { x: 457, y: 734 },
            { x: 437, y: 754 },
            { x: 1357, y: 754 },
            { x: 1337, y: 734 },
          ],
          graph: { 0: {}, context: {}, length: 1 },
        },
        {
          thick: 20,
          start: { x: 1347, y: 744 },
          end: { x: 1347, y: 144 },
          type: 'normal',
          parent: 1,
          child: 3,
          angle: -1.5707963267948966,
          equations: {
            up: { A: 'v', B: 1337 },
            down: { A: 'v', B: 1357 },
            base: { A: 'v', B: 1347 },
          },
          coords: [
            { x: 1337, y: 734 },
            { x: 1357, y: 754 },
            { x: 1357, y: 134 },
            { x: 1337, y: 154 },
          ],
          graph: { 0: {}, context: {}, length: 1 },
        },
        {
          thick: 20,
          start: { x: 1347, y: 144 },
          end: { x: 1020, y: 144 },
          type: 'normal',
          parent: 2,
          child: 4,
          angle: 3.141592653589793,
          equations: {
            up: { A: 'h', B: 154 },
            down: { A: 'h', B: 134 },
            base: { A: 'h', B: 144 },
          },
          coords: [
            { x: 1337, y: 154 },
            { x: 1357, y: 134 },
            { x: 1010, y: 134 },
            { x: 1030, y: 154 },
          ],
          graph: { 0: {}, context: {}, length: 1 },
        },
        {
          thick: 20,
          start: { x: 1020, y: 144 },
          end: { x: 1020, y: 458 },
          type: 'normal',
          parent: 3,
          child: 5,
          angle: 1.5707963267948966,
          equations: {
            up: { A: 'v', B: 1030 },
            down: { A: 'v', B: 1010 },
            base: { A: 'v', B: 1020 },
          },
          coords: [
            { x: 1030, y: 154 },
            { x: 1010, y: 134 },
            { x: 1010, y: 448 },
            { x: 1030, y: 468 },
          ],
          graph: { 0: {}, context: {}, length: 1 },
        },
        {
          thick: 20,
          start: { x: 1020, y: 458 },
          end: { x: 447, y: 458 },
          type: 'normal',
          parent: 4,
          child: 0,
          angle: 3.141592653589793,
          equations: {
            up: { A: 'h', B: 468 },
            down: { A: 'h', B: 448 },
            base: { A: 'h', B: 458 },
          },
          coords: [
            { x: 1030, y: 468 },
            { x: 1010, y: 448 },
            { x: 437, y: 448 },
            { x: 457, y: 468 },
          ],
          graph: { 0: {}, context: {}, length: 1 },
        },
      ],
      roomData: [
        {
          coords: [
            { x: 447, y: 744 },
            { x: 1347, y: 744 },
            { x: 1347, y: 144 },
            {
              x: 1020,
              y: 144,
            },
            { x: 1020, y: 458 },
            { x: 447, y: 458 },
            { x: 447, y: 744 },
          ],
          coordsOutside: [
            { x: 1357, y: 754 },
            { x: 1357, y: 134 },
            { x: 1010, y: 134 },
            {
              x: 1010,
              y: 448,
            },
            { x: 437, y: 448 },
            { x: 437, y: 754 },
            { x: 1357, y: 754 },
          ],
          coordsInside: [
            { x: 1337, y: 734 },
            { x: 1337, y: 154 },
            { x: 1030, y: 154 },
            {
              x: 1030,
              y: 468,
            },
            { x: 457, y: 468 },
            { x: 457, y: 734 },
            { x: 1337, y: 734 },
          ],
          inside: [],
          way: ['0', '2', '3', '4', '5', '1', '0'],
          area: 330478,
          surface: '',
          name: '',
          color: 'gradientWhite',
          showSurface: true,
          action: 'add',
        },
      ],
    })
    HISTORY[0] = JSON.stringify(HISTORY[0])
    localStorage.setItem('history', JSON.stringify(HISTORY))
    load(0)
    save()
  }
}

function importFloorplan (floorplanJson) {
  for (let k in OBJDATA) {
    OBJDATA[k].graph.remove()
  }

  OBJDATA = []

  for (let k in floorplanJson.objData) {
    let OO = floorplanJson.objData[k]
    // if (OO.family === 'energy') OO.family = 'byObject';
    let obj = new editor.obj2D(
      OO.family,
      OO.class,
      OO.type,
      {
        x: OO.x,
        y: OO.y,
      },
      OO.angle,
      OO.angleSign,
      OO.size,
      (OO.hinge = 'normal'),
      OO.thick,
      OO.value,
    )
    obj.limit = OO.limit
    OBJDATA.push(obj)
    $('#boxcarpentry').append(OBJDATA[OBJDATA.length - 1].graph)
    obj.update()
  }

  WALLS = floorplanJson.wallData

  for (let k in WALLS) {
    if (WALLS[k].child != null) {
      WALLS[k].child = WALLS[WALLS[k].child]
    }
    if (WALLS[k].parent != null) {
      WALLS[k].parent = WALLS[WALLS[k].parent]
    }
  }

  ROOM = floorplanJson.roomData
  editor.architect(WALLS)
  editor.showScaleBox()
  rib()
}

function exportFloorplan () {
  console.log(HISTORY[HISTORY.length - 1])
}

// REVIEW: What is `boot` for?
function save(boot = false) {
  if (boot) {
    localStorage.removeItem('history')
  }

  // REVIEW: What does this mean?
  // FOR CYCLIC OBJ INTO LOCALSTORAGE !!!
  for (let k in WALLS) {
    if (WALLS[k].child != null) {
      WALLS[k].child = WALLS.indexOf(WALLS[k].child)
    }
    if (WALLS[k].parent != null) {
      WALLS[k].parent = WALLS.indexOf(WALLS[k].parent)
    }
  }

  // REVIEW: What is this for?
  if (
    JSON.stringify({ objData: OBJDATA, wallData: WALLS, roomData: ROOM }) ===
    HISTORY[HISTORY.length - 1]
  ) {
    for (let k in WALLS) {
      if (WALLS[k].child != null) {
        WALLS[k].child = WALLS[WALLS[k].child]
      }
      if (WALLS[k].parent != null) {
        WALLS[k].parent = WALLS[WALLS[k].parent]
      }
    }
    return false
  }

  // REVIEW: Why this condition?
  if (HISTORY.index < HISTORY.length) {

    // REVIEW: What is this for?
    HISTORY.splice(HISTORY.index, HISTORY.length - HISTORY.index)

    $('#redo').addClass('disabled')
  }

  // REVIEW: What is this for?
  HISTORY.push(
    JSON.stringify({ objData: OBJDATA, wallData: WALLS, roomData: ROOM }),
  )

  // Record to local storage
  localStorage.setItem('history', JSON.stringify(HISTORY))

  // REVIEW: What is this for?
  HISTORY.index++

  if (HISTORY.index > 1) {
    $('#undo').removeClass('disabled')
  }

  // REVIEW: What is this for?
  for (let k in WALLS) {
    if (WALLS[k].child != null) {
      WALLS[k].child = WALLS[WALLS[k].child]
    }
    if (WALLS[k].parent != null) {
      WALLS[k].parent = WALLS[WALLS[k].parent]
    }
  }

  // REVIEW: Why return true here?
  return true
}

function load(index = HISTORY.index, boot = false) {
  if (HISTORY.length === 0 && !boot) {
    return false
  }

  for (let k in OBJDATA) {
    OBJDATA[k].graph.remove()
  }

  OBJDATA = []
  let historyTemp = []
  historyTemp = JSON.parse(localStorage.getItem('history'))
  historyTemp = JSON.parse(historyTemp[index])

  for (let k in historyTemp.objData) {
    let OO = historyTemp.objData[k]
    // if (OO.family === 'energy') OO.family = 'byObject';
    let obj = new editor.obj2D(
      OO.family,
      OO.class,
      OO.type,
      {
        x: OO.x,
        y: OO.y,
      },
      OO.angle,
      OO.angleSign,
      OO.size,
      (OO.hinge = 'normal'),
      OO.thick,
      OO.value,
    )
    obj.limit = OO.limit
    OBJDATA.push(obj)
    $('#boxcarpentry').append(OBJDATA[OBJDATA.length - 1].graph)
    obj.update()
  }

  WALLS = historyTemp.wallData

  for (let k in WALLS) {
    if (WALLS[k].child != null) {
      WALLS[k].child = WALLS[WALLS[k].child]
    }
    if (WALLS[k].parent != null) {
      WALLS[k].parent = WALLS[WALLS[k].parent]
    }
  }

  ROOM = historyTemp.roomData
  editor.architect(WALLS)
  editor.showScaleBox()
  rib()
}

// if (!Array.prototype.includes) {
//   Object.defineProperty(Array.prototype, 'includes', {
//     value: function (searchElement, fromIndex) {
//       if (this === null) {
//         throw new TypeError('"this" is null or not defined')
//       }
//
//       let o = Object(this)
//       let len = o.length >>> 0
//       if (len === 0) {
//         return false
//       }
//       let n = fromIndex | 0
//       let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)
//
//       while (k < len) {
//         if (o[k] === searchElement) {
//           return true
//         }
//         k++
//       }
//       return false
//     },
//   })
// }

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

function throttle(callback, delay) {
  let last
  let timer
  return function () {
    let context = this
    let now = +new Date()
    let args = arguments
    if (last && now < last + delay) {
      // le délai n'est pas écoulé on reset le timer
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        callback.apply(context, args)
      }, delay)
    } else {
      last = now
      callback.apply(context, args)
    }
  }
}







let textEditorColorBtn = document.querySelectorAll('.textEditorColor')
for (let k = 0; k < textEditorColorBtn.length; k++) {
  textEditorColorBtn[k].addEventListener('click', function () {
    document.getElementById('labelBox').style.color = this.style.color
  })
}

let roomColorBtn = document.querySelectorAll('.roomColor')
for (let k = 0; k < roomColorBtn.length; k++) {
  roomColorBtn[k].addEventListener('click', function () {
    let data = this.getAttribute('data-type')
    $('#roomBackground').val(data)
    binder.attr({ fill: 'url(#' + data + ')' })
  })
}

let objTrashBtn = document.querySelectorAll('.objTrash')
for (let k = 0; k < objTrashBtn.length; k++) {
  objTrashBtn[k].addEventListener('click', function () {
    $('#objTools').hide('100')
    let obj = binder.obj
    obj.graph.remove()
    OBJDATA.splice(OBJDATA.indexOf(obj), 1)
    fonc_button('select_mode')
    $('#boxinfo').html('Selection mode')
    $('#panel').show('200')
    binder.graph.remove()
    delete binder
    rib()
    $('#panel').show('300')
  })
}

let dropdownMenu = document.querySelectorAll('.dropdown-menu li a')
for (let k = 0; k < dropdownMenu.length; k++) {
  dropdownMenu[k].addEventListener('click', function () {
    let selText = this.textContent
    $(this)
      .parents('.btn-group')
      .find('.dropdown-toggle')
      .html(selText + ' <span class="caret"></span>')
    if (selText != 'None') $('#roomName').val(selText)
    else $('#roomName').val('')
  })
}

// TRY MATRIX CALC FOR BBOX REAL COORDS WITH TRAS + ROT.
function matrixCalc(el, message = false) {
  if (message) console.log('matrixCalc called by -> ' + message)
  let m = el.getCTM()
  let bb = el.getBBox()
  let tpts = [
    matrixXY(m, bb.x, bb.y),
    matrixXY(m, bb.x + bb.width, bb.y),
    matrixXY(m, bb.x + bb.width, bb.y + bb.height),
    matrixXY(m, bb.x, bb.y + bb.height),
  ]
  return tpts
}

function matrixXY(m, x, y) {
  return { x: x * m.a + y * m.c + m.e, y: x * m.b + y * m.d + m.f }
}

function realBboxShow(coords) {
  for (let k in coords) {
    debugPoint(coords[k])
  }
}

function limitObj(equation, size, coords, message = false) {
  if (message) {
    console.log(message)
  }
  let Px = coords.x
  let Py = coords.y
  let Aq = equation.A
  let Bq = equation.B
  let pos1, pos2
  if (Aq === 'v') {
    pos1 = { x: Px, y: Py - size / 2 }
    pos2 = { x: Px, y: Py + size / 2 }
  } else if (Aq === 'h') {
    pos1 = { x: Px - size / 2, y: Py }
    pos2 = { x: Px + size / 2, y: Py }
  } else {
    let A = 1 + Aq * Aq
    let B = -2 * Px + 2 * Aq * Bq + -2 * Py * Aq
    let C = Px * Px + Bq * Bq - 2 * Py * Bq + Py * Py - (size * size) / 4 // -N
    let Delta = B * B - 4 * A * C
    let posX1 = (-B - Math.sqrt(Delta)) / (2 * A)
    let posX2 = (-B + Math.sqrt(Delta)) / (2 * A)
    pos1 = { x: posX1, y: Aq * posX1 + Bq }
    pos2 = { x: posX2, y: Aq * posX2 + Bq }
  }
  return [pos1, pos2]
}

// REVIEW: The name for this function could be made more clear to what it actually does. It does not only handle zoom functionality, as its name might suggest
function zoom_maker(operation, xmove, xview) {
  switch (operation) {
    case 'zoomout':
      if (zoom > MIN_ZOOM) {
        zoom--
        width_viewbox += xmove
        const ratioWidthZoom = taille_w / width_viewbox
        height_viewbox = width_viewbox * ratio_viewbox
        originX_viewbox = originX_viewbox - xmove / 2
        originY_viewbox = originY_viewbox - (xmove / 2) * ratio_viewbox
        scaleFactor = width_viewbox / taille_w
      }
      break;
    case 'zoomin':
      if (zoom < MAX_ZOOM) {
        zoom++
        width_viewbox -= xmove
        const ratioWidthZoom = taille_w / width_viewbox
        height_viewbox = width_viewbox * ratio_viewbox
        originX_viewbox = originX_viewbox + xmove / 2
        originY_viewbox = originY_viewbox + (xmove / 2) * ratio_viewbox
        scaleFactor = width_viewbox / taille_w
      }
      break;
    case 'zoomreset':
      originX_viewbox = 0
      originY_viewbox = 0
      width_viewbox = taille_w
      height_viewbox = taille_h
      scaleFactor = 1
      break;
    case 'zoomright':
      originX_viewbox += xview
      break;
    case 'zoomleft':
      originX_viewbox -= xview
      break;
    case 'zoomtop':
      originY_viewbox -= xview
      break;
    case 'zoombottom':
      originY_viewbox += xview
      break;
    case 'zoomdrag':
      originX_viewbox -= xmove
      originY_viewbox -= xview
      break;
  }

  document.getElementById('lin').setAttribute(
    'viewBox', `${originX_viewbox} ${originY_viewbox} ${width_viewbox} ${height_viewbox}`
  )
}

function calcul_snap(event, state) {
  if (event.touches) {
    let touches = event.changedTouches
    eX = touches[0].pageX
    eY = touches[0].pageY
    tactile = true
  } else {
    eX = event.pageX
    eY = event.pageY
  }
  x_mouse = eX * scaleFactor - offset.left * scaleFactor + originX_viewbox
  y_mouse = eY * scaleFactor - offset.top * scaleFactor + originY_viewbox

  if (state === 'on') {
    x_grid = Math.round(x_mouse / grid) * grid
    y_grid = Math.round(y_mouse / grid) * grid
  }
  if (state === 'off') {
    x_grid = x_mouse
    y_grid = y_mouse
  }
  return {
    x: x_grid,
    y: y_grid,
    xMouse: x_mouse,
    yMouse: y_mouse,
  }
}

function minMoveGrid(mouse) {
  return Math.abs(Math.abs(pox - mouse.x) + Math.abs(poy - mouse.y))
}

function intersectionOff() {
  if (typeof lineIntersectionP != 'undefined') {
    lineIntersectionP.remove()
    delete lineIntersectionP
  }
}

function intersection(snap, range = Infinity, except = ['']) {
  // ORANGE LINES 90° NEAR SEGMENT
  let bestEqPoint = {}
  let equation = {}

  bestEqPoint.distance = range

  if (typeof lineIntersectionP != 'undefined') {
    lineIntersectionP.remove()
    delete lineIntersectionP
  }

  lineIntersectionP = qSVG.create('boxbind', 'path', {
    // ORANGE TEMP LINE FOR ANGLE 0 90 45 -+
    d: '',
    stroke: 'transparent',
    'stroke-width': 0.5,
    'stroke-opacity': '1',
    fill: 'none',
  })

  for (index = 0; index < WALLS.length; index++) {
    if (except.indexOf(WALLS[index]) === -1) {
      let x1 = WALLS[index].start.x
      let y1 = WALLS[index].start.y
      let x2 = WALLS[index].end.x
      let y2 = WALLS[index].end.y

      // EQUATION 90° of segment nf/nf-1 at X2/Y2 Point
      if (Math.abs(y2 - y1) === 0) {
        equation.C = 'v' // C/D equation 90° Coef = -1/E
        equation.D = x1
        equation.E = 'h' // E/F equation Segment
        equation.F = y1
        equation.G = 'v' // G/H equation 90° Coef = -1/E
        equation.H = x2
        equation.I = 'h' // I/J equation Segment
        equation.J = y2
      } else if (Math.abs(x2 - x1) === 0) {
        equation.C = 'h' // C/D equation 90° Coef = -1/E
        equation.D = y1
        equation.E = 'v' // E/F equation Segment
        equation.F = x1
        equation.G = 'h' // G/H equation 90° Coef = -1/E
        equation.H = y2
        equation.I = 'v' // I/J equation Segment
        equation.J = x2
      } else {
        equation.C = (x1 - x2) / (y2 - y1)
        equation.D = y1 - x1 * equation.C
        equation.E = (y2 - y1) / (x2 - x1)
        equation.F = y1 - x1 * equation.E
        equation.G = (x1 - x2) / (y2 - y1)
        equation.H = y2 - x2 * equation.C
        equation.I = (y2 - y1) / (x2 - x1)
        equation.J = y2 - x2 * equation.E
      }
      equation.A = equation.C
      equation.B = equation.D
      eq = qSVG.nearPointOnEquation(equation, snap)
      if (eq.distance < bestEqPoint.distance) {
        setBestEqPoint(
          bestEqPoint,
          eq.distance,
          index,
          eq.x,
          eq.y,
          x1,
          y1,
          x2,
          y2,
          1,
        )
      }
      equation.A = equation.E
      equation.B = equation.F
      eq = qSVG.nearPointOnEquation(equation, snap)
      if (eq.distance < bestEqPoint.distance) {
        setBestEqPoint(
          bestEqPoint,
          eq.distance,
          index,
          eq.x,
          eq.y,
          x1,
          y1,
          x2,
          y2,
          1,
        )
      }
      equation.A = equation.G
      equation.B = equation.H
      eq = qSVG.nearPointOnEquation(equation, snap)
      if (eq.distance < bestEqPoint.distance) {
        setBestEqPoint(
          bestEqPoint,
          eq.distance,
          index,
          eq.x,
          eq.y,
          x1,
          y1,
          x2,
          y2,
          2,
        )
      }
      equation.A = equation.I
      equation.B = equation.J
      eq = qSVG.nearPointOnEquation(equation, snap)
      if (eq.distance < bestEqPoint.distance) {
        setBestEqPoint(
          bestEqPoint,
          eq.distance,
          index,
          eq.x,
          eq.y,
          x1,
          y1,
          x2,
          y2,
          2,
        )
      }
    } // END INDEXOF EXCEPT TEST
  } // END LOOP FOR

  if (bestEqPoint.distance < range) {
    if (bestEqPoint.way === 2) {
      lineIntersectionP.attr({
        // ORANGE TEMP LINE FOR ANGLE 0 90 45 -+
        d:
          'M' +
          bestEqPoint.x1 +
          ',' +
          bestEqPoint.y1 +
          ' L' +
          bestEqPoint.x2 +
          ',' +
          bestEqPoint.y2 +
          ' L' +
          bestEqPoint.x +
          ',' +
          bestEqPoint.y,
        stroke: '#d7ac57',
      })
    } else {
      lineIntersectionP.attr({
        // ORANGE TEMP LINE FOR ANGLE 0 90 45 -+
        d:
          'M' +
          bestEqPoint.x2 +
          ',' +
          bestEqPoint.y2 +
          ' L' +
          bestEqPoint.x1 +
          ',' +
          bestEqPoint.y1 +
          ' L' +
          bestEqPoint.x +
          ',' +
          bestEqPoint.y,
        stroke: '#d7ac57',
      })
    }
    return {
      x: bestEqPoint.x,
      y: bestEqPoint.y,
      wall: WALLS[bestEqPoint.node],
      distance: bestEqPoint.distance,
    }
  } else {
    return false
  }
}

function debugPoint(point, name, color = '#00ff00') {
  qSVG.create('boxDebug', 'circle', {
    cx: point.x,
    cy: point.y,
    r: 7,
    fill: color,
    id: name,
    class: 'visu',
  })
}

function showVertex() {
  for (let i = 0; i < vertex.length; i++) {
    debugPoint(vertex[i], i)
  }
}

function showJunction() {
  for (let i = 0; i < junction.length; i++) {
    debugPoint({ x: junction[i].values[0], y: junction[i].values[1] }, i)
  }
}

function hideAllSize() {
  $('#boxbind').empty()
  sizeText = []
  showAllSizeStatus = 0
}

function allRib() {
  $('#boxRib').empty()
  for (let i in WALLS) {
    inWallRib(WALLS[i], 'all')
  }
}

function inWallRib(wall, option = false) {
  if (!option) $('#boxRib').empty()
  ribMaster = []
  ribMaster.push([])
  ribMaster.push([])
  let inter
  let distance
  let cross
  let angleTextValue = wall.angle * (180 / Math.PI)
  let objWall = editor.objFromWall(wall) // LIST OBJ ON EDGE
  if (objWall.length == 0) return
  ribMaster[0].push({
    wall: wall,
    crossObj: false,
    side: 'up',
    coords: wall.coords[0],
    distance: 0,
  })
  ribMaster[1].push({
    wall: wall,
    crossObj: false,
    side: 'down',
    coords: wall.coords[1],
    distance: 0,
  })
  let objTarget = null
  for (let ob in objWall) {
    objTarget = objWall[ob]
    objTarget.up = [
      qSVG.nearPointOnEquation(wall.equations.up, objTarget.limit[0]),
      qSVG.nearPointOnEquation(wall.equations.up, objTarget.limit[1]),
    ]
    objTarget.down = [
      qSVG.nearPointOnEquation(wall.equations.down, objTarget.limit[0]),
      qSVG.nearPointOnEquation(wall.equations.down, objTarget.limit[1]),
    ]

    distance = qSVG.measure(wall.coords[0], objTarget.up[0]) / meter
    ribMaster[0].push({
      wall: objTarget,
      crossObj: ob,
      side: 'up',
      coords: objTarget.up[0],
      distance: distance.toFixed(2),
    })
    distance = qSVG.measure(wall.coords[0], objTarget.up[1]) / meter
    ribMaster[0].push({
      wall: objTarget,
      crossObj: ob,
      side: 'up',
      coords: objTarget.up[1],
      distance: distance.toFixed(2),
    })
    distance = qSVG.measure(wall.coords[1], objTarget.down[0]) / meter
    ribMaster[1].push({
      wall: objTarget,
      crossObj: ob,
      side: 'down',
      coords: objTarget.down[0],
      distance: distance.toFixed(2),
    })
    distance = qSVG.measure(wall.coords[1], objTarget.down[1]) / meter
    ribMaster[1].push({
      wall: objTarget,
      crossObj: ob,
      side: 'down',
      coords: objTarget.down[1],
      distance: distance.toFixed(2),
    })
  }
  distance = qSVG.measure(wall.coords[0], wall.coords[3]) / meter
  ribMaster[0].push({
    wall: objTarget,
    crossObj: false,
    side: 'up',
    coords: wall.coords[3],
    distance: distance,
  })
  distance = qSVG.measure(wall.coords[1], wall.coords[2]) / meter
  ribMaster[1].push({
    wall: objTarget,
    crossObj: false,
    side: 'down',
    coords: wall.coords[2],
    distance: distance,
  })
  ribMaster[0].sort(function (a, b) {
    return (a.distance - b.distance).toFixed(2)
  })
  ribMaster[1].sort(function (a, b) {
    return (a.distance - b.distance).toFixed(2)
  })
  for (let t in ribMaster) {
    for (let n = 1; n < ribMaster[t].length; n++) {
      let found = true
      let shift = -5
      let valueText = Math.abs(
        ribMaster[t][n - 1].distance - ribMaster[t][n].distance,
      )
      let angleText = angleTextValue
      if (found) {
        if (ribMaster[t][n - 1].side === 'down') {
          shift = -shift + 10
        }
        if (angleText > 89 || angleText < -89) {
          angleText -= 180
          if (ribMaster[t][n - 1].side === 'down') {
            shift = -5
          } else shift = -shift + 10
        }

        sizeText[n] = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text',
        )
        let startText = qSVG.middle(
          ribMaster[t][n - 1].coords.x,
          ribMaster[t][n - 1].coords.y,
          ribMaster[t][n].coords.x,
          ribMaster[t][n].coords.y,
        )
        sizeText[n].setAttributeNS(null, 'x', startText.x)
        sizeText[n].setAttributeNS(null, 'y', startText.y + shift)
        sizeText[n].setAttributeNS(null, 'text-anchor', 'middle')
        sizeText[n].setAttributeNS(null, 'font-family', 'roboto')
        sizeText[n].setAttributeNS(null, 'stroke', '#ffffff')
        sizeText[n].textContent = valueText.toFixed(2)
        if (sizeText[n].textContent < 1) {
          sizeText[n].setAttributeNS(null, 'font-size', '0.8em')
          sizeText[n].textContent = sizeText[n].textContent.substring(
            1,
            sizeText[n].textContent.length,
          )
        } else sizeText[n].setAttributeNS(null, 'font-size', '1em')
        sizeText[n].setAttributeNS(null, 'stroke-width', '0.27px')
        sizeText[n].setAttributeNS(null, 'fill', '#666666')
        sizeText[n].setAttribute(
          'transform',
          'rotate(' + angleText + ' ' + startText.x + ',' + startText.y + ')',
        )

        $('#boxRib').append(sizeText[n])
      }
    }
  }
}

function rib(shift = 5) {
  // return false;
  let ribMaster = []
  ribMaster.push([])
  ribMaster.push([])
  let inter
  let distance
  let cross
  for (let i in WALLS) {
    if (WALLS[i].equations.base) {
      ribMaster[0].push([])
      pushToRibMaster(ribMaster, 0, i, i, i, 'up', WALLS[i].coords[0], 0)
      ribMaster[1].push([])
      pushToRibMaster(ribMaster, 1, i, i, i, 'down', WALLS[i].coords[1], 0)

      for (let p in WALLS) {
        if (i != p && WALLS[p].equations.base) {
          cross = qSVG.intersectionOfEquations(
            WALLS[i].equations.base,
            WALLS[p].equations.base,
            'object',
          )
          if (
            qSVG.btwn(cross.x, WALLS[i].start.x, WALLS[i].end.x, 'round') &&
            qSVG.btwn(cross.y, WALLS[i].start.y, WALLS[i].end.y, 'round')
          ) {
            inter = qSVG.intersectionOfEquations(
              WALLS[i].equations.up,
              WALLS[p].equations.up,
              'object',
            )
            if (
              qSVG.btwn(
                inter.x,
                WALLS[i].coords[0].x,
                WALLS[i].coords[3].x,
                'round',
              ) &&
              qSVG.btwn(
                inter.y,
                WALLS[i].coords[0].y,
                WALLS[i].coords[3].y,
                'round',
              ) &&
              qSVG.btwn(
                inter.x,
                WALLS[p].coords[0].x,
                WALLS[p].coords[3].x,
                'round',
              ) &&
              qSVG.btwn(
                inter.y,
                WALLS[p].coords[0].y,
                WALLS[p].coords[3].y,
                'round',
              )
            ) {
              distance = qSVG.measure(WALLS[i].coords[0], inter) / meter
              pushToRibMaster(
                ribMaster,
                0,
                i,
                i,
                p,
                'up',
                inter,
                distance.toFixed(2),
              )
            }

            inter = qSVG.intersectionOfEquations(
              WALLS[i].equations.up,
              WALLS[p].equations.down,
              'object',
            )
            if (
              qSVG.btwn(
                inter.x,
                WALLS[i].coords[0].x,
                WALLS[i].coords[3].x,
                'round',
              ) &&
              qSVG.btwn(
                inter.y,
                WALLS[i].coords[0].y,
                WALLS[i].coords[3].y,
                'round',
              ) &&
              qSVG.btwn(
                inter.x,
                WALLS[p].coords[1].x,
                WALLS[p].coords[2].x,
                'round',
              ) &&
              qSVG.btwn(
                inter.y,
                WALLS[p].coords[1].y,
                WALLS[p].coords[2].y,
                'round',
              )
            ) {
              distance = qSVG.measure(WALLS[i].coords[0], inter) / meter
              pushToRibMaster(
                ribMaster,
                0,
                i,
                i,
                p,
                'up',
                inter,
                distance.toFixed(2),
              )
            }

            inter = qSVG.intersectionOfEquations(
              WALLS[i].equations.down,
              WALLS[p].equations.up,
              'object',
            )
            if (
              qSVG.btwn(
                inter.x,
                WALLS[i].coords[1].x,
                WALLS[i].coords[2].x,
                'round',
              ) &&
              qSVG.btwn(
                inter.y,
                WALLS[i].coords[1].y,
                WALLS[i].coords[2].y,
                'round',
              ) &&
              qSVG.btwn(
                inter.x,
                WALLS[p].coords[0].x,
                WALLS[p].coords[3].x,
                'round',
              ) &&
              qSVG.btwn(
                inter.y,
                WALLS[p].coords[0].y,
                WALLS[p].coords[3].y,
                'round',
              )
            ) {
              distance = qSVG.measure(WALLS[i].coords[1], inter) / meter
              pushToRibMaster(
                ribMaster,
                1,
                i,
                i,
                p,
                'down',
                inter,
                distance.toFixed(2),
              )
            }

            inter = qSVG.intersectionOfEquations(
              WALLS[i].equations.down,
              WALLS[p].equations.down,
              'object',
            )
            if (
              qSVG.btwn(
                inter.x,
                WALLS[i].coords[1].x,
                WALLS[i].coords[2].x,
                'round',
              ) &&
              qSVG.btwn(
                inter.y,
                WALLS[i].coords[1].y,
                WALLS[i].coords[2].y,
                'round',
              ) &&
              qSVG.btwn(
                inter.x,
                WALLS[p].coords[1].x,
                WALLS[p].coords[2].x,
                'round',
              ) &&
              qSVG.btwn(
                inter.y,
                WALLS[p].coords[1].y,
                WALLS[p].coords[2].y,
                'round',
              )
            ) {
              distance = qSVG.measure(WALLS[i].coords[1], inter) / meter
              pushToRibMaster(
                ribMaster,
                1,
                i,
                i,
                p,
                'down',
                inter,
                distance.toFixed(2),
              )
            }
          }
        }
      }
      distance = qSVG.measure(WALLS[i].coords[0], WALLS[i].coords[3]) / meter
      pushToRibMaster(
        ribMaster,
        0,
        i,
        i,
        i,
        'up',
        WALLS[i].coords[3],
        distance.toFixed(2),
      )

      distance = qSVG.measure(WALLS[i].coords[1], WALLS[i].coords[2]) / meter
      pushToRibMaster(
        ribMaster,
        1,
        i,
        i,
        i,
        'down',
        WALLS[i].coords[2],
        distance.toFixed(2),
      )
    }
  }

  for (let a in ribMaster[0]) {
    ribMaster[0][a].sort(function (a, b) {
      return (a.distance - b.distance).toFixed(2)
    })
  }
  for (let a in ribMaster[1]) {
    ribMaster[1][a].sort(function (a, b) {
      return (a.distance - b.distance).toFixed(2)
    })
  }

  let sizeText = []
  if (shift === 5) $('#boxRib').empty()
  for (let t in ribMaster) {
    for (let a in ribMaster[t]) {
      for (let n = 1; n < ribMaster[t][a].length; n++) {
        if (ribMaster[t][a][n - 1].wallIndex === ribMaster[t][a][n].wallIndex) {
          let edge = ribMaster[t][a][n].wallIndex
          let found = true
          let valueText = Math.abs(
            ribMaster[t][a][n - 1].distance - ribMaster[t][a][n].distance,
          )
          // CLEAR TOO LITTLE VALUE
          if (valueText < 0.15) {
            found = false
          }
          // CLEAR (thick) BETWEEN CROSS EDGE
          if (
            found &&
            ribMaster[t][a][n - 1].crossEdge === ribMaster[t][a][n].crossEdge &&
            ribMaster[t][a][n].crossEdge != ribMaster[t][a][n].wallIndex
          ) {
            found = false
          }
          // CLEAR START INTO EDGE
          if (found && ribMaster[t][a].length > 2 && n === 1) {
            let polygon = []
            for (let pp = 0; pp < 4; pp++) {
              polygon.push({
                x: WALLS[ribMaster[t][a][n].crossEdge].coords[pp].x,
                y: WALLS[ribMaster[t][a][n].crossEdge].coords[pp].y,
              }) // FOR Z
            }
            if (qSVG.rayCasting(ribMaster[t][a][0].coords, polygon)) {
              found = false
            }
          }
          // CLEAR END INTO EDGE
          if (
            found &&
            ribMaster[t][a].length > 2 &&
            n === ribMaster[t][a].length - 1
          ) {
            let polygon = []
            for (let pp = 0; pp < 4; pp++) {
              polygon.push({
                x: WALLS[ribMaster[t][a][n - 1].crossEdge].coords[pp].x,
                y: WALLS[ribMaster[t][a][n - 1].crossEdge].coords[pp].y,
              }) // FOR Z
            }
            if (
              qSVG.rayCasting(
                ribMaster[t][a][ribMaster[t][a].length - 1].coords,
                polygon,
              )
            ) {
              found = false
            }
          }

          if (found) {
            let angleText =
              WALLS[ribMaster[t][a][n].wallIndex].angle * (180 / Math.PI)
            let shiftValue = -shift
            if (ribMaster[t][a][n - 1].side === 'down') {
              shiftValue = -shiftValue + 10
            }
            if (angleText > 90 || angleText < -89) {
              angleText -= 180
              if (ribMaster[t][a][n - 1].side === 'down') {
                shiftValue = -shift
              } else shiftValue = -shiftValue + 10
            }
            sizeText[n] = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'text',
            )
            let startText = qSVG.middle(
              ribMaster[t][a][n - 1].coords.x,
              ribMaster[t][a][n - 1].coords.y,
              ribMaster[t][a][n].coords.x,
              ribMaster[t][a][n].coords.y,
            )
            sizeText[n].setAttributeNS(null, 'x', startText.x)
            sizeText[n].setAttributeNS(null, 'y', startText.y + shiftValue)
            sizeText[n].setAttributeNS(null, 'text-anchor', 'middle')
            sizeText[n].setAttributeNS(null, 'font-family', 'roboto')
            sizeText[n].setAttributeNS(null, 'stroke', '#ffffff')
            sizeText[n].textContent = valueText.toFixed(2)
            if (sizeText[n].textContent < 1) {
              sizeText[n].setAttributeNS(null, 'font-size', '0.73em')
              sizeText[n].textContent = sizeText[n].textContent.substring(
                1,
                sizeText[n].textContent.length,
              )
            } else sizeText[n].setAttributeNS(null, 'font-size', '0.9em')
            sizeText[n].setAttributeNS(null, 'stroke-width', '0.2px')
            sizeText[n].setAttributeNS(null, 'fill', '#555555')
            sizeText[n].setAttribute(
              'transform',
              'rotate(' +
                angleText +
                ' ' +
                startText.x +
                ',' +
                startText.y +
                ')',
            )

            $('#boxRib').append(sizeText[n])
          }
        }
      }
    }
  }
}

function cursor(tool) {
  if (tool === 'grab')
    tool =
      "url('https://wiki.openmrs.org/s/en_GB/7502/b9217199c27dd617c8d51f6186067d7767c5001b/_/images/icons/emoticons/add.png') 8 8, auto"
  if (tool === 'scissor')
    tool =
      "url('https://maxcdn.icons8.com/windows10/PNG/64/Hands/hand_scissors-64.png'), auto"
  if (tool === 'trash')
    tool =
      "url('https://cdn4.iconfinder.com/data/icons/common-toolbar/36/Cancel-32.png'), auto"
  if (tool === 'validation')
    tool =
      "url('https://images.fatguymedia.com/wp-content/uploads/2015/09/check.png'), auto"
  linElement.css('cursor', tool)
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

function fonc_button(modesetting, option) {
  save()

  $('.sub').hide()
  raz_button()
  if (option != 'simpleStair') {
    $('#' + modesetting).removeClass('btn-default')
    $('#' + modesetting).addClass('btn-success')
  }
  mode = modesetting
  modeOption = option

  if (typeof lineIntersectionP != 'undefined') {
    lineIntersectionP.remove()
    delete lineIntersectionP
  }
}

//  RETURN PATH(s) ARRAY FOR OBJECT + PROPERTY params => bindBox (false = open sideTool), move, resize, rotate
function carpentryCalc(classObj, typeObj, sizeObj, thickObj, dividerObj = 10) {
  let construc = []
  construc.params = {}
  construc.params.bindBox = false
  construc.params.move = false
  construc.params.resize = false
  construc.params.resizeLimit = {}
  construc.params.resizeLimit.width = { min: false, max: false }
  construc.params.resizeLimit.height = { min: false, max: false }
  construc.params.rotate = false

  if (classObj === 'socle') {
    pushToConstruc(
      construc,
      'M ' +
        -sizeObj / 2 +
        ',' +
        -thickObj / 2 +
        ' L ' +
        -sizeObj / 2 +
        ',' +
        thickObj / 2 +
        ' L ' +
        sizeObj / 2 +
        ',' +
        thickObj / 2 +
        ' L ' +
        sizeObj / 2 +
        ',' +
        -thickObj / 2 +
        ' Z',
      '#5cba79',
      '#5cba79',
      '',
    )
  }

  if (classObj === 'network') {
    if (typeObj === 'rj11') {
      construc.params.bindBox = true
      construc.params.move = true
      construc.params.resize = false
      construc.params.rotate = false
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(construc, 'm-10,5 l0,-10 m20,0 l0,10', 'none', '#333', '')
      pushToConstruc(construc, 'm 0,5 v 7', 'none', '#333', '')
      pushToConstruc(construc, 'm -10,5 h 20', 'none', '#333', '')

      construc.push({
        text: 'RJ11',
        x: '0',
        y: '-5',
        fill: '#333333',
        stroke: 'none',
        fontSize: '0.5em',
        strokeWidth: '0.4px',
      })
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'rj45') {
      construc.params.bindBox = true
      construc.params.move = true
      construc.params.resize = false
      construc.params.rotate = false
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(construc, 'm-10,5 l0,-10 m20,0 l0,10', 'none', '#333', '')
      pushToConstruc(construc, 'm 0,5 v 7', 'none', '#333', '')
      pushToConstruc(construc, 'm -10,5 h 20', 'none', '#333', '')

      construc.push({
        text: 'RJ45',
        x: '0',
        y: '-5',
        fill: '#333333',
        stroke: 'none',
        fontSize: '0.5em',
        strokeWidth: '0.4px',
      })
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'coax') {
      construc.params.bindBox = true
      construc.params.move = true
      construc.params.resize = false
      construc.params.rotate = false
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(construc, 'm-10,5 l0-10 m20,0 l0,10', 'none', '#333', '')
      pushToConstruc(construc, 'm-7,-5 l0,7 l14,0 l0,-7', 'none', '#333', '')
      pushToConstruc(construc, 'm 0,5 v 7', 'none', '#333', '')
      pushToConstruc(construc, 'm -10,5 h 20', 'none', '#333', '')

      construc.push({
        text: 'TV',
        x: '0',
        y: '-5',
        fill: '#333333',
        stroke: 'none',
        fontSize: '0.5em',
        strokeWidth: '0.4px',
      })
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
  }

  if (classObj === 'electrical') {
    if (typeObj === 'outlet') {
      construc.params.bindBox = true
      construc.params.move = true
      construc.params.resize = false
      construc.params.rotate = false
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(
        construc,
        'M 10,-6 a 10,10 0 0 1 -5,8 10,10 0 0 1 -10,0 10,10 0 0 1 -5,-8',
        'none',
        '#333',
        '',
      )
      pushToConstruc(construc, 'm 0,3 v 7', 'none', '#333', '')
      pushToConstruc(construc, 'm -10,4 h 20', 'none', '#333', '')
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }

    if(typeObj === 'switch') {
      construc.params.bindBox = true
      construc.params.move = true
      construc.params.resize = false
      construc.params.rotate = false
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#333', '')
      pushToConstruc(construc, qSVG.circlePath(-2, 4, 5), 'none', '#333', '')
      pushToConstruc(construc, 'm 0,0 5,-9', 'none', '#333', '')
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
  }

  if (classObj === 'doorWindow') {
    if (typeObj === 'simple') {
      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' Z',
        '#ccc',
        'none',
        '',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          (-sizeObj - thickObj / 2) +
          '  A' +
          sizeObj +
          ',' +
          sizeObj +
          ' 0 0,1 ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2,
        'none',
        colorWall,
        '',
      )
      construc.params.resize = true
      construc.params.resizeLimit.width = { min: 40, max: 120 }
    }
    if (typeObj === 'double') {
      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' Z',
        '#ccc',
        'none',
        '',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          (-sizeObj / 2 - thickObj / 2) +
          '  A' +
          sizeObj / 2 +
          ',' +
          sizeObj / 2 +
          ' 0 0,1 0,' +
          -thickObj / 2,
        'none',
        colorWall,
        '',
      )

      pushToConstruc(
        construc,
        'M ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          (-sizeObj / 2 - thickObj / 2) +
          '  A' +
          sizeObj / 2 +
          ',' +
          sizeObj / 2 +
          ' 0 0,0 0,' +
          -thickObj / 2,
        'none',
        colorWall,
        '',
      )
      construc.params.resize = true
      construc.params.resizeLimit.width = { min: 40, max: 160 }
    }
    if (typeObj === 'pocket') {
      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          (-(thickObj / 2) - 4) +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          (-(thickObj / 2) - 4) +
          ' Z',
        '#ccc',
        'none',
        'none',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' M ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2,
        'none',
        '#494646',
        '5 5',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          (-thickObj / 2 - 5) +
          ' L ' +
          +sizeObj / 2 +
          ',' +
          (-thickObj / 2 - 5) +
          ' L ' +
          +sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' Z',
        'url(#hatch)',
        '#494646',
        '',
      )
      construc.params.resize = true
      construc.params.resizeLimit.width = { min: 60, max: 200 }
    }
    if (typeObj === 'aperture') {
      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' Z',
        '#ccc',
        '#494646',
        '5,5',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -(thickObj / 2) +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          (-sizeObj / 2 + 5) +
          ',' +
          thickObj / 2 +
          ' L ' +
          (-sizeObj / 2 + 5) +
          ',' +
          -(thickObj / 2) +
          ' Z',
        'none',
        '#494646',
        'none',
      )

      pushToConstruc(
        construc,
        'M ' +
          (sizeObj / 2 - 5) +
          ',' +
          -(thickObj / 2) +
          ' L ' +
          (sizeObj / 2 - 5) +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          -(thickObj / 2) +
          ' Z',
        'none',
        '#494646',
        'none',
      )
      construc.params.resize = true
      construc.params.resizeLimit.width = { min: 40, max: 500 }
    }
    if (typeObj === 'fix') {
      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',-2 L ' +
          -sizeObj / 2 +
          ',2 L ' +
          sizeObj / 2 +
          ',2 L ' +
          sizeObj / 2 +
          ',-2 Z',
        '#ccc',
        'none',
        '',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' M ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2,
        'none',
        '#ccc',
        '',
      )
      construc.params.resize = true
      construc.params.resizeLimit.width = { min: 30, max: 300 }
    }
    if (typeObj === 'flap') {
      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',-2 L ' +
          -sizeObj / 2 +
          ',2 L ' +
          sizeObj / 2 +
          ',2 L ' +
          sizeObj / 2 +
          ',-2 Z',
        '#ccc',
        'none',
        '',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' M ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2,
        'none',
        '#ccc',
        '',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          (-sizeObj / 2 + sizeObj * 0.866) +
          ',' +
          (-sizeObj / 2 - thickObj / 2) +
          '  A' +
          sizeObj +
          ',' +
          sizeObj +
          ' 0 0,1 ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2,
        'none',
        colorWall,
        '',
      )
      construc.params.resize = true
      construc.params.resizeLimit.width = { min: 20, max: 100 }
    }
    if (typeObj === 'twin') {
      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',-2 L ' +
          -sizeObj / 2 +
          ',2 L ' +
          sizeObj / 2 +
          ',2 L ' +
          sizeObj / 2 +
          ',-2 Z',
        '#ccc',
        'none',
        '',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' M ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2,
        'none',
        '#ccc',
        '',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          (-sizeObj / 2 + (sizeObj / 2) * 0.866) +
          ',' +
          (-sizeObj / 4 - thickObj / 2) +
          '  A' +
          sizeObj / 2 +
          ',' +
          sizeObj / 2 +
          ' 0 0,1 0,' +
          -thickObj / 2,
        'none',
        colorWall,
        '',
      )

      pushToConstruc(
        construc,
        'M ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          (sizeObj / 2 + (-sizeObj / 2) * 0.866) +
          ',' +
          (-sizeObj / 4 - thickObj / 2) +
          '  A' +
          sizeObj / 2 +
          ',' +
          sizeObj / 2 +
          ' 0 0,0 0,' +
          -thickObj / 2,
        'none',
        colorWall,
        '',
      )
      construc.params.resize = true
      construc.params.resizeLimit.width = { min: 40, max: 200 }
    }
    if (typeObj === 'bay') {
      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' M ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2,
        'none',
        '#ccc',
        '',
      )

      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',-2 L ' +
          -sizeObj / 2 +
          ',0 L 2,0 L 2,2 L 3,2 L 3,-2 Z',
        '#ccc',
        'none',
        '',
      )

      pushToConstruc(
        construc,
        'M -2,1 L -2,3 L ' +
          sizeObj / 2 +
          ',3 L ' +
          sizeObj / 2 +
          ',1 L -1,1 L -1,-1 L -2,-1 Z',
        '#ccc',
        'none',
        '',
      )
      construc.params.resize = true
      construc.params.resizeLimit.width = { min: 60, max: 300 }
    }
  }

  if (classObj === 'measure') {
    construc.params.bindBox = true
    pushToConstruc(
      construc,
      'M-' +
        sizeObj / 2 +
        ',0 l10,-10 l0,8 l' +
        (sizeObj - 20) +
        ',0 l0,-8 l10,10 l-10,10 l0,-8 l-' +
        (sizeObj - 20) +
        ',0 l0,8 Z',
      '#729eeb',
      'none',
      '',
    )
  }

  if (classObj === 'boundingBox') {
    pushToConstruc(
      construc,
      'M' +
        (-sizeObj / 2 - 10) +
        ',' +
        (-thickObj / 2 - 10) +
        ' L' +
        (sizeObj / 2 + 10) +
        ',' +
        (-thickObj / 2 - 10) +
        ' L' +
        (sizeObj / 2 + 10) +
        ',' +
        (thickObj / 2 + 10) +
        ' L' +
        (-sizeObj / 2 - 10) +
        ',' +
        (thickObj / 2 + 10) +
        ' Z',
      'none',
      '#aaa',
      '',
    )

    // construc.push({'path':"M"+dividerObj[0].x+","+dividerObj[0].y+" L"+dividerObj[1].x+","+dividerObj[1].y+" L"+dividerObj[2].x+",
    // "+dividerObj[2].y+" L"+dividerObj[3].x+","+dividerObj[3].y+" Z", 'fill':'none', 'stroke':"#000", 'strokeDashArray': ''});
  }

  //typeObj = color  dividerObj = text
  if (classObj === 'text') {
    construc.params.bindBox = true
    construc.params.move = true
    construc.params.rotate = true
    construc.push({
      text: dividerObj.text,
      x: '0',
      y: '0',
      fill: typeObj,
      stroke: typeObj,
      fontSize: dividerObj.size + 'px',
      strokeWidth: '0px',
    })
  }

  if (classObj === 'stair') {
    construc.params.bindBox = true
    construc.params.move = true
    construc.params.resize = true
    construc.params.rotate = true
    construc.params.width = 60
    construc.params.height = 180
    if (typeObj === 'simpleStair') {
      pushToConstruc(
        construc,
        'M ' +
          -sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' L ' +
          -sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          thickObj / 2 +
          ' L ' +
          sizeObj / 2 +
          ',' +
          -thickObj / 2 +
          ' Z',
        '#fff',
        '#000',
        '',
      )

      let heightStep = thickObj / dividerObj
      for (let i = 1; i < dividerObj + 1; i++) {
        pushToConstruc(
          construc,
          'M ' +
            -sizeObj / 2 +
            ',' +
            (-thickObj / 2 + i * heightStep) +
            ' L ' +
            sizeObj / 2 +
            ',' +
            (-thickObj / 2 + i * heightStep),
          'none',
          '#000',
          'none',
        )
      }
      construc.params.resizeLimit.width = { min: 40, max: 200 }
      construc.params.resizeLimit.height = { min: 40, max: 400 }
    }
  }

  if (classObj === 'energy') {
    construc.params.bindBox = true
    construc.params.move = true
    construc.params.resize = false
    construc.params.rotate = false
    if (typeObj === 'gtl') {
      pushToConstruc(
        construc,
        'm -20,-20 l 40,0 l0,40 l-40,0 Z',
        '#fff',
        '#333',
        '',
      )
      construc.push({
        text: 'GTL',
        x: '0',
        y: '5',
        fill: '#333333',
        stroke: 'none',
        fontSize: '0.9em',
        strokeWidth: '0.4px',
      })
      construc.params.width = 40
      construc.params.height = 40
      construc.family = 'stick'
    }
    if (typeObj === 'switch') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#333', '')
      pushToConstruc(construc, qSVG.circlePath(-2, 4, 5), 'none', '#333', '')
      pushToConstruc(construc, 'm 0,0 5,-9', 'none', '#333', '')
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'doubleSwitch') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#333', '')
      pushToConstruc(construc, qSVG.circlePath(0, 0, 4), 'none', '#333', '')
      pushToConstruc(construc, 'm 2,-3 5,-8 3,2', 'none', '#333', '')
      pushToConstruc(construc, 'm -2,3 -5,8 -3,-2', 'none', '#333', '')
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'dimmer') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#333', '')
      pushToConstruc(construc, qSVG.circlePath(-2, 4, 5), 'none', '#333', '')
      pushToConstruc(construc, 'm 0,0 5,-9', 'none', '#333', '')
      pushToConstruc(construc, 'M -2,-6 L 10,-4 L-2,-2 Z', 'none', '#333', '')

      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'plug') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(
        construc,
        'M 10,-6 a 10,10 0 0 1 -5,8 10,10 0 0 1 -10,0 10,10 0 0 1 -5,-8',
        'none',
        '#333',
        '',
      )
      pushToConstruc(construc, 'm 0,3 v 7', 'none', '#333', '')
      pushToConstruc(construc, 'm -10,4 h 20', 'none', '#333', '')
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'plug20') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(
        construc,
        'M 10,-6 a 10,10 0 0 1 -5,8 10,10 0 0 1 -10,0 10,10 0 0 1 -5,-8',
        'none',
        '#333',
        '',
      )
      pushToConstruc(construc, 'm 0,3 v 7', 'none', '#333', '')
      pushToConstruc(construc, 'm -10,4 h 20', 'none', '#333', '')

      construc.push({
        text: '20A',
        x: '0',
        y: '-5',
        fill: '#333333',
        stroke: 'none',
        fontSize: '0.65em',
        strokeWidth: '0.4px',
      })
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'plug32') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(
        construc,
        'M 10,-6 a 10,10 0 0 1 -5,8 10,10 0 0 1 -10,0 10,10 0 0 1 -5,-8',
        'none',
        '#333',
        '',
      )
      pushToConstruc(construc, 'm 0,3 v 7', 'none', '#333', '')
      pushToConstruc(construc, 'm -10,4 h 20', 'none', '#333', '')

      construc.push({
        text: '32A',
        x: '0',
        y: '-5',
        fill: '#333333',
        stroke: 'none',
        fontSize: '0.65em',
        strokeWidth: '0.4px',
      })
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'roofLight') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(
        construc,
        'M -8,-8 L 8,8 M -8,8 L 8,-8',
        'none',
        '#333',
        '',
      )

      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'free'
    }
    if (typeObj === 'wallLight') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(
        construc,
        'M -8,-8 L 8,8 M -8,8 L 8,-8',
        'none',
        '#333',
        '',
      )
      pushToConstruc(construc, 'M -10,10 L 10,10', 'none', '#333', '')

      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'www') {
      pushToConstruc(
        construc,
        'm -20,-20 l 40,0 l0,40 l-40,0 Z',
        '#fff',
        '#333',
        '',
      )

      construc.push({
        text: '@',
        x: '0',
        y: '4',
        fill: '#333333',
        stroke: 'none',
        fontSize: '1.2em',
        strokeWidth: '0.4px',
      })
      construc.params.width = 40
      construc.params.height = 40
      construc.family = 'free'
    }
    if (typeObj === 'rj45') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(construc, 'm-10,5 l0,-10 m20,0 l0,10', 'none', '#333', '')
      pushToConstruc(construc, 'm 0,5 v 7', 'none', '#333', '')
      pushToConstruc(construc, 'm -10,5 h 20', 'none', '#333', '')

      construc.push({
        text: 'RJ45',
        x: '0',
        y: '-5',
        fill: '#333333',
        stroke: 'none',
        fontSize: '0.5em',
        strokeWidth: '0.4px',
      })
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'tv') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(construc, 'm-10,5 l0-10 m20,0 l0,10', 'none', '#333', '')
      pushToConstruc(construc, 'm-7,-5 l0,7 l14,0 l0,-7', 'none', '#333', '')
      pushToConstruc(construc, 'm 0,5 v 7', 'none', '#333', '')
      pushToConstruc(construc, 'm -10,5 h 20', 'none', '#333', '')

      construc.push({
        text: 'TV',
        x: '0',
        y: '-5',
        fill: '#333333',
        stroke: 'none',
        fontSize: '0.5em',
        strokeWidth: '0.4px',
      })
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }

    if (typeObj === 'heater') {
      pushToConstruc(construc, qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
      pushToConstruc(construc, 'm-15,-4 l30,0', 'none', '#333', '')
      pushToConstruc(construc, 'm-14,-8 l28,0', 'none', '#333', '')
      pushToConstruc(construc, 'm-11,-12 l22,0', 'none', '#333', '')
      pushToConstruc(construc, 'm-16,0 l32,0', 'none', '#333', '')
      pushToConstruc(construc, 'm-15,4 l30,0', 'none', '#333', '')
      pushToConstruc(construc, 'm-14,8 l28,0', 'none', '#333', '')
      pushToConstruc(construc, 'm-11,12 l22,0', 'none', '#333', '')

      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'radiator') {
      pushToConstruc(
        construc,
        'm -20,-10 l 40,0 l0,20 l-40,0 Z',
        '#fff',
        '#333',
        '',
      )
      pushToConstruc(construc, 'M -15,-10 L -15,10', '#fff', '#333', '')
      pushToConstruc(construc, 'M -10,-10 L -10,10', '#fff', '#333', '')
      pushToConstruc(construc, 'M -5,-10 L -5,10', '#fff', '#333', '')
      pushToConstruc(construc, 'M -0,-10 L -0,10', '#fff', '#333', '')
      pushToConstruc(construc, 'M 5,-10 L 5,10', '#fff', '#333', '')
      pushToConstruc(construc, 'M 10,-10 L 10,10', '#fff', '#333', '')
      pushToConstruc(construc, 'M 15,-10 L 15,10', '#fff', '#333', '')

      construc.params.width = 40
      construc.params.height = 20
      construc.family = 'stick'
    }
  }

  if (classObj === 'furniture') {
    construc.params.bindBox = true
    construc.params.move = true
    construc.params.resize = true
    construc.params.rotate = true
  }

  return construc
}

function setBestEqPoint(
  bestEqPoint,
  distance,
  index,
  x,
  y,
  x1,
  y1,
  x2,
  y2,
  way,
) {
  bestEqPoint.distance = distance
  bestEqPoint.node = index
  bestEqPoint.x = x
  bestEqPoint.y = y
  bestEqPoint.x1 = x1
  bestEqPoint.y1 = y1
  bestEqPoint.x2 = x2
  bestEqPoint.y2 = y2
  bestEqPoint.way = way
}

function pushToRibMaster(
  ribMaster,
  firstIndex,
  secondIndex,
  wallIndex,
  crossEdge,
  side,
  coords,
  distance,
) {
  ribMaster[firstIndex][secondIndex].push({
    wallIndex: wallIndex,
    crossEdge: crossEdge,
    side: side,
    coords: coords,
    distance: distance,
  })
}

function pushToConstruc(construc, path, fill, stroke, strokeDashArray) {
  construc.push({
    path: path,
    fill: fill,
    stroke: stroke,
    strokeDashArray: strokeDashArray,
  })
}

function mouseDown_mode_select (event) {
  if (mode !== 'select_mode') {
    return
  }

  if (
    typeof binder != 'undefined' &&
    (binder.type == 'segment' ||
      binder.type == 'node' ||
      binder.type == 'obj' ||
      binder.type == 'boundingBox')
  ) {
    // REVIEW: Is this safe to do here? How is the subsequent mouse move effected?
    mode = 'bind_mode'

    if (binder.type == 'obj') {
      action = 1
    }

    if (binder.type == 'boundingBox') {
      action = 1
    }

    // INIT FOR HELP BINDER NODE MOVING H V (MOUSE DOWN)
    if (binder.type == 'node') {
      $('#boxScale').hide(100)
      var node = binder.data
      pox = node.x
      poy = node.y
      var nodeControl = { x: pox, y: poy }

      // DETERMINATE DISTANCE OF OPPOSED NODE ON EDGE(s) PARENT(s) OF THIS NODE !!!! NODE 1 -- NODE 2 SYSTE% :-(
      wallListObj = [] // SUPER VAR -- WARNING
      var objWall
      wallListRun = []
      for (var ee = WALLS.length - 1; ee > -1; ee--) {
        // SEARCH MOST YOUNG WALL COORDS IN NODE BINDER
        if (
          isObjectsEquals(WALLS[ee].start, nodeControl) ||
          isObjectsEquals(WALLS[ee].end, nodeControl)
        ) {
          wallListRun.push(WALLS[ee])
          break
        }
      }
      if (wallListRun[0].child != null) {
        if (
          isObjectsEquals(wallListRun[0].child.start, nodeControl) ||
          isObjectsEquals(wallListRun[0].child.end, nodeControl)
        )
          wallListRun.push(wallListRun[0].child)
      }
      if (wallListRun[0].parent != null) {
        if (
          isObjectsEquals(wallListRun[0].parent.start, nodeControl) ||
          isObjectsEquals(wallListRun[0].parent.end, nodeControl)
        )
          wallListRun.push(wallListRun[0].parent)
      }

      for (var k in wallListRun) {
        if (
          isObjectsEquals(wallListRun[k].start, nodeControl) ||
          isObjectsEquals(wallListRun[k].end, nodeControl)
        ) {
          var nodeTarget = wallListRun[k].start
          if (isObjectsEquals(wallListRun[k].start, nodeControl)) {
            nodeTarget = wallListRun[k].end
          }
          objWall = editor.objFromWall(wallListRun[k]) // LIST OBJ ON EDGE -- NOT INDEX !!!
          wall = wallListRun[k]
          for (var ob = 0; ob < objWall.length; ob++) {
            var objTarget = objWall[ob]
            var distance = qSVG.measure(objTarget, nodeTarget)
            wallListObj.push({
              wall: wall,
              from: nodeTarget,
              distance: distance,
              obj: objTarget,
              indexObj: ob,
            })
          }
        }
      }
      magnetic = 0
      action = 1
    }
    if (binder.type == 'segment') {
      $('#boxScale').hide(100)
      var wall = binder.wall
      binder.before = binder.wall.start
      equation2 = editor.createEquationFromWall(wall)
      if (wall.parent != null) {
        equation1 = editor.createEquationFromWall(wall.parent)
        var angle12 = qSVG.angleBetweenEquations(equation1.A, equation2.A)
        if (angle12 < 20 || angle12 > 160) {
          var found = true
          for (var k in WALLS) {
            if (
              qSVG.rayCasting(wall.start, WALLS[k].coords) &&
              !isObjectsEquals(WALLS[k], wall.parent) &&
              !isObjectsEquals(WALLS[k], wall)
            ) {
              if (
                wall.parent.parent != null &&
                isObjectsEquals(wall, wall.parent.parent)
              )
                wall.parent.parent = null
              if (
                wall.parent.child != null &&
                isObjectsEquals(wall, wall.parent.child)
              )
                wall.parent.child = null
              wall.parent = null
              found = false
              break
            }
          }
          if (found) {
            var newWall
            if (isObjectsEquals(wall.parent.end, wall.start, '1')) {
              newWall = new editor.wall(
                wall.parent.end,
                wall.start,
                'normal',
                wall.thick,
              )
              WALLS.push(newWall)
              newWall.parent = wall.parent
              newWall.child = wall
              wall.parent.child = newWall
              wall.parent = newWall
              equation1 = qSVG.perpendicularEquation(
                equation2,
                wall.start.x,
                wall.start.y,
              )
            } else if (isObjectsEquals(wall.parent.start, wall.start, '2')) {
              newWall = new editor.wall(
                wall.parent.start,
                wall.start,
                'normal',
                wall.thick,
              )
              WALLS.push(newWall)
              newWall.parent = wall.parent
              newWall.child = wall
              wall.parent.parent = newWall
              wall.parent = newWall
              equation1 = qSVG.perpendicularEquation(
                equation2,
                wall.start.x,
                wall.start.y,
              )
            }
            // CREATE NEW WALL
          }
        }
      }
      if (wall.parent == null) {
        var foundEq = false
        for (var k in WALLS) {
          if (
            qSVG.rayCasting(wall.start, WALLS[k].coords) &&
            !isObjectsEquals(WALLS[k].coords, wall.coords)
          ) {
            var angleFollow = qSVG.angleBetweenEquations(
              WALLS[k].equations.base.A,
              equation2.A,
            )
            if (angleFollow < 20 || angleFollow > 160) break
            equation1 = editor.createEquationFromWall(WALLS[k])
            equation1.follow = WALLS[k]
            equation1.backUp = {
              coords: WALLS[k].coords,
              start: WALLS[k].start,
              end: WALLS[k].end,
              child: WALLS[k].child,
              parent: WALLS[k].parent,
            }
            foundEq = true
            break
          }
        }
        if (!foundEq)
          equation1 = qSVG.perpendicularEquation(
            equation2,
            wall.start.x,
            wall.start.y,
          )
      }

      if (wall.child != null) {
        equation3 = editor.createEquationFromWall(wall.child)
        var angle23 = qSVG.angleBetweenEquations(equation3.A, equation2.A)
        if (angle23 < 20 || angle23 > 160) {
          var found = true
          for (var k in WALLS) {
            if (
              qSVG.rayCasting(wall.end, WALLS[k].coords) &&
              !isObjectsEquals(WALLS[k], wall.child) &&
              !isObjectsEquals(WALLS[k], wall)
            ) {
              if (
                wall.child.parent != null &&
                isObjectsEquals(wall, wall.child.parent)
              )
                wall.child.parent = null
              if (
                wall.child.child != null &&
                isObjectsEquals(wall, wall.child.child)
              )
                wall.child.child = null
              wall.child = null
              found = false
              break
            }
          }
          if (found) {
            if (isObjectsEquals(wall.child.start, wall.end)) {
              var newWall = new editor.wall(
                wall.end,
                wall.child.start,
                'new',
                wall.thick,
              )
              WALLS.push(newWall)
              newWall.parent = wall
              newWall.child = wall.child
              wall.child.parent = newWall
              wall.child = newWall
              equation3 = qSVG.perpendicularEquation(
                equation2,
                wall.end.x,
                wall.end.y,
              )
            } else if (isObjectsEquals(wall.child.end, wall.end)) {
              var newWall = new editor.wall(
                wall.end,
                wall.child.end,
                'normal',
                wall.thick,
              )
              WALLS.push(newWall)
              newWall.parent = wall
              newWall.child = wall.child
              wall.child.child = newWall
              wall.child = newWall
              equation3 = qSVG.perpendicularEquation(
                equation2,
                wall.end.x,
                wall.end.y,
              )
            }
            // CREATE NEW WALL
          }
        }
      }
      if (wall.child == null) {
        var foundEq = false
        for (var k in WALLS) {
          if (
            qSVG.rayCasting(wall.end, WALLS[k].coords) &&
            !isObjectsEquals(WALLS[k].coords, wall.coords, '4')
          ) {
            var angleFollow = qSVG.angleBetweenEquations(
              WALLS[k].equations.base.A,
              equation2.A,
            )
            if (angleFollow < 20 || angleFollow > 160) break
            equation3 = editor.createEquationFromWall(WALLS[k])
            equation3.follow = WALLS[k]
            equation3.backUp = {
              coords: WALLS[k].coords,
              start: WALLS[k].start,
              end: WALLS[k].end,
              child: WALLS[k].child,
              parent: WALLS[k].parent,
            }
            foundEq = true
            break
          }
        }
        if (!foundEq)
          equation3 = qSVG.perpendicularEquation(
            equation2,
            wall.end.x,
            wall.end.y,
          )
      }

      equationFollowers = []
      for (var k in WALLS) {
        if (
          WALLS[k].child == null &&
          qSVG.rayCasting(WALLS[k].end, wall.coords) &&
          !isObjectsEquals(wall, WALLS[k])
        ) {
          equationFollowers.push({
            wall: WALLS[k],
            eq: editor.createEquationFromWall(WALLS[k]),
            type: 'end',
          })
        }
        if (
          WALLS[k].parent == null &&
          qSVG.rayCasting(WALLS[k].start, wall.coords) &&
          !isObjectsEquals(wall, WALLS[k])
        ) {
          equationFollowers.push({
            wall: WALLS[k],
            eq: editor.createEquationFromWall(WALLS[k]),
            type: 'start',
          })
        }
      }

      equationsObj = []
      var objWall = editor.objFromWall(wall) // LIST OBJ ON EDGE
      for (var ob = 0; ob < objWall.length; ob++) {
        var objTarget = objWall[ob]
        equationsObj.push({
          obj: objTarget,
          wall: wall,
          eq: qSVG.perpendicularEquation(equation2, objTarget.x, objTarget.y),
        })
      }
      action = 1
    }
  } else {
    action = 0
    drag = 'on'
    snap = calcul_snap(event, grid_snap)
    pox = snap.xMouse
    poy = snap.yMouse
  }
}

function mouseDown_mode_line_partition (event) {
  if (mode !== 'line_mode' && mode !== 'partition_mode') {
    return
  }

  if (action == 0) {
    snap = calcul_snap(event, grid_snap)
    pox = snap.x
    poy = snap.y
    if ((wallStartConstruc = editor.nearWall(snap, 12))) {
      // TO SNAP SEGMENT TO FINALIZE X2Y2
      pox = wallStartConstruc.x
      poy = wallStartConstruc.y
    }
  } else {
    construc = 1
  }

  action = 1
}

function mouseDown_mode_distance (event) {
  if (mode !== 'distance_mode') {
    return
  }

  if (action == 0) {
    action = 1
    snap = calcul_snap(event, grid_snap)
    pox = snap.x
    poy = snap.y
  }
}

function mouseDown_mode_edit_door (event) {
  if (mode !== 'edit_door_mode') {
    return
  }

  // ACTION 1 ACTIVATE EDITION OF THE DOOR
  action = 1
  $('#lin').css('cursor', 'pointer')
}

function mouseDownHandler(event) {

  event.preventDefault()

  mouseDown_mode_select(event)
  mouseDown_mode_line_partition(event)
  mouseDown_mode_distance(event)
  mouseDown_mode_edit_door(event)
}

function mouseMove_mode_select (event) {

  if(mode !== 'select_mode') {
    return
  }

  if (drag === 'off') {
    // FIRST TEST ON SELECT MODE (and drag OFF) to detect MOUSEOVER DOOR
    snap = calcul_snap(event, 'off')

    var objTarget = false
    for (var i = 0; i < OBJDATA.length; i++) {
      var objX1 = OBJDATA[i].bbox.left
      var objX2 = OBJDATA[i].bbox.right
      var objY1 = OBJDATA[i].bbox.top
      var objY2 = OBJDATA[i].bbox.bottom
      var realBboxCoords = OBJDATA[i].realBbox
      if (qSVG.rayCasting(snap, realBboxCoords)) {
        objTarget = OBJDATA[i]
      }
    }
    if (objTarget !== false) {
      if (typeof binder != 'undefined' && binder.type == 'segment') {
        binder.graph.remove()
        delete binder
        cursor('default')
      }
      if (objTarget.params.bindBox) {
        // OBJ -> BOUNDINGBOX TOOL
        if (typeof binder == 'undefined') {
          binder = new editor.obj2D(
            'free',
            'boundingBox',
            '',
            objTarget.bbox.origin,
            objTarget.angle,
            0,
            objTarget.size,
            'normal',
            objTarget.thick,
            objTarget.realBbox,
          )
          binder.update()
          binder.obj = objTarget
          binder.type = 'boundingBox'
          binder.oldX = binder.x
          binder.oldY = binder.y
          $('#boxbind').append(binder.graph)
          if (!objTarget.params.move) cursor('trash') // LIKE MEASURE ON PLAN
          if (objTarget.params.move) cursor('move')
        }
      } else {
        // DOOR, WINDOW, APERTURE.. -- OBJ WITHOUT BINDBOX (params.bindBox = False) -- !!!!
        if (typeof binder == 'undefined') {
          var wallList = editor.rayCastingWall(objTarget)
          if (wallList.length > 1) wallList = wallList[0]
          inWallRib(wallList)
          var thickObj = wallList.thick
          var sizeObj = objTarget.size

          binder = new editor.obj2D(
            'inWall',
            'socle',
            '',
            objTarget,
            objTarget.angle,
            0,
            sizeObj,
            'normal',
            thickObj,
          )
          binder.update()

          binder.oldXY = { x: objTarget.x, y: objTarget.y } // FOR OBJECT MENU
          $('#boxbind').append(binder.graph)
        } else {
          if (event.target == binder.graph.get(0).firstChild) {
            cursor('move')
            binder.graph.get(0).firstChild.setAttribute('class', 'circle_css_2')
            binder.type = 'obj'
            binder.obj = objTarget
          } else {
            cursor('default')
            binder.graph.get(0).firstChild.setAttribute('class', 'circle_css_1')
            binder.type = false
          }
        }
      }
    } else {
      if (typeof binder != 'undefined') {
        if (typeof binder.graph != 'undefined') binder.graph.remove()
        if (binder.type == 'node') binder.remove()
        delete binder
        cursor('default')
        rib()
      }
    }

    // BIND CIRCLE IF nearNode and GROUP ALL SAME XY SEG POINTS
    if ((wallNode = editor.nearWallNode(snap, 20))) {
      if (typeof binder == 'undefined' || binder.type == 'segment') {
        binder = qSVG.create('boxbind', 'circle', {
          id: 'circlebinder',
          class: 'circle_css_2',
          cx: wallNode.x,
          cy: wallNode.y,
          r: Rcirclebinder,
        })
        binder.data = wallNode
        binder.type = 'node'
        if ($('#linebinder').length) $('#linebinder').remove()
      } else {
        // REMAKE CIRCLE_CSS ON BINDER AND TAKE DATA SEG GROUP
        // if (typeof(binder) != 'undefined') {
        //     binder.attr({
        //         class: "circle_css_2"
        //     });
        // }
      }
      cursor('move')
    } else {
      if (typeof binder != 'undefined' && binder.type == 'node') {
        binder.remove()
        delete binder
        hideAllSize()
        cursor('default')
        rib()
      }
    }

    // BIND WALL WITH NEARPOINT function ---> WALL BINDER CREATION
    if ((wallBind = editor.rayCastingWalls(snap, WALLS))) {
      if (wallBind.length > 1) wallBind = wallBind[wallBind.length - 1]
      if (wallBind && typeof binder == 'undefined') {
        var objWall = editor.objFromWall(wallBind)
        if (objWall.length > 0) editor.inWallRib2(wallBind)
        binder = {}
        binder.wall = wallBind
        inWallRib(binder.wall)
        var line = qSVG.create('none', 'line', {
          x1: binder.wall.start.x,
          y1: binder.wall.start.y,
          x2: binder.wall.end.x,
          y2: binder.wall.end.y,
          'stroke-width': 5,
          stroke: '#5cba79',
        })
        var ball1 = qSVG.create('none', 'circle', {
          class: 'circle_css',
          cx: binder.wall.start.x,
          cy: binder.wall.start.y,
          r: Rcirclebinder / 1.8,
        })
        var ball2 = qSVG.create('none', 'circle', {
          class: 'circle_css',
          cx: binder.wall.end.x,
          cy: binder.wall.end.y,
          r: Rcirclebinder / 1.8,
        })
        binder.graph = qSVG.create('none', 'g')
        binder.graph.append(line)
        binder.graph.append(ball1)
        binder.graph.append(ball2)
        $('#boxbind').append(binder.graph)
        binder.type = 'segment'
        cursor('pointer')
      }
    } else {
      if ((wallBind = editor.nearWall(snap, 6))) {
        if (wallBind && typeof binder == 'undefined') {
          wallBind = wallBind.wall
          var objWall = editor.objFromWall(wallBind)
          if (objWall.length > 0) editor.inWallRib2(wallBind)
          binder = {}
          binder.wall = wallBind
          inWallRib(binder.wall)
          var line = qSVG.create('none', 'line', {
            x1: binder.wall.start.x,
            y1: binder.wall.start.y,
            x2: binder.wall.end.x,
            y2: binder.wall.end.y,
            'stroke-width': 5,
            stroke: '#5cba79',
          })
          var ball1 = qSVG.create('none', 'circle', {
            class: 'circle_css',
            cx: binder.wall.start.x,
            cy: binder.wall.start.y,
            r: Rcirclebinder / 1.8,
          })
          var ball2 = qSVG.create('none', 'circle', {
            class: 'circle_css',
            cx: binder.wall.end.x,
            cy: binder.wall.end.y,
            r: Rcirclebinder / 1.8,
          })
          binder.graph = qSVG.create('none', 'g')
          binder.graph.append(line)
          binder.graph.append(ball1)
          binder.graph.append(ball2)
          $('#boxbind').append(binder.graph)
          binder.type = 'segment'
          cursor('pointer')
        }
      } else {
        if (typeof binder != 'undefined' && binder.type == 'segment') {
          binder.graph.remove()
          delete binder
          hideAllSize()
          cursor('default')
          rib()
        }
      }
    }
  } else if (drag === 'on') {

    $('#lin').css('cursor', 'move')

    const xxx_mouse = event.pageX * scaleFactor - offset.left * scaleFactor + originX_viewbox
    const yyy_mouse = event.pageY * scaleFactor - offset.top * scaleFactor + originY_viewbox

    distX = (xxx_mouse - pox) * scaleFactor
    distY = (yyy_mouse - poy) * scaleFactor

    zoom_maker('zoomdrag', distX, distY)
  }
}

function mouseMove_mode_line_partition (event) {

  if (mode !== 'line_mode' && mode !== 'partition_mode') {
    return
  }

  if (action == 0) {
    snap = calcul_snap(event, 'off')
    cursor('grab')
    pox = snap.x
    poy = snap.y
    if ((helpConstruc = intersection(snap, 25))) {
      if (helpConstruc.distance < 10) {
        pox = helpConstruc.x
        poy = helpConstruc.y
        cursor('grab')
      } else {
        cursor('crosshair')
      }
    }
    if ((wallNode = editor.nearWallNode(snap, 20))) {
      pox = wallNode.x
      poy = wallNode.y
      cursor('grab')
      if (typeof binder == 'undefined') {
        binder = qSVG.create('boxbind', 'circle', {
          id: 'circlebinder',
          class: 'circle_css_2',
          cx: wallNode.x,
          cy: wallNode.y,
          r: Rcirclebinder / 1.5,
        })
      }
      intersectionOff()
    } else {
      if (!helpConstruc) cursor('crosshair')
      if (typeof binder != 'undefined') {
        if (binder.graph) binder.graph.remove()
        else binder.remove()
        delete binder
      }
    }
  } else if (action == 1) {
    snap = calcul_snap(event, grid_snap)
    x = snap.x
    y = snap.y
    starter = minMoveGrid(snap)

    if (!$('#line_construc').length) {
      if ((wallNode = editor.nearWallNode(snap, 20))) {
        pox = wallNode.x
        poy = wallNode.y

        wallStartConstruc = false
        if (wallNode.bestWall == WALLS.length - 1) {
          cursor('validation')
        } else {
          cursor('grab')
        }
      } else {
        cursor('crosshair')
      }
    }

    if (starter > grid) {
      if (!$('#line_construc').length) {
        var ws = 20
        if (mode == 'partition_mode') ws = 10
        lineconstruc = qSVG.create('boxbind', 'line', {
          id: 'line_construc',
          x1: pox,
          y1: poy,
          x2: x,
          y2: y,
          'stroke-width': ws,
          'stroke-linecap': 'butt',
          'stroke-opacity': 0.7,
          stroke: '#9fb2e2',
        })

        svgadd = qSVG.create('boxbind', 'line', {
          // ORANGE TEMP LINE FOR ANGLE 0 90 45 -+
          id: 'linetemp',
          x1: pox,
          y1: poy,
          x2: x,
          y2: y,
          stroke: 'transparent',
          'stroke-width': 0.5,
          'stroke-opacity': '0.9',
        })
      } else {
        // THE LINES AND BINDER ARE CREATED

        $('#linetemp').attr({
          x2: x,
          y2: y,
        })

        if ((helpConstrucEnd = intersection(snap, 10))) {
          x = helpConstrucEnd.x
          y = helpConstrucEnd.y
        }
        if ((wallEndConstruc = editor.nearWall(snap, 12))) {
          // TO SNAP SEGMENT TO FINALIZE X2Y2
          x = wallEndConstruc.x
          y = wallEndConstruc.y
          cursor('grab')
        } else {
          cursor('crosshair')
        }

        // nearNode helped to attach the end of the construc line
        if ((wallNode = editor.nearWallNode(snap, 20))) {
          if (typeof binder == 'undefined') {
            binder = qSVG.create('boxbind', 'circle', {
              id: 'circlebinder',
              class: 'circle_css_2',
              cx: wallNode.x,
              cy: wallNode.y,
              r: Rcirclebinder / 1.5,
            })
          }
          $('#line_construc').attr({
            x2: wallNode.x,
            y2: wallNode.y,
          })
          x = wallNode.x
          y = wallNode.y
          wallEndConstruc = true
          intersectionOff()
          if (
            wallNode.bestWall == WALLS.length - 1 &&
            document.getElementById('multi').checked
          ) {
            cursor('validation')
          } else {
            cursor('grab')
          }
        } else {
          if (typeof binder != 'undefined') {
            binder.remove()
            delete binder
          }
          if (wallEndConstruc === false) cursor('crosshair')
        }
        // LINETEMP AND LITLLE SNAPPING FOR HELP TO CONSTRUC ANGLE 0 90 45 *****************************************
        var fltt = qSVG.angle(pox, poy, x, y)
        var flt = Math.abs(fltt.deg)
        var coeff = fltt.deg / flt // -45 -> -1     45 -> 1
        var phi = poy - coeff * pox
        var Xdiag = (y - phi) / coeff
        if (typeof binder == 'undefined') {
          // HELP FOR H LINE
          var found = false
          if (flt < 15 && Math.abs(poy - y) < 25) {
            y = poy
            found = true
          } // HELP FOR V LINE
          if (flt > 75 && Math.abs(pox - x) < 25) {
            x = pox
            found = true
          } // HELP FOR DIAG LINE
          if (flt < 55 && flt > 35 && Math.abs(Xdiag - x) < 20) {
            x = Xdiag
            found = true
          }
          if (found) $('#line_construc').attr({ 'stroke-opacity': 1 })
          else $('#line_construc').attr({ 'stroke-opacity': 0.7 })
        }
        $('#line_construc').attr({
          x2: x,
          y2: y,
        })

        // SHOW WALL SIZE -------------------------------------------------------------------------
        var startText = qSVG.middle(pox, poy, x, y)
        var angleText = qSVG.angle(pox, poy, x, y)
        var valueText = (
          qSVG.measure(
            {
              x: pox,
              y: poy,
            },
            {
              x: x,
              y: y,
            },
          ) / 60
        ).toFixed(2)
        if (typeof lengthTemp == 'undefined') {
          lengthTemp = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'text',
          )
          lengthTemp.setAttributeNS(null, 'x', startText.x)
          lengthTemp.setAttributeNS(null, 'y', startText.y - 15)
          lengthTemp.setAttributeNS(null, 'text-anchor', 'middle')
          lengthTemp.setAttributeNS(null, 'stroke', 'none')
          lengthTemp.setAttributeNS(null, 'stroke-width', '0.6px')
          lengthTemp.setAttributeNS(null, 'fill', '#777777')
          lengthTemp.textContent = valueText + 'm'
          $('#boxbind').append(lengthTemp)
        }
        if (typeof lengthTemp != 'undefined' && valueText > 0.1) {
          lengthTemp.setAttributeNS(null, 'x', startText.x)
          lengthTemp.setAttributeNS(null, 'y', startText.y - 15)
          lengthTemp.setAttribute(
            'transform',
            'rotate(' +
              angleText.deg +
              ' ' +
              startText.x +
              ',' +
              startText.y +
              ')',
          )
          lengthTemp.textContent = valueText + ' m'
        }
        if (typeof lengthTemp != 'undefined' && valueText < 0.1) {
          lengthTemp.textContent = ''
        }
      }
    }
  }
}

function mouseMove_mode_door (event) {

  if (mode !== 'door_mode') {
    return
  }

  snap = calcul_snap(event, grid_snap)

  if ((wallSelect = editor.nearWall(snap))) {
    var wall = wallSelect.wall
    if (wall.type != 'separate') {
      if (typeof binder == 'undefined') {
        // family, classe, type, pos, angle, angleSign, size, hinge, thick
        binder = new editor.obj2D(
          'inWall',
          'doorWindow',
          modeOption,
          wallSelect,
          0,
          0,
          60,
          'normal',
          wall.thick,
        )
        var angleWall = qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = qSVG.vectorDeter(v1, v2)
        if (Math.sign(newAngle) == 1) {
          angleWall += 180
          binder.angleSign = 1
        }
        var startCoords = qSVG.middle(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        binder.x = startCoords.x
        binder.y = startCoords.y
        binder.angle = angleWall
        binder.update()
        $('#boxbind').append(binder.graph)
      } else {
        var angleWall = qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = qSVG.vectorDeter(v1, v2)
        binder.angleSign = 0
        if (Math.sign(newAngle) == 1) {
          binder.angleSign = 1
          angleWall += 180
        }

        var limits = limitObj(wall.equations.base, binder.size, wallSelect)
        if (
          qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
          qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) &&
          qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
          qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
        ) {
          binder.x = wallSelect.x
          binder.y = wallSelect.y
          binder.angle = angleWall
          binder.thick = wall.thick
          binder.limit = limits
          binder.update()
        }

        if (
          (wallSelect.x == wall.start.x && wallSelect.y == wall.start.y) ||
          (wallSelect.x == wall.end.x && wallSelect.y == wall.end.y)
        ) {
          if (
            qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
            qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[0].x
            binder.y = limits[0].y
          }
          if (
            qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
            qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[1].x
            binder.y = limits[1].y
          }
          binder.limit = limits
          binder.angle = angleWall
          binder.thick = wall.thick
          binder.update()
        }
      }
    }
  } else {
    if (typeof binder != 'undefined') {
      binder.graph.remove()
      delete binder
    }
  }
}

function mouseMove_mode_network (event) {
  if (mode !== 'network_mode') {
    return
  }
  snap = calcul_snap(event, grid_snap)

  if ((wallSelect = editor.nearWall(snap))) {
    var wall = wallSelect.wall
    if (wall.type != 'separate') {
      if (typeof binder == 'undefined') {
        // family, classe, type, pos, angle, angleSign, size, hinge, thick
        binder = new editor.obj2D(
          'inWall',
          'network',
          modeOption,
          wallSelect,
          0,
          0,
          60,
          'normal',
          wall.thick,
        )
        var angleWall = qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = qSVG.vectorDeter(v1, v2)
        if (Math.sign(newAngle) == 1) {
          angleWall += 180
          binder.angleSign = 1
        }
        var startCoords = qSVG.middle(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        binder.x = startCoords.x
        binder.y = startCoords.y
        binder.angle = angleWall
        binder.update()
        $('#boxbind').append(binder.graph)
      } else {
        var angleWall = qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = qSVG.vectorDeter(v1, v2)
        binder.angleSign = 0
        if (Math.sign(newAngle) == 1) {
          binder.angleSign = 1
          angleWall += 180
        }

        var limits = limitObj(wall.equations.base, binder.size, wallSelect)
        if (
          qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
          qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) &&
          qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
          qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
        ) {
          binder.x = wallSelect.x
          binder.y = wallSelect.y
          binder.angle = angleWall
          binder.thick = wall.thick
          binder.limit = limits
          binder.update()
        }

        if (
          (wallSelect.x == wall.start.x && wallSelect.y == wall.start.y) ||
          (wallSelect.x == wall.end.x && wallSelect.y == wall.end.y)
        ) {
          if (
            qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
            qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[0].x
            binder.y = limits[0].y
          }
          if (
            qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
            qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[1].x
            binder.y = limits[1].y
          }
          binder.limit = limits
          binder.angle = angleWall
          binder.thick = wall.thick
          binder.update()
        }
      }
    }
  } else {
    if (typeof binder != 'undefined') {
      binder.graph.remove()
      delete binder
    }
  }
}

function mouseMove_mode_electrical (event) {
  if (mode !== 'electrical_mode') {
    return
  }
  snap = calcul_snap(event, grid_snap)

  if ((wallSelect = editor.nearWall(snap))) {
    var wall = wallSelect.wall
    if (wall.type != 'separate') {
      if (typeof binder == 'undefined') {
        // family, classe, type, pos, angle, angleSign, size, hinge, thick
        binder = new editor.obj2D(
          'inWall',
          'electrical',
          modeOption,
          wallSelect,
          0,
          0,
          60,
          'normal',
          wall.thick,
        )
        var angleWall = qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = qSVG.vectorDeter(v1, v2)
        if (Math.sign(newAngle) == 1) {
          angleWall += 180
          binder.angleSign = 1
        }
        var startCoords = qSVG.middle(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        binder.x = startCoords.x
        binder.y = startCoords.y
        binder.angle = angleWall
        binder.update()
        $('#boxbind').append(binder.graph)
      } else {
        var angleWall = qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = qSVG.vectorDeter(v1, v2)
        binder.angleSign = 0
        if (Math.sign(newAngle) == 1) {
          binder.angleSign = 1
          angleWall += 180
        }

        var limits = limitObj(wall.equations.base, binder.size, wallSelect)
        if (
          qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
          qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) &&
          qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
          qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
        ) {
          binder.x = wallSelect.x
          binder.y = wallSelect.y
          binder.angle = angleWall
          binder.thick = wall.thick
          binder.limit = limits
          binder.update()
        }

        if (
          (wallSelect.x == wall.start.x && wallSelect.y == wall.start.y) ||
          (wallSelect.x == wall.end.x && wallSelect.y == wall.end.y)
        ) {
          if (
            qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
            qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[0].x
            binder.y = limits[0].y
          }
          if (
            qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
            qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[1].x
            binder.y = limits[1].y
          }
          binder.limit = limits
          binder.angle = angleWall
          binder.thick = wall.thick
          binder.update()
        }
      }
    }
  } else {
    if (typeof binder != 'undefined') {
      binder.graph.remove()
      delete binder
    }
  }
}

function mouseMove_mode_distance (event) {
  if (mode !== 'distance_mode') {
    return
  }

  snap = calcul_snap(event, grid_snap)
  if (typeof binder == 'undefined') {
    cross = qSVG.create('boxbind', 'path', {
      d: 'M-3000,0 L3000,0 M0,-3000 L0,3000',
      'stroke-width': 0.5,
      'stroke-opacity': '0.8',
      stroke: '#e2b653',
      fill: '#e2b653',
    })
    binder = new editor.obj2D(
      'free',
      'measure',
      '',
      { x: 0, y: 0 },
      0,
      0,
      0,
      'normal',
      0,
      '',
    )
    labelMeasure = qSVG.create('none', 'text', {
      x: 0,
      y: -10,
      'font-size': '1.2em',
      stroke: '#ffffff',
      'stroke-width': '0.4px',
      'font-family': 'roboto',
      'text-anchor': 'middle',
      fill: '#3672d9',
    })
    binder.graph.append(labelMeasure)
    $('#boxbind').append(binder.graph)
  } else {
    x = snap.x
    y = snap.y
    cross.attr({
      transform: 'translate(' + snap.x + ',' + snap.y + ')',
    })
    if (action == 1) {
      var startText = qSVG.middle(pox, poy, x, y)
      var angleText = qSVG.angle(pox, poy, x, y)
      var valueText = qSVG.measure(
        {
          x: pox,
          y: poy,
        },
        {
          x: x,
          y: y,
        },
      )
      binder.size = valueText
      binder.x = startText.x
      binder.y = startText.y
      binder.angle = angleText.deg
      valueText = (valueText / meter).toFixed(2) + ' m'
      //labelMeasure.context.textContent = valueText;
      labelMeasure[0].textContent = valueText

      binder.update()
    }
  }
}

// "cut" functionality
function mouseMove_mode_node (event) {
  if (mode !== 'node_mode') {
    return
  }

  snap = calcul_snap(event, grid_snap)

  if (typeof binder == 'undefined') {
    if ((addNode = editor.nearWall(snap, 30))) {
      var x2 = addNode.wall.end.x
      var y2 = addNode.wall.end.y
      var x1 = addNode.wall.start.x
      var y1 = addNode.wall.start.y
      angleWall = qSVG.angle(x1, y1, x2, y2)
      binder = qSVG.create('boxbind', 'path', {
        id: 'circlebinder',
        d: 'M-20,-10 L-13,0 L-20,10 Z M-13,0 L13,0 M13,0 L20,-10 L20,10 Z',
        stroke: '#5cba79',
        fill: '#5cba79',
        'stroke-width': '1.5px',
      })
      binder.attr({
        transform:
          'translate(' +
          addNode.x +
          ',' +
          addNode.y +
          ') rotate(' +
          (angleWall.deg + 90) +
          ',0,0)',
      })
      binder.data = addNode
      binder.x1 = x1
      binder.x2 = x2
      binder.y1 = y1
      binder.y2 = y2
    }
  } else {
    if ((addNode = editor.nearWall(snap, 30))) {
      if (addNode) {
        var x2 = addNode.wall.end.x
        var y2 = addNode.wall.end.y
        var x1 = addNode.wall.start.x
        var y1 = addNode.wall.start.y
        angleWall = qSVG.angle(x1, y1, x2, y2)
        binder.attr({
          transform:
            'translate(' +
            addNode.x +
            ',' +
            addNode.y +
            ') rotate(' +
            (angleWall.deg + 90) +
            ',0,0)',
        })
        binder.data = addNode
      } else {
        binder.remove()
        delete binder
      }
    } else {
      binder.remove()
      delete binder
    }
  }
}

// This is for when an SVG element is being interacted with
function mouseMove_mode_bind (event) {
  if (mode !== 'bind_mode') {
    return
  }
  snap = calcul_snap(event, grid_snap)

  if (binder.type == 'node') {
    var coords = snap
    var magnetic = false
    for (var k in wallListRun) {
      if (isObjectsEquals(wallListRun[k].end, binder.data)) {
        if (Math.abs(wallListRun[k].start.x - snap.x) < 20) {
          coords.x = wallListRun[k].start.x
          magnetic = 'H'
        }
        if (Math.abs(wallListRun[k].start.y - snap.y) < 20) {
          coords.y = wallListRun[k].start.y
          magnetic = 'V'
        }
      }
      if (isObjectsEquals(wallListRun[k].start, binder.data)) {
        if (Math.abs(wallListRun[k].end.x - snap.x) < 20) {
          coords.x = wallListRun[k].end.x
          magnetic = 'H'
        }
        if (Math.abs(wallListRun[k].end.y - snap.y) < 20) {
          coords.y = wallListRun[k].end.y
          magnetic = 'V'
        }
      }
    }

    if ((nodeMove = editor.nearWallNode(snap, 15, wallListRun))) {
      coords.x = nodeMove.x
      coords.y = nodeMove.y
      $('#circlebinder').attr({
        class: 'circleGum',
        cx: coords.x,
        cy: coords.y,
      })
      cursor('grab')
    } else {
      if (magnetic != false) {
        if (magnetic == 'H') snap.x = coords.x
        else snap.y = coords.y
      }
      if ((helpConstruc = intersection(snap, 10, wallListRun))) {
        coords.x = helpConstruc.x
        coords.y = helpConstruc.y
        snap.x = helpConstruc.x
        snap.y = helpConstruc.y
        if (magnetic != false) {
          if (magnetic == 'H') snap.x = coords.x
          else snap.y = coords.y
        }
        cursor('grab')
      } else {
        cursor('move')
      }
      binder.remove()
      //$('#circlebinder').attr({"class": "circle_css", cx: coords.x, cy: coords.y});
    }
    for (var k in wallListRun) {
      if (isObjectsEquals(wallListRun[k].start, binder.data)) {
        wallListRun[k].start.x = coords.x
        wallListRun[k].start.y = coords.y
      }
      if (isObjectsEquals(wallListRun[k].end, binder.data)) {
        wallListRun[k].end.x = coords.x
        wallListRun[k].end.y = coords.y
      }
    }
    binder.data = coords
    editor.wallsComputing(WALLS, false) // UPDATE FALSE

    for (var k in wallListObj) {
      var wall = wallListObj[k].wall
      var objTarget = wallListObj[k].obj
      var angleWall = qSVG.angleDeg(
        wall.start.x,
        wall.start.y,
        wall.end.x,
        wall.end.y,
      )
      var limits = limitObj(
        wall.equations.base,
        2 * wallListObj[k].distance,
        wallListObj[k].from,
      ) // COORDS OBJ AFTER ROTATION
      var indexLimits = 0
      if (
        qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
        qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
      )
        indexLimits = 1
      // NEW COORDS OBJDATA[obj]
      objTarget.x = limits[indexLimits].x
      objTarget.y = limits[indexLimits].y
      objTarget.angle = angleWall
      if (objTarget.angleSign == 1) objTarget.angle = angleWall + 180

      var limitBtwn = limitObj(wall.equations.base, objTarget.size, objTarget) // OBJ SIZE OK BTWN xy1/xy2

      if (
        qSVG.btwn(limitBtwn[0].x, wall.start.x, wall.end.x) &&
        qSVG.btwn(limitBtwn[0].y, wall.start.y, wall.end.y) &&
        qSVG.btwn(limitBtwn[1].x, wall.start.x, wall.end.x) &&
        qSVG.btwn(limitBtwn[1].y, wall.start.y, wall.end.y)
      ) {
        objTarget.limit = limitBtwn
        objTarget.update()
      } else {
        objTarget.graph.remove()
        delete objTarget
        OBJDATA.splice(wall.indexObj, 1)
        wallListObj.splice(k, 1)
      }
    }
    // for (k in toClean)
    $('#boxRoom').empty()
    $('#boxSurface').empty()
    Rooms = qSVG.polygonize(WALLS)
    editor.roomMaker(Rooms)
  }

  // WALL MOVING ----BINDER TYPE SEGMENT-------- FUNCTION FOR H,V and Calculate Vectorial Translation

  if (binder.type == 'segment' && action == 1) {
    rib()

    if (equation2.A == 'v') {
      equation2.B = snap.x
    } else if (equation2.A == 'h') {
      equation2.B = snap.y
    } else {
      equation2.B = snap.y - snap.x * equation2.A
    }

    var intersection1 = qSVG.intersectionOfEquations(
      equation1,
      equation2,
      'obj',
    )
    var intersection2 = qSVG.intersectionOfEquations(
      equation2,
      equation3,
      'obj',
    )
    var intersection3 = qSVG.intersectionOfEquations(
      equation1,
      equation3,
      'obj',
    )

    if (binder.wall.parent != null) {
      if (isObjectsEquals(binder.wall.parent.end, binder.wall.start))
        binder.wall.parent.end = intersection1
      else if (isObjectsEquals(binder.wall.parent.start, binder.wall.start))
        binder.wall.parent.start = intersection1
      else binder.wall.parent.end = intersection1
    }

    if (binder.wall.child != null) {
      if (isObjectsEquals(binder.wall.child.start, binder.wall.end))
        binder.wall.child.start = intersection2
      else if (isObjectsEquals(binder.wall.child.end, binder.wall.end))
        binder.wall.child.end = intersection2
      else binder.wall.child.start = intersection2
    }

    binder.wall.start = intersection1
    binder.wall.end = intersection2
    binder.graph.remove()
    // binder.graph[0].children[0].setAttribute("x1",intersection1.x);
    // binder.graph[0].children[0].setAttribute("x2",intersection2.x);
    // binder.graph[0].children[0].setAttribute("y1",intersection1.y);
    // binder.graph[0].children[0].setAttribute("y2",intersection2.y);
    // binder.graph[0].children[1].setAttribute("cx",intersection1.x);
    // binder.graph[0].children[1].setAttribute("cy",intersection1.y);
    // binder.graph[0].children[2].setAttribute("cx",intersection2.x);
    // binder.graph[0].children[2].setAttribute("cy",intersection2.y);

    // THE EQ FOLLOWED BY eq (PARENT EQ1 --- CHILD EQ3)
    if (equation1.follow != undefined) {
      if (!qSVG.rayCasting(intersection1, equation1.backUp.coords)) {
        // IF OUT OF WALL FOLLOWED
        var distanceFromStart = qSVG.gap(
          equation1.backUp.start,
          intersection1,
        )
        var distanceFromEnd = qSVG.gap(equation1.backUp.end, intersection1)
        if (distanceFromStart > distanceFromEnd) {
          // NEAR FROM End
          equation1.follow.end = intersection1
        } else {
          equation1.follow.start = intersection1
        }
      } else {
        equation1.follow.end = equation1.backUp.end
        equation1.follow.start = equation1.backUp.start
      }
    }
    if (equation3.follow != undefined) {
      if (!qSVG.rayCasting(intersection2, equation3.backUp.coords)) {
        // IF OUT OF WALL FOLLOWED
        var distanceFromStart = qSVG.gap(
          equation3.backUp.start,
          intersection2,
        )
        var distanceFromEnd = qSVG.gap(equation3.backUp.end, intersection2)
        if (distanceFromStart > distanceFromEnd) {
          // NEAR FROM End
          equation3.follow.end = intersection2
        } else {
          equation3.follow.start = intersection2
        }
      } else {
        equation3.follow.end = equation3.backUp.end
        equation3.follow.start = equation3.backUp.start
      }
    }

    // EQ FOLLOWERS WALL MOVING
    for (var i = 0; i < equationFollowers.length; i++) {
      var intersectionFollowers = qSVG.intersectionOfEquations(
        equationFollowers[i].eq,
        equation2,
        'obj',
      )
      if (
        qSVG.btwn(
          intersectionFollowers.x,
          binder.wall.start.x,
          binder.wall.end.x,
          'round',
        ) &&
        qSVG.btwn(
          intersectionFollowers.y,
          binder.wall.start.y,
          binder.wall.end.y,
          'round',
        )
      ) {
        var size = qSVG.measure(
          equationFollowers[i].wall.start,
          equationFollowers[i].wall.end,
        )
        if (equationFollowers[i].type == 'start') {
          equationFollowers[i].wall.start = intersectionFollowers
          if (size < 5) {
            if (equationFollowers[i].wall.child == null) {
              WALLS.splice(WALLS.indexOf(equationFollowers[i].wall), 1)
              equationFollowers.splice(i, 1)
            }
          }
        }
        if (equationFollowers[i].type == 'end') {
          equationFollowers[i].wall.end = intersectionFollowers
          if (size < 5) {
            if (equationFollowers[i].wall.parent == null) {
              WALLS.splice(WALLS.indexOf(equationFollowers[i].wall), 1)
              equationFollowers.splice(i, 1)
            }
          }
        }
      }
    }
    // WALL COMPUTING, BLOCK FAMILY OF BINDERWALL IF NULL (START OR END) !!!!!
    editor.wallsComputing(WALLS, 'move')
    Rooms = qSVG.polygonize(WALLS)

    // OBJDATA(s) FOLLOW 90° EDGE SELECTED
    for (var rp = 0; rp < equationsObj.length; rp++) {
      var objTarget = equationsObj[rp].obj
      var intersectionObj = qSVG.intersectionOfEquations(
        equationsObj[rp].eq,
        equation2,
      )
      // NEW COORDS OBJDATA[o]
      objTarget.x = intersectionObj[0]
      objTarget.y = intersectionObj[1]
      var limits = limitObj(equation2, objTarget.size, objTarget)
      if (
        qSVG.btwn(limits[0].x, binder.wall.start.x, binder.wall.end.x) &&
        qSVG.btwn(limits[0].y, binder.wall.start.y, binder.wall.end.y) &&
        qSVG.btwn(limits[1].x, binder.wall.start.x, binder.wall.end.x) &&
        qSVG.btwn(limits[1].y, binder.wall.start.y, binder.wall.end.y)
      ) {
        objTarget.limit = limits
        objTarget.update()
      }
    }
    // DELETING ALL OBJECT "INWALL" OVERSIZED INTO ITS EDGE (EDGE BY EDGE CONTROL)
    for (var k in WALLS) {
      var objWall = editor.objFromWall(WALLS[k]) // LIST OBJ ON EDGE
      for (var ob in objWall) {
        var objTarget = objWall[ob]
        var eq = editor.createEquationFromWall(WALLS[k])
        var limits = limitObj(eq, objTarget.size, objTarget)
        if (
          !qSVG.btwn(limits[0].x, WALLS[k].start.x, WALLS[k].end.x) ||
          !qSVG.btwn(limits[0].y, WALLS[k].start.y, WALLS[k].end.y) ||
          !qSVG.btwn(limits[1].x, WALLS[k].start.x, WALLS[k].end.x) ||
          !qSVG.btwn(limits[1].y, WALLS[k].start.y, WALLS[k].end.y)
        ) {
          objTarget.graph.remove()
          delete objTarget
          var indexObj = OBJDATA.indexOf(objTarget)
          OBJDATA.splice(indexObj, 1)
        }
      }
    }

    equationsObj = [] // REINIT eqObj -> MAYBE ONE OR PLUS OF OBJDATA REMOVED !!!!
    var objWall = editor.objFromWall(binder.wall) // LIST OBJ ON EDGE
    for (var ob = 0; ob < objWall.length; ob++) {
      var objTarget = objWall[ob]
      equationsObj.push({
        obj: objTarget,
        wall: binder.wall,
        eq: qSVG.perpendicularEquation(equation2, objTarget.x, objTarget.y),
      })
    }

    $('#boxRoom').empty()
    $('#boxSurface').empty()
    editor.roomMaker(Rooms)
    $('#lin').css('cursor', 'pointer')
  }

  // **********************************************************************
  // ----------------------  BOUNDING BOX ------------------------------
  // **********************************************************************
  // binder.obj.params.move ---> FOR MEASURE DONT MOVE
  if (binder.type == 'boundingBox' && action == 1 && binder.obj.params.move) {
    binder.x = snap.x
    binder.y = snap.y
    binder.obj.x = snap.x
    binder.obj.y = snap.y
    binder.obj.update()
    binder.update()
  }

  // **********************************************************************
  // OBJ MOVING
  // **********************************************************************
  if (binder.type == 'obj' && action == 1) {
    if ((wallSelect = editor.nearWall(snap))) {
      if (wallSelect.wall.type != 'separate') {
        inWallRib(wallSelect.wall)

        var objTarget = binder.obj
        var wall = wallSelect.wall
        var angleWall = qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = qSVG.vectorDeter(v1, v2)
        binder.angleSign = 0
        objTarget.angleSign = 0
        if (Math.sign(newAngle) == 1) {
          angleWall += 180
          binder.angleSign = 1
          objTarget.angleSign = 1
        }
        var limits = limitObj(wall.equations.base, binder.size, wallSelect)
        if (
          qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
          qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) &&
          qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
          qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
        ) {
          binder.x = wallSelect.x
          binder.y = wallSelect.y
          binder.angle = angleWall
          binder.thick = wall.thick
          objTarget.x = wallSelect.x
          objTarget.y = wallSelect.y
          objTarget.angle = angleWall
          objTarget.thick = wall.thick
          objTarget.limit = limits
          binder.update()
          objTarget.update()
        }

        if (
          (wallSelect.x == wall.start.x && wallSelect.y == wall.start.y) ||
          (wallSelect.x == wall.end.x && wallSelect.y == wall.end.y)
        ) {
          if (
            qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
            qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[0].x
            binder.y = limits[0].y
            objTarget.x = limits[0].x
            objTarget.y = limits[0].y
            objTarget.limit = limits
          }
          if (
            qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
            qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[1].x
            binder.y = limits[1].y
            objTarget.x = limits[1].x
            objTarget.y = limits[1].y
            objTarget.limit = limits
          }
          binder.angle = angleWall
          binder.thick = wall.thick
          objTarget.angle = angleWall
          objTarget.thick = wall.thick
          binder.update()
          objTarget.update()
        }
      }
    }
  }

  if (binder.type != 'obj' && binder.type != 'segment') rib()
}

function mouseMove_mode_text (event) {
  if (mode !== 'text_mode') {
    return
  }

  snap = calcul_snap(event, grid_snap)
  if (action == 0) {
    cursor('text')
  } else {
    cursor('none')
  }
}

function mouseMove_mode_object (event) {
  if (mode !== 'object_mode') {
    return
  }

  snap = calcul_snap(event, grid_snap)
  if (typeof binder == 'undefined') {
    $('#object_list').hide(200)
    if (modeOption == 'simpleStair')
      binder = new editor.obj2D(
        'free',
        'stair',
        'simpleStair',
        snap,
        0,
        0,
        0,
        'normal',
        0,
        15,
      )
    else {
      var typeObj = modeOption
      binder = new editor.obj2D(
        'free',
        'energy',
        typeObj,
        snap,
        0,
        0,
        0,
        'normal',
        0,
      )
    }

    $('#boxbind').append(binder.graph)
  } else {
    if (
      (binder.family != 'stick' && binder.family != 'collision') ||
      WALLS.length == 0
    ) {
      binder.x = snap.x
      binder.y = snap.y
      binder.oldX = binder.x
      binder.oldY = binder.y
      binder.update()
    }
    if (binder.family == 'collision') {
      var found = false

      if (editor.rayCastingWalls({ x: binder.bbox.left, y: binder.bbox.top }))
        found = true
      if (
        !found &&
        editor.rayCastingWalls({ x: binder.bbox.left, y: binder.bbox.bottom })
      )
        found = true
      if (
        !found &&
        editor.rayCastingWalls({ x: binder.bbox.right, y: binder.bbox.top })
      )
        found = true
      if (
        !found &&
        editor.rayCastingWalls({
          x: binder.bbox.right,
          y: binder.bbox.bottom,
        })
      )
        found = true

      if (!found) {
        binder.x = snap.x
        binder.y = snap.y
        binder.oldX = binder.x
        binder.oldY = binder.y
        binder.update()
      } else {
        binder.x = binder.oldX
        binder.y = binder.oldY
        binder.update()
      }
    }
    if (binder.family == 'stick') {
      pos = editor.stickOnWall(snap)
      binder.oldX = pos.x
      binder.oldY = pos.y
      var angleWall = qSVG.angleDeg(
        pos.wall.start.x,
        pos.wall.start.y,
        pos.wall.end.x,
        pos.wall.end.y,
      )
      var v1 = qSVG.vectorXY(
        { x: pos.wall.start.x, y: pos.wall.start.y },
        { x: pos.wall.end.x, y: pos.wall.end.y },
      )
      var v2 = qSVG.vectorXY({ x: pos.wall.end.x, y: pos.wall.end.y }, snap)
      binder.x =
        pos.x -
        (Math.sin(pos.wall.angle * ((360 / 2) * Math.PI)) * binder.thick) / 2
      binder.y =
        pos.y -
        (Math.cos(pos.wall.angle * ((360 / 2) * Math.PI)) * binder.thick) / 2
      var newAngle = qSVG.vectorDeter(v1, v2)
      if (Math.sign(newAngle) == 1) {
        angleWall += 180
        binder.x =
          pos.x +
          (Math.sin(pos.wall.angle * ((360 / 2) * Math.PI)) * binder.thick) /
            2
        binder.y =
          pos.y +
          (Math.cos(pos.wall.angle * ((360 / 2) * Math.PI)) * binder.thick) /
            2
      }
      binder.angle = angleWall
      binder.update()
    }
  }
}

function mouseMove_mode_room (event) {
  if (mode !== 'room_mode') {
    return
  }

  snap = calcul_snap(event, grid_snap)

  var roomTarget

  if ((roomTarget = editor.rayCastingRoom(snap))) {
    if (typeof binder != 'undefined') {
      binder.remove()
      delete binder
    }

    var pathSurface = roomTarget.coords
    var pathCreate = 'M' + pathSurface[0].x + ',' + pathSurface[0].y
    for (var p = 1; p < pathSurface.length - 1; p++) {
      pathCreate =
        pathCreate + ' ' + 'L' + pathSurface[p].x + ',' + pathSurface[p].y
    }
    pathCreate = pathCreate + 'Z'

    if (roomTarget.inside.length > 0) {
      for (var ins = 0; ins < roomTarget.inside.length; ins++) {
        pathCreate =
          pathCreate +
          ' M' +
          Rooms.polygons[roomTarget.inside[ins]].coords[
            Rooms.polygons[roomTarget.inside[ins]].coords.length - 1
          ].x +
          ',' +
          Rooms.polygons[roomTarget.inside[ins]].coords[
            Rooms.polygons[roomTarget.inside[ins]].coords.length - 1
          ].y
        for (
          var free = Rooms.polygons[roomTarget.inside[ins]].coords.length - 2;
          free > -1;
          free--
        ) {
          pathCreate =
            pathCreate +
            ' L' +
            Rooms.polygons[roomTarget.inside[ins]].coords[free].x +
            ',' +
            Rooms.polygons[roomTarget.inside[ins]].coords[free].y
        }
      }
    }

    binder = qSVG.create('boxbind', 'path', {
      id: 'roomSelected',
      d: pathCreate,
      fill: '#c9c14c',
      'fill-opacity': 0.5,
      stroke: '#c9c14c',
      'fill-rule': 'evenodd',
      'stroke-width': 3,
    })
    binder.type = 'room'
    binder.area = roomTarget.area
    binder.id = ROOM.indexOf(roomTarget)
  } else {
    if (typeof binder != 'undefined') {
      binder.remove()
      delete binder
    }
  }
}

function mouseMoveHandler(event) {

  event.preventDefault()

  $('.sub').hide(100)

  mouseMove_mode_select(event)
  mouseMove_mode_line_partition(event)
  mouseMove_mode_door(event)
  mouseMove_mode_electrical(event)
  mouseMove_mode_network(event)
  mouseMove_mode_distance(event)
  mouseMove_mode_node(event)
  mouseMove_mode_bind(event)
  mouseMove_mode_text(event)
  mouseMove_mode_object(event)
  mouseMove_mode_room(event)
}

function mouseUp_mode_select (event) {
  if (mode !== 'select_mode') {
    return
  }

  if (typeof binder != 'undefined') {
    binder.remove()
    delete binder
    save()
  }
}

function mouseUp_mode_line_partition (event) {
  if (mode !== 'line_mode' && mode !== 'partition_mode') {
    return
  }

  $('#linetemp').remove() // DEL LINE HELP CONSTRUC 0 45 90
  intersectionOff()

  var sizeWall = qSVG.measure({ x: x, y: y }, { x: pox, y: poy })
  sizeWall = sizeWall / meter
  if ($('#line_construc').length && sizeWall > 0.3) {
    var sizeWall = wallSize
    if (mode == 'partition_mode') sizeWall = partitionSize
    var wall = new editor.wall(
      { x: pox, y: poy },
      { x: x, y: y },
      'normal',
      sizeWall,
    )
    WALLS.push(wall)
    editor.architect(WALLS)

    if (document.getElementById('multi').checked && !wallEndConstruc) {
      cursor('validation')
      action = 1
    } else action = 0
    $('#boxinfo').html(
      "Wall added <span style='font-size:0.6em'>Moy. " +
        (qSVG.measure({ x: pox, y: poy }, { x: x, y: y }) / 60).toFixed(2) +
        ' m</span>',
    )
    $('#line_construc').remove() // DEL LINE CONSTRUC HELP TO VIEW NEW SEG PATH
    lengthTemp.remove()
    delete lengthTemp
    construc = 0
    if (wallEndConstruc) action = 0
    delete wallEndConstruc
    pox = x
    poy = y
    save()
  } else {
    action = 0
    construc = 0
    $('#boxinfo').html('Select mode')
    fonc_button('select_mode')
    if (typeof binder != 'undefined') {
      binder.remove()
      delete binder
    }
    snap = calcul_snap(event, grid_snap)
    pox = snap.x
    poy = snap.y
  }
}

function mouseUp_mode_electrical (event) {
  if (mode !== 'electrical_mode') {
    return
  }

  if (typeof binder == 'undefined') {
    $('#boxinfo').html('The plan currently contains no wall.')
    fonc_button('select_mode')
    return false
  }
  OBJDATA.push(binder)
  binder.graph.remove()
  $('#boxcarpentry').append(OBJDATA[OBJDATA.length - 1].graph)
  delete binder
  $('#boxinfo').html('Element added')
  fonc_button('select_mode')
  save()
}

function mouseUp_mode_network (event) {
  if (mode !== 'network_mode') {
    return
  }

  if (typeof binder == 'undefined') {
    $('#boxinfo').html('The plan currently contains no wall.')
    fonc_button('select_mode')
    return false
  }
  OBJDATA.push(binder)
  binder.graph.remove()
  $('#boxcarpentry').append(OBJDATA[OBJDATA.length - 1].graph)
  delete binder
  $('#boxinfo').html('Element added')
  fonc_button('select_mode')
  save()
}

function mouseUp_mode_door (event) {
  if (mode !== 'door_mode') {
    return
  }

  if (typeof binder == 'undefined') {
    $('#boxinfo').html('The plan currently contains no wall.')
    fonc_button('select_mode')
    return false
  }
  OBJDATA.push(binder)
  binder.graph.remove()
  $('#boxcarpentry').append(OBJDATA[OBJDATA.length - 1].graph)
  delete binder
  $('#boxinfo').html('Element added')
  fonc_button('select_mode')
  save()
}

function mouseUp_mode_distance (event) {
  if (mode !== 'distance_mode') {
    return
  }

  if (action == 1) {
    action = 0
    // MODIFY BBOX FOR BINDER ZONE (TXT)
    var bbox = labelMeasure.get(0).getBoundingClientRect()
    bbox.x = bbox.x * scaleFactor - offset.left * scaleFactor + originX_viewbox
    bbox.y = bbox.y * scaleFactor - offset.top * scaleFactor + originY_viewbox
    bbox.origin = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 }
    binder.bbox = bbox
    binder.realBbox = [
      { x: binder.bbox.x, y: binder.bbox.y },
      { x: binder.bbox.x + binder.bbox.width, y: binder.bbox.y },
      {
        x: binder.bbox.x + binder.bbox.width,
        y: binder.bbox.y + binder.bbox.height,
      },
      { x: binder.bbox.x, y: binder.bbox.y + binder.bbox.height },
    ]
    binder.size = binder.bbox.width
    binder.thick = binder.bbox.height
    binder.graph.append(labelMeasure)
    OBJDATA.push(binder)
    binder.graph.remove()
    $('#boxcarpentry').append(OBJDATA[OBJDATA.length - 1].graph)
    delete binder
    delete labelMeasure
    cross.remove()
    delete cross
    $('#boxinfo').html('Measure added')
    fonc_button('select_mode')
    save()
  }
}

// "cut" functionality
function mouseUp_mode_node (event) {
  if (mode !== 'node_mode') {
    return
  }

  if (typeof binder != 'undefined') {
    // ALSO ON MOUSEUP WITH HAVE CIRCLEBINDER ON ADDPOINT
    var newWall = new editor.wall(
      { x: binder.data.x, y: binder.data.y },
      binder.data.wall.end,
      'normal',
      binder.data.wall.thick,
    )
    WALLS.push(newWall)
    binder.data.wall.end = { x: binder.data.x, y: binder.data.y }
    binder.remove()
    delete binder
    editor.architect(WALLS)
    save()
  }

  fonc_button('select_mode')
}

// This is for when an SVG element is being interacted with
function mouseUp_mode_bind (event) {
  if (mode !== 'bind_mode') {
    return
  }
  action = 0
  construc = 0 // CONSTRUC 0 TO FREE BINDER GROUP NODE WALL MOVING
  if (typeof binder != 'undefined') {
    fonc_button('select_mode')
    if (binder.type == 'node') {
    } // END BINDER NODE

    if (binder.type == 'segment') {
      var found = false
      if (binder.wall.start == binder.before) {
        found = true
      }

      if (found) {
        $('#panel').hide(100)
        var objWall = editor.objFromWall(wallBind)
        $('#boxinfo').html(
          'Modify a wall<br/><span style="font-size:0.7em;color:#de9b43">This wall can\'t become a separation (contains doors or windows) !</span>',
        )
        if (objWall.length > 0) $('#separate').hide()
        else if (binder.wall.type == 'separate') {
          $('#separate').hide()
          $('#rangeThick').hide()
          $('#recombine').show()
          $('#cutWall').hide()
          document.getElementById('titleWallTools').textContent =
            'Modify the separation'
        } else {
          $('#cutWall').show()
          $('#separate').show()
          $('#rangeThick').show()
          $('#recombine').hide()
          document.getElementById('titleWallTools').textContent =
            'Modify the wall'
          $('#boxinfo').html('Modify the wall')
        }
        $('#wallTools').show(200)
        document.getElementById('wallWidth').setAttribute('min', 7)
        document.getElementById('wallWidth').setAttribute('max', 50)
        document.getElementById('wallWidthScale').textContent = '7-50'
        document.getElementById('wallWidth').value = binder.wall.thick
        document.getElementById('wallWidthVal').textContent =
          binder.wall.thick
        mode = 'edit_wall_mode'
      }
      delete equation1
      delete equation2
      delete equation3
      delete intersectionFollowers
    }

    if (binder.type == 'obj') {
      var moveObj =
        Math.abs(binder.oldXY.x - binder.x) +
        Math.abs(binder.oldXY.y - binder.y)
      if (moveObj < 1) {
        $('#panel').hide(100)
        $('#objTools').show('200', function () {
          $('#lin').css('cursor', 'default')
          $('#boxinfo').html('Config. the door/window')
          document
            .getElementById('doorWindowWidth')
            .setAttribute('min', binder.obj.params.resizeLimit.width.min)
          document
            .getElementById('doorWindowWidth')
            .setAttribute('max', binder.obj.params.resizeLimit.width.max)
          document.getElementById('doorWindowWidthScale').textContent =
            binder.obj.params.resizeLimit.width.min +
            '-' +
            binder.obj.params.resizeLimit.width.max
          document.getElementById('doorWindowWidth').value = binder.obj.size
          document.getElementById('doorWindowWidthVal').textContent =
            binder.obj.size
        })
        mode = 'edit_door_mode'
      } else {
        mode = 'select_mode'
        action = 0
        binder.graph.remove()
        delete binder
      }
    }

    if (typeof binder != 'undefined' && binder.type == 'boundingBox') {
      var moveObj =
        Math.abs(binder.oldX - binder.x) + Math.abs(binder.oldY - binder.y)
      var objTarget = binder.obj
      if (!objTarget.params.move) {
        // TO REMOVE MEASURE ON PLAN
        objTarget.graph.remove()
        OBJDATA.splice(OBJDATA.indexOf(objTarget), 1)
        $('#boxinfo').html('Measure deleted !')
      }
      if (moveObj < 1 && objTarget.params.move) {
        if (!objTarget.params.resize) $('#objBoundingBoxScale').hide()
        else $('#objBoundingBoxScale').show()
        if (!objTarget.params.rotate) $('#objBoundingBoxRotation').hide()
        else $('#objBoundingBoxRotation').show()
        $('#panel').hide(100)
        $('#objBoundingBox').show('200', function () {
          $('#lin').css('cursor', 'default')
          $('#boxinfo').html('Modify the object')
          document
            .getElementById('bboxWidth')
            .setAttribute('min', objTarget.params.resizeLimit.width.min)
          document
            .getElementById('bboxWidth')
            .setAttribute('max', objTarget.params.resizeLimit.width.max)
          document.getElementById('bboxWidthScale').textContent =
            objTarget.params.resizeLimit.width.min +
            '-' +
            objTarget.params.resizeLimit.height.max
          document
            .getElementById('bboxHeight')
            .setAttribute('min', objTarget.params.resizeLimit.height.min)
          document
            .getElementById('bboxHeight')
            .setAttribute('max', objTarget.params.resizeLimit.height.max)
          document.getElementById('bboxHeightScale').textContent =
            objTarget.params.resizeLimit.height.min +
            '-' +
            objTarget.params.resizeLimit.height.max
          $('#stepsCounter').hide()
          if (objTarget.class == 'stair') {
            document.getElementById('bboxStepsVal').textContent =
              objTarget.value
            $('#stepsCounter').show()
          }
          document.getElementById('bboxWidth').value = objTarget.width * 100
          document.getElementById('bboxWidthVal').textContent =
            objTarget.width * 100
          document.getElementById('bboxHeight').value = objTarget.height * 100
          document.getElementById('bboxHeightVal').textContent =
            objTarget.height * 100
          document.getElementById('bboxRotation').value = objTarget.angle
          document.getElementById('bboxRotationVal').textContent =
            objTarget.angle
        })
        mode = 'edit_boundingBox_mode'
      } else {
        mode = 'select_mode'
        action = 0
        binder.graph.remove()
        delete binder
      }
    }

    if (mode == 'bind_mode') {
      binder.remove()
      delete binder
    }
  }

  save()
}

function mouseUp_mode_text (event) {
  if (mode !== 'text_mode') {
    return
  }

  if (action == 0) {
    action = 1
    const textModal = new bootstrap.Modal($('#textToLayer'))

    textModal.show()
    mode == 'edit_text_mode'
  }
}

function mouseUp_mode_object (event) {
  if (mode !== 'object_mode') {
    return
  }

  OBJDATA.push(binder)
  binder.graph.remove()
  var targetBox = 'boxcarpentry'
  if (OBJDATA[OBJDATA.length - 1].class == 'energy') targetBox = 'boxEnergy'
  if (OBJDATA[OBJDATA.length - 1].class == 'furniture')
    targetBox = 'boxFurniture'
  $('#' + targetBox).append(OBJDATA[OBJDATA.length - 1].graph)
  delete binder
  $('#boxinfo').html('Object added')
  fonc_button('select_mode')
  save()
}

function mouseUp_mode_room (event) {
  if (mode !== 'room_mode') {
    return
  }

  if (typeof binder == 'undefined') {
    return false
  }

  var area = binder.area / 3600
  binder.attr({ fill: 'none', stroke: '#ddf00a', 'stroke-width': 7 })
  $('.size').html(area.toFixed(2) + ' m²')
  $('#roomIndex').val(binder.id)
  if (ROOM[binder.id].surface != '')
    $('#roomSurface').val(ROOM[binder.id].surface)
  else $('#roomSurface').val('')
  document.querySelector('#seeArea').checked = ROOM[binder.id].showSurface
  document.querySelector('#roomBackground').value = ROOM[binder.id].color
  var roomName = ROOM[binder.id].name
  document.querySelector('#roomName').value = roomName
  if (ROOM[binder.id].name != '') {
    document.querySelector('#roomLabel').innerHTML =
      roomName + ' <span class="caret"></span>'
  } else {
    document.querySelector('#roomLabel').innerHTML =
      'None <span class="caret"></span>'
  }

  var actionToDo = ROOM[binder.id].action
  document.querySelector('#' + actionToDo + 'Action').checked = true
  $('#panel').hide(100)
  $('#roomTools').show('300', function () {
    $('#lin').css('cursor', 'default')
    $('#boxinfo').html('Config. the room')
  })
  mode = 'edit_room_mode'
  save()
}

function mouseUpHandler(event) {

  // if (showRib) $('#boxScale').show(200)

  drag = 'off'

  cursor('default')

  mouseUp_mode_select(event)
  mouseUp_mode_line_partition(event)
  mouseUp_mode_door(event)
  mouseUp_mode_network(event)
  mouseUp_mode_electrical(event)
  mouseUp_mode_distance(event)
  mouseUp_mode_node(event)
  mouseUp_mode_bind(event)
  mouseUp_mode_text(event)
  mouseUp_mode_object(event)
  mouseUp_mode_room(event)

  if (mode != 'edit_room_mode') {
    editor.showScaleBox()
    rib()
  }
}
