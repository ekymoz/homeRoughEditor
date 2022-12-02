// document.getElementById('bboxStepsAdd').addEventListener('click', function () {
//   let newValue = document.getElementById('bboxStepsVal').textContent
//   if (newValue < 15) {
//     newValue++
//     binder.obj.value = newValue
//     binder.obj.update()
//     document.getElementById('bboxStepsVal').textContent = newValue
//   }
// })
//
// document
//   .getElementById('bboxStepsMinus')
//   .addEventListener('click', function () {
//     let newValue = document.getElementById('bboxStepsVal').textContent
//     if (newValue > 2) {
//       newValue--
//       binder.obj.value = newValue
//       binder.obj.update()
//       document.getElementById('bboxStepsVal').textContent = newValue
//     }
//   })

// document.getElementById('bboxWidth').addEventListener('input', function () {
//   let sliderValue = this.value
//   let objTarget = binder.obj
//   objTarget.size = (sliderValue / 100) * meter
//   objTarget.update()
//   binder.size = (sliderValue / 100) * meter
//   binder.update()
//   document.getElementById('bboxWidthVal').textContent = sliderValue
// })
//
// document.getElementById('bboxHeight').addEventListener('input', function () {
//   let sliderValue = this.value
//   let objTarget = binder.obj
//   objTarget.thick = (sliderValue / 100) * meter
//   objTarget.update()
//   binder.thick = (sliderValue / 100) * meter
//   binder.update()
//   document.getElementById('bboxHeightVal').textContent = sliderValue
// })
//
// document.getElementById('bboxRotation').addEventListener('input', function () {
//   let sliderValue = this.value
//   let objTarget = binder.obj
//   objTarget.angle = sliderValue
//   objTarget.update()
//   binder.angle = sliderValue
//   binder.update()
//   document.getElementById('bboxRotationVal').textContent = sliderValue
// })
//
// document
//   .getElementById('doorWindowWidth')
//   .addEventListener('input', function () {
//     let sliderValue = this.value
//     let objTarget = binder.obj
//     let wallBind = editor.rayCastingWalls(objTarget, WALLS)
//     if (wallBind.length > 1) {
//       wallBind = wallBind[wallBind.length - 1]
//     }
//     let limits = limitObj(wallBind.equations.base, sliderValue, objTarget)
//     if (
//       qSVG.btwn(limits[1].x, wallBind.start.x, wallBind.end.x) &&
//       qSVG.btwn(limits[1].y, wallBind.start.y, wallBind.end.y) &&
//       qSVG.btwn(limits[0].x, wallBind.start.x, wallBind.end.x) &&
//       qSVG.btwn(limits[0].y, wallBind.start.y, wallBind.end.y)
//     ) {
//       objTarget.size = sliderValue
//       objTarget.limit = limits
//       objTarget.update()
//       binder.size = sliderValue
//       binder.limit = limits
//       binder.update()
//       document.getElementById('doorWindowWidthVal').textContent = sliderValue
//     }
//     inWallRib(wallBind)
//   })

// document.getElementById('objToolsHinge').addEventListener('click', function () {
//   let objTarget = binder.obj
//   let hingeStatus = objTarget.hinge // normal - reverse
//   if (hingeStatus === 'normal') {
//     objTarget.hinge = 'reverse'
//   } else objTarget.hinge = 'normal'
//   objTarget.update()
// })

// document.getElementById('sizePolice').addEventListener('input', function () {
//   document.getElementById('labelBox').style.fontSize = this.value + 'px'
// })

// $('#textToLayer').on('hidden.bs.modal', function (e) {
//   fonc_button('select_mode')
//   action = 0
//   let textToMake = document.getElementById('labelBox').textContent
//   if (textToMake != '' && textToMake != 'Your text') {
//     binder = new editor.obj2D(
//       'free',
//       'text',
//       document.getElementById('labelBox').style.color,
//       snap,
//       0,
//       0,
//       0,
//       'normal',
//       0,
//       {
//         text: textToMake,
//         size: document.getElementById('sizePolice').value,
//       },
//     )
//     binder.update()
//     OBJDATA.push(binder)
//     binder.graph.remove()
//     $('#boxText').append(OBJDATA[OBJDATA.length - 1].graph)
//     OBJDATA[OBJDATA.length - 1].update()
//     binder = undefined
//     $('#boxinfo').html('Added text')
//     save()
//   } else {
//     $('#boxinfo').html('Selection mode')
//   }
//   document.getElementById('labelBox').textContent = 'Your text'
//   document.getElementById('labelBox').style.color = '#333333'
//   document.getElementById('labelBox').style.fontSize = '15px'
//   document.getElementById('sizePolice').value = 15
// })

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

// document.getElementById('applySurface').addEventListener('click', function () {
//   $('#roomTools').hide(100)
//   $('#panel').show(200)
//   binder.remove()
//   binder = undefined
//   let id = $('#roomIndex').val()
//   //COLOR
//   let data = $('#roomBackground').val()
//   ROOM[id].color = data
//   //ROOM NAME
//   let roomName = $('#roomName').val()
//   if (roomName === 'None') {
//     roomName = ''
//   }
//   ROOM[id].name = roomName
//   //ROOM SURFACE
//   let area = $('#roomSurface').val()
//   ROOM[id].surface = area
//   //SHOW SURFACE
//   let show = document.querySelector('#seeArea').checked
//   ROOM[id].showSurface = show
//   //ACTION PARAM
//   let action = document.querySelector('input[type=radio]:checked').value
//   ROOM[id].action = action
//   if (action === 'sub') {
//     ROOM[id].color = 'hatch'
//   }
//   if (action != 'sub' && data === 'hatch') {
//     ROOM[id].color = 'gradientNeutral'
//   }
//   $('#boxRoom').empty()
//   $('#boxSurface').empty()
//   editor.roomMaker(Rooms)
//   $('#boxinfo').html('Updated room')
//   fonc_button('select_mode')
// })

// document
//   .getElementById('resetRoomTools')
//   .addEventListener('click', function () {
//     $('#roomTools').hide(100)
//     $('#panel').show(200)
//     binder.remove()
//     binder = undefined
//     $('#boxinfo').html('Updated room')
//     fonc_button('select_mode')
//   })


// $('#distance_mode').click(function () {
//   linElement.css('cursor', 'crosshair')
//   $('#boxinfo').html('Add a measurement')
//   fonc_button('distance_mode')
// })

// document.getElementById('redo').addEventListener('click', function () {
//   if (HISTORY.index < HISTORY.length) {
//     load(HISTORY.index)
//     HISTORY.index++
//     $('#undo').removeClass('disabled')
//     if (HISTORY.index === HISTORY.length) {
//       $('#redo').addClass('disabled')
//     }
//   }
// })
//
// document.getElementById('undo').addEventListener('click', function () {
//   if (HISTORY.index > 0) {
//     $('#undo').removeClass('disabled')
//     if (HISTORY.index - 1 > 0) {
//       HISTORY.index--
//       load(HISTORY.index - 1)
//       $('#redo').removeClass('disabled')
//     }
//   }
//   if (HISTORY.index === 1) $('#undo').addClass('disabled')
// })

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

// document.getElementById('wallWidth').addEventListener('input', function () {
//   let sliderValue = this.value
//   binder.wall.thick = sliderValue
//   binder.wall.type = 'normal'
//   editor.architect(WALLS)
//   let objWall = editor.objFromWall(binder.wall) // LIST OBJ ON EDGE
//   for (let w = 0; w < objWall.length; w++) {
//     objWall[w].thick = sliderValue
//     objWall[w].update()
//   }
//   rib()
//   document.getElementById('wallWidthVal').textContent = sliderValue
// })

// $('.object').click(function () {
//   cursor('move')
//   $('#boxinfo').html('Add an object')
//   fonc_button('object_mode', this.id)
// })

// $('#stair_mode').click(function () {
//   cursor('move')
//   $('#boxinfo').html('Add stair')
//   fonc_button('object_mode', 'simpleStair')
// })

// $('#grid_mode').click(function () {
//   if (grid_snap === 'on') {
//     grid_snap = 'off'
//     $('#boxinfo').html('Help grid off')
//     $('#grid_mode').removeClass('btn-success')
//     $('#grid_mode').addClass('btn-warning')
//     $('#grid_mode').html('GRID OFF')
//     $('#boxgrid').css('opacity', '0.5')
//   } else {
//     grid_snap = 'on'
//     $('#boxinfo').html('Help grid on')
//     $('#grid_mode').removeClass('btn-warning')
//     $('#grid_mode').addClass('btn-success')
//     $('#grid_mode').html('GRID ON <i class="fa fa-th" aria-hidden="true"></i>')
//     $('#boxgrid').css('opacity', '1')
//   }
// })
