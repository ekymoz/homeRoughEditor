const MIN_ZOOM = 0
const MAX_ZOOM = 100

function Application() {

  // REVIEW: Which of these are actually used in the application?
  this.WALLS = []
  this.OBJDATA = []
  this.ROOM = []
  this.HISTORY = []
  this.wallSize = 20
  this.partitionSize = 8
  this.visibleLayers = new Set(['walls'])
  this.activeLayer = 'walls'
  this.drag = 'off'
  this.action = 0
  this.magnetic = 0
  this.construc = 0
  this.Rcirclebinder = 8
  this.mode = 'select_mode'
  this.modeOption
  this.linElement = $('#lin')
  this.taille_w = this.linElement.width()
  this.taille_h = this.linElement.height()
  this.offset = this.linElement.offset()
  this.grid = 20
  // showRib = true
  this.showArea = true
  this.meter = 60
  this.grid_snap = 'off'
  this.colorbackground = '#ffffff'
  this.colorline = '#fff'
  this.colorroom = '#f0daaf'
  this.colorWall = '#666'
  this.pox = 0
  this.poy = 0
  this.segment = 0
  this.xpath = 0
  this.ypath = 0
  this.tactile = false
  this.width_viewbox = this.taille_w
  this.height_viewbox = this.taille_h
  this.ratio_viewbox = this.height_viewbox / this.width_viewbox
  this.originX_viewbox = 0
  this.originY_viewbox = 0
  this.sizeText = []
  this.showAllSizeStatus = 0
  this.editor = this.editorFactory()
  this.qSVG = this.qSVGFactory()

  // Used to track This is the initial zoom level
  this.zoom = 50
  // The ratio the screen is scaled
  this.scaleFactor = 1
}

Application.prototype.initialize = function () {
  const textEditorColorBtn = document.querySelectorAll('.textEditorColor')
  const roomColorBtn = document.querySelectorAll('.roomColor')
  const objTrashBtn = document.querySelectorAll('.objTrash')
  const dropdownMenu = document.querySelectorAll('.dropdown-menu li a')
  // const visibleLayerCheckboxes = document.querySelectorAll(
  //   '[name="visible_layer"]',
  // )

  document.getElementById('lin').setAttribute(
    'viewBox',
    `${this.originX_viewbox} ${this.originY_viewbox} ${this.width_viewbox} ${this.height_viewbox}`
  )

  // document.getElementById('bboxTrash').addEventListener('click', () => {
  //   this.binder.obj.graph.remove()
  //   this.binder.graph.remove()
  //   this.OBJDATA.splice(this.OBJDATA.indexOf(this.binder.obj), 1)
  //   $('#objBoundingBox').hide(100)
  //   $('#panel').show(200)
  //   fonc_button('select_mode')
  //   $('#boxinfo').html('Deleted object')
  //   this.binder = undefined
  //   rib()
  // })

  document.getElementById('lin').addEventListener('wheel', (event) => {
    event.preventDefault()
    if (event.deltaY > 0) {
      this.zoom_maker('zoomout', 20)
    } else {
      this.zoom_maker('zoomin', 20)
    }
  })

  // document.getElementById('wallTrash').addEventListener('click', () => {
  //   let wall = this.binder.wall
  //   for (let k in this.WALLS) {
  //     if (isObjectsEquals(this.WALLS[k].child, wall)) this.WALLS[k].child = null
  //     if (isObjectsEquals(this.WALLS[k].parent, wall)) {
  //       this.WALLS[k].parent = null
  //     }
  //   }
  //   this.WALLS.splice(this.WALLS.indexOf(wall), 1)
  //   $('#wallTools').hide(100)
  //   this.wall.graph.remove()
  //   this.binder.graph.remove()
  //   this.editor.architect(WALLS)
  //   rib()
  //   this.mode = 'select_mode'
  //   $('#panel').show(200)
  // })
  //
  // $('#room_mode').click(() => {
  //   this.linElement.css('cursor', 'pointer')
  //   $('#boxinfo').html('Config. of rooms')
  //   fonc_button('room_mode')
  // })
  //
  // $('#select_mode').click(() => {
  //   $('#boxinfo').html('Mode "select"')
  //   if (typeof this.binder != 'undefined') {
  //     this.binder.remove()
  //     this.binder = undefined
  //   }
  //
  //   fonc_button('select_mode')
  // })
  //
  // $('#line_mode').click(() => {
  //   this.linElement.css('cursor', 'crosshair')
  //   $('#boxinfo').html('Creation of wall(s)')
  //   this.multi = 0
  //   this.action = 0
  //   // snap = calcul_snap(event, grid_snap);
  //   //
  //   // pox = snap.x;
  //   // poy = snap.y;
  //   fonc_button('line_mode')
  // })
  //
  // $('#partition_mode').click(() => {
  //   this.linElement.css('cursor', 'crosshair')
  //   $('#boxinfo').html('Creation of thin wall(s)')
  //   this.multi = 0
  //   fonc_button('partition_mode')
  // })
  //
  // $('#rect_mode').click(() => {
  //   this.linElement.css('cursor', 'crosshair')
  //   $('#boxinfo').html('Room(s) creation')
  //   fonc_button('rect_mode')
  // })
  //
  // $('.door').click(() => {
  //   this.linElement.css('cursor', 'crosshair')
  //   $('#boxinfo').html('Add a door')
  //   $('#door_list').hide(200)
  //   fonc_button('door_mode', this.id)
  // })
  //
  // $('.electrical').click(() => {
  //   this.linElement.css('cursor', 'crosshair')
  //   $('#boxinfo').html('Add electrical')
  //   $('#electrical_list').hide(200)
  //   fonc_button('electrical_mode', this.id)
  // })
  //
  // $('.network').click(() => {
  //   this.linElement.css('cursor', 'crosshair')
  //   $('#boxinfo').html('Add network')
  //   $('#network_list').hide(200)
  //   fonc_button('network_mode', this.id)
  // })
  //
  // $('.window').click(() => {
  //   this.linElement.css('cursor', 'crosshair')
  //   $('#boxinfo').html('Add a window')
  //   $('#door_list').hide(200)
  //   $('#window_list').hide(200)
  //   fonc_button('door_mode', this.id)
  // })
  //
  // $('#node_mode').click(() => {
  //   $('#boxinfo').html(
  //     'Cut a wall<br/><span style="font-size:0.7em">Warning : Cutting the wall of a room can cancel its ' +
  //       'configuration</span>',
  //   )
  //   fonc_button('node_mode')
  // })
  //
  // $('#text_mode').click(() => {
  //   $('#boxinfo').html(
  //     'Add text<br/><span style="font-size:0.7em">Place the cursor to the desired location, then ' +
  //       'type your text.</span>',
  //   )
  //   fonc_button('text_mode')
  // })

  // Window Event Listeners
  window.addEventListener('resize', (event) => {
    this.width_viewbox = $('#lin').width()
    this.height_viewbox = $('#lin').height()
    document
      .getElementById('lin')
      .setAttribute(
        'viewBox',
        `${this.originX_viewbox} ${this.originY_viewbox} ${this.width_viewbox} ${this.height_viewbox}`
      )
  })

  window.addEventListener('load', () => {
    if (localStorage.getItem('history')) {
      const historyTemp = JSON.parse(localStorage.getItem('history'))
      this.load(historyTemp.length - 1, 'boot')
      this.save('boot')
    }
  })

  document.addEventListener('keydown', (event) => {
    if (this.mode === 'text_mode') {
      return
    }

    switch (event.keyCode) {
      case 37:  // left arrow
        this.zoom_maker('zoomleft', 100, 30)
        break;
      case 38:  // up arrow
        this.zoom_maker('zoomtop', 100, 30)
        break;
      case 39:  // right arrow
        this.zoom_maker('zoomright', 100, 30)
        break;
      case 40:  // down arrow
        this.zoom_maker('zoombottom', 100, 30)
        break;
      case 107: // +
        this.zoom_maker('zoomin', 20, 50)
        break;
      case 109: // -
        this.zoom_maker('zoomout', 20, 50)
        break;
    }
  })

  // document.querySelector('#lin').addEventListener('mousedown', mouseDownHandler, true)
  // document.querySelector('#lin').addEventListener('mousemove', mouseMoveHandler, true)
  // document.querySelector('#lin').addEventListener('mouseup', mouseUpHandler)

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
      if ((this.mode == 'line_mode' || this.mode == 'partition_mode') && this.action == 1) {
        this.action = 0
        if (typeof this.binder != 'undefined') {
          this.binder.remove()
          this.binder = undefined
        }
        $('#linetemp').remove()
        $('#line_construc').remove()
        this.lengthTemp.remove()
        this.lengthTemp = undefined
      }
    })

  for (let k = 0; k < textEditorColorBtn.length; k++) {
    textEditorColorBtn[k].addEventListener('click', () => {
      document.getElementById('labelBox').style.color = this.style.color
    })
  }

  for (let k = 0; k < roomColorBtn.length; k++) {
    roomColorBtn[k].addEventListener('click', () => {
      const data = this.getAttribute('data-type')
      $('#roomBackground').val(data)
      this.binder.attr({ fill: 'url(#' + data + ')' })
    })
  }

  for (let k = 0; k < objTrashBtn.length; k++) {
    objTrashBtn[k].addEventListener('click', () => {
      $('#objTools').hide('100')
      let obj = this.binder.obj
      obj.graph.remove()
      this.OBJDATA.splice(this.OBJDATA.indexOf(obj), 1)
      fonc_button('select_mode')
      $('#boxinfo').html('Selection mode')
      $('#panel').show('200')
      this.binder.graph.remove()
      this.binder = undefined
      rib()
      $('#panel').show('300')
    })
  }

  for (let k = 0; k < dropdownMenu.length; k++) {
    dropdownMenu[k].addEventListener('click', () => {
      let selText = this.textContent
      $(this)
        .parents('.btn-group')
        .find('.dropdown-toggle')
        .html(selText + ' <span class="caret"></span>')
      if (selText != 'None') $('#roomName').val(selText)
      else $('#roomName').val('')
    })
  }
}

Application.prototype.initHistory = function (boot = false) {
  this.HISTORY.index = 0
  if (!boot && localStorage.getItem('history')) {
    localStorage.removeItem('history')
  }

  if (localStorage.getItem('history') && this.boot === 'recovery') {
    let historyTemp = JSON.parse(localStorage.getItem('history'))
    this.load(historyTemp.length - 1, 'boot')
    this.save('boot')
  }

  if (boot === 'newSquare') {
    if (localStorage.getItem('history')) localStorage.removeItem('history')
    this.HISTORY.push({
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
    this.HISTORY[0] = JSON.stringify(this.HISTORY[0])
    localStorage.setItem('history', JSON.stringify(this.HISTORY))
    this.load(0)
    this.save()
  }

  if (boot === 'newL') {
    if (localStorage.getItem('history')) localStorage.removeItem('history')
    this.HISTORY.push({
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
    this.HISTORY[0] = JSON.stringify(this.HISTORY[0])
    localStorage.setItem('history', JSON.stringify(this.HISTORY))
    this.load(0)
    this.save()
  }
}

Application.prototype.importFloorplan = function (floorplanJson) {
  for (let k in this.OBJDATA) {
    this.OBJDATA[k].graph.remove()
  }

  this.OBJDATA = []

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
    this.OBJDATA.push(obj)
    $('#boxcarpentry').append(this.OBJDATA[this.OBJDATA.length - 1].graph)
    obj.update()
  }

  this.WALLS = floorplanJson.wallData

  for (let k in this.WALLS) {
    if (this.WALLS[k].child != null) {
      this.WALLS[k].child = this.WALLS[this.WALLS[k].child]
    }
    if (this.WALLS[k].parent != null) {
      this.WALLS[k].parent = this.WALLS[this.WALLS[k].parent]
    }
  }

  this.ROOM = floorplanJson.roomData
  this.editor.architect(this.WALLS)
  this.editor.showScaleBox()
  // rib()
}

Application.prototype.exportFloorplan = function () {
  console.log(this.HISTORY[this.HISTORY.length - 1])
}

// REVIEW: What is `boot` for?
Application.prototype.save = function (boot = false) {
  if (boot) {
    localStorage.removeItem('history')
  }

  // REVIEW: What does this mean?
  // FOR CYCLIC OBJ INTO LOCALSTORAGE !!!
  for (let k in this.WALLS) {
    if (this.WALLS[k].child != null) {
      this.WALLS[k].child = this.WALLS.indexOf(this.WALLS[k].child)
    }
    if (this.WALLS[k].parent != null) {
      this.WALLS[k].parent = this.WALLS.indexOf(this.WALLS[k].parent)
    }
  }

  // REVIEW: What is this for?
  if (
    JSON.stringify({ objData: this.OBJDATA, wallData: this.WALLS, roomData: this.ROOM }) ===
    this.HISTORY[this.HISTORY.length - 1]
  ) {
    for (let k in this.WALLS) {
      if (this.WALLS[k].child != null) {
        this.WALLS[k].child = this.WALLS[this.WALLS[k].child]
      }
      if (this.WALLS[k].parent != null) {
        this.WALLS[k].parent = this.WALLS[this.WALLS[k].parent]
      }
    }
    return false
  }

  // REVIEW: Why this condition?
  if (this.HISTORY.index < this.HISTORY.length) {

    // REVIEW: What is this for?
    this.HISTORY.splice(this.HISTORY.index, this.HISTORY.length - this.HISTORY.index)

    $('#redo').addClass('disabled')
  }

  // REVIEW: What is this for?
  this.HISTORY.push(
    JSON.stringify({ objData: this.OBJDATA, wallData: this.WALLS, roomData: this.ROOM }),
  )

  // Record to local storage
  localStorage.setItem('history', JSON.stringify(this.HISTORY))

  // REVIEW: What is this for?
  this.HISTORY.index++

  if (this.HISTORY.index > 1) {
    $('#undo').removeClass('disabled')
  }

  // REVIEW: What is this for?
  for (let k in this.WALLS) {
    if (this.WALLS[k].child != null) {
      this.WALLS[k].child = this.WALLS[this.WALLS[k].child]
    }
    if (this.WALLS[k].parent != null) {
      this.WALLS[k].parent = this.WALLS[this.WALLS[k].parent]
    }
  }

  // REVIEW: Why return true here?
  return true
}

Application.prototype.load = function(index = this.HISTORY.index, boot = false) {
  if (this.HISTORY.length === 0 && !boot) {
    return false
  }

  for (let k in this.OBJDATA) {
    this.OBJDATA[k].graph.remove()
  }

  this.OBJDATA = []
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
    this.OBJDATA.push(obj)
    $('#boxcarpentry').append(this.OBJDATA[this.OBJDATA.length - 1].graph)
    obj.update()
  }

  this.WALLS = historyTemp.wallData

  for (let k in this.WALLS) {
    if (this.WALLS[k].child != null) {
      this.WALLS[k].child = this.WALLS[this.WALLS[k].child]
    }
    if (this.WALLS[k].parent != null) {
      this.WALLS[k].parent = this.WALLS[this.WALLS[k].parent]
    }
  }

  this.ROOM = historyTemp.roomData
  this.editor.architect(this.WALLS)
  this.editor.showScaleBox()
  // rib()
}

/*
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
*/

// REVIEW: The name for this function could be made more clear to what it actually does. It does not only handle zoom functionality, as its name might suggest
Application.prototype.zoom_maker = function (operation, xmove, xview) {
  switch (operation) {
    case 'zoomout':
      if (this.zoom > MIN_ZOOM) {
        this.zoom--
        this.width_viewbox += xmove
        this.height_viewbox = this.width_viewbox * this.ratio_viewbox
        this.originX_viewbox = this.originX_viewbox - xmove / 2
        this.originY_viewbox = this.originY_viewbox - (xmove / 2) * this.ratio_viewbox
        this.scaleFactor = this.width_viewbox / this.taille_w
      }
      break;
    case 'zoomin':
      if (this.zoom < MAX_ZOOM) {
        this.zoom++
        this.width_viewbox -= xmove
        this.height_viewbox = this.width_viewbox * this.ratio_viewbox
        this.originX_viewbox = this.originX_viewbox + xmove / 2
        this.originY_viewbox = this.originY_viewbox + (xmove / 2) * this.ratio_viewbox
        this.scaleFactor = this.width_viewbox / this.taille_w
      }
      break;
    case 'zoomreset':
      this.originX_viewbox = 0
      this.originY_viewbox = 0
      this.width_viewbox = this.taille_w
      this.height_viewbox = this.taille_h
      this.scaleFactor = 1
      break;
    case 'zoomright':
      this.originX_viewbox += xview
      break;
    case 'zoomleft':
      this.originX_viewbox -= xview
      break;
    case 'zoomtop':
      this.originY_viewbox -= xview
      break;
    case 'zoombottom':
      this.originY_viewbox += xview
      break;
    case 'zoomdrag':
      this.originX_viewbox -= xmove
      this.originY_viewbox -= xview
      break;
  }

  document.getElementById('lin').setAttribute(
    'viewBox', `${this.originX_viewbox} ${this.originY_viewbox} ${this.width_viewbox} ${this.height_viewbox}`
  )
}

/*
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

function intersectionOff() {
  if (typeof lineIntersectionP != 'undefined') {
    lineIntersectionP.remove()
    lineIntersectionP = undefined
  }
}

function intersection(snap, range = Infinity, except = ['']) {
  // ORANGE LINES 90° NEAR SEGMENT
  let bestEqPoint = {}
  let equation = {}

  bestEqPoint.distance = range

  if (typeof lineIntersectionP != 'undefined') {
    lineIntersectionP.remove()
    lineIntersectionP = undefined
  }

  lineIntersectionP = this.qSVG.create('boxbind', 'path', {
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
      eq = this.qSVG.nearPointOnEquation(equation, snap)
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
      eq = this.qSVG.nearPointOnEquation(equation, snap)
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
      eq = this.qSVG.nearPointOnEquation(equation, snap)
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
      eq = this.qSVG.nearPointOnEquation(equation, snap)
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

function hideAllSize() {
  $('#boxbind').empty()
  sizeText = []
  showAllSizeStatus = 0
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
      this.qSVG.nearPointOnEquation(wall.equations.up, objTarget.limit[0]),
      this.qSVG.nearPointOnEquation(wall.equations.up, objTarget.limit[1]),
    ]
    objTarget.down = [
      this.qSVG.nearPointOnEquation(wall.equations.down, objTarget.limit[0]),
      this.qSVG.nearPointOnEquation(wall.equations.down, objTarget.limit[1]),
    ]

    distance = this.qSVG.measure(wall.coords[0], objTarget.up[0]) / meter
    ribMaster[0].push({
      wall: objTarget,
      crossObj: ob,
      side: 'up',
      coords: objTarget.up[0],
      distance: distance.toFixed(2),
    })
    distance = this.qSVG.measure(wall.coords[0], objTarget.up[1]) / meter
    ribMaster[0].push({
      wall: objTarget,
      crossObj: ob,
      side: 'up',
      coords: objTarget.up[1],
      distance: distance.toFixed(2),
    })
    distance = this.qSVG.measure(wall.coords[1], objTarget.down[0]) / meter
    ribMaster[1].push({
      wall: objTarget,
      crossObj: ob,
      side: 'down',
      coords: objTarget.down[0],
      distance: distance.toFixed(2),
    })
    distance = this.qSVG.measure(wall.coords[1], objTarget.down[1]) / meter
    ribMaster[1].push({
      wall: objTarget,
      crossObj: ob,
      side: 'down',
      coords: objTarget.down[1],
      distance: distance.toFixed(2),
    })
  }
  distance = this.qSVG.measure(wall.coords[0], wall.coords[3]) / meter
  ribMaster[0].push({
    wall: objTarget,
    crossObj: false,
    side: 'up',
    coords: wall.coords[3],
    distance: distance,
  })
  distance = this.qSVG.measure(wall.coords[1], wall.coords[2]) / meter
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
        let startText = this.qSVG.middle(
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
          cross = this.qSVG.intersectionOfEquations(
            WALLS[i].equations.base,
            WALLS[p].equations.base,
            'object',
          )
          if (
            this.qSVG.btwn(cross.x, WALLS[i].start.x, WALLS[i].end.x, 'round') &&
            this.qSVG.btwn(cross.y, WALLS[i].start.y, WALLS[i].end.y, 'round')
          ) {
            inter = this.qSVG.intersectionOfEquations(
              WALLS[i].equations.up,
              WALLS[p].equations.up,
              'object',
            )
            if (
              this.qSVG.btwn(
                inter.x,
                WALLS[i].coords[0].x,
                WALLS[i].coords[3].x,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.y,
                WALLS[i].coords[0].y,
                WALLS[i].coords[3].y,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.x,
                WALLS[p].coords[0].x,
                WALLS[p].coords[3].x,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.y,
                WALLS[p].coords[0].y,
                WALLS[p].coords[3].y,
                'round',
              )
            ) {
              distance = this.qSVG.measure(WALLS[i].coords[0], inter) / meter
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

            inter = this.qSVG.intersectionOfEquations(
              WALLS[i].equations.up,
              WALLS[p].equations.down,
              'object',
            )
            if (
              this.qSVG.btwn(
                inter.x,
                WALLS[i].coords[0].x,
                WALLS[i].coords[3].x,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.y,
                WALLS[i].coords[0].y,
                WALLS[i].coords[3].y,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.x,
                WALLS[p].coords[1].x,
                WALLS[p].coords[2].x,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.y,
                WALLS[p].coords[1].y,
                WALLS[p].coords[2].y,
                'round',
              )
            ) {
              distance = this.qSVG.measure(WALLS[i].coords[0], inter) / meter
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

            inter = this.qSVG.intersectionOfEquations(
              WALLS[i].equations.down,
              WALLS[p].equations.up,
              'object',
            )
            if (
              this.qSVG.btwn(
                inter.x,
                WALLS[i].coords[1].x,
                WALLS[i].coords[2].x,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.y,
                WALLS[i].coords[1].y,
                WALLS[i].coords[2].y,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.x,
                WALLS[p].coords[0].x,
                WALLS[p].coords[3].x,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.y,
                WALLS[p].coords[0].y,
                WALLS[p].coords[3].y,
                'round',
              )
            ) {
              distance = this.qSVG.measure(WALLS[i].coords[1], inter) / meter
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

            inter = this.qSVG.intersectionOfEquations(
              WALLS[i].equations.down,
              WALLS[p].equations.down,
              'object',
            )
            if (
              this.qSVG.btwn(
                inter.x,
                WALLS[i].coords[1].x,
                WALLS[i].coords[2].x,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.y,
                WALLS[i].coords[1].y,
                WALLS[i].coords[2].y,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.x,
                WALLS[p].coords[1].x,
                WALLS[p].coords[2].x,
                'round',
              ) &&
              this.qSVG.btwn(
                inter.y,
                WALLS[p].coords[1].y,
                WALLS[p].coords[2].y,
                'round',
              )
            ) {
              distance = this.qSVG.measure(WALLS[i].coords[1], inter) / meter
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
      distance = this.qSVG.measure(WALLS[i].coords[0], WALLS[i].coords[3]) / meter
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

      distance = this.qSVG.measure(WALLS[i].coords[1], WALLS[i].coords[2]) / meter
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
            if (this.qSVG.rayCasting(ribMaster[t][a][0].coords, polygon)) {
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
              this.qSVG.rayCasting(
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
            let startText = this.qSVG.middle(
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
    lineIntersectionP = undefined
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#333', '')
      pushToConstruc(construc, this.qSVG.circlePath(-2, 4, 5), 'none', '#333', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#333', '')
      pushToConstruc(construc, this.qSVG.circlePath(-2, 4, 5), 'none', '#333', '')
      pushToConstruc(construc, 'm 0,0 5,-9', 'none', '#333', '')
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'doubleSwitch') {
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#333', '')
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 4), 'none', '#333', '')
      pushToConstruc(construc, 'm 2,-3 5,-8 3,2', 'none', '#333', '')
      pushToConstruc(construc, 'm -2,3 -5,8 -3,-2', 'none', '#333', '')
      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'dimmer') {
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#333', '')
      pushToConstruc(construc, this.qSVG.circlePath(-2, 4, 5), 'none', '#333', '')
      pushToConstruc(construc, 'm 0,0 5,-9', 'none', '#333', '')
      pushToConstruc(construc, 'M -2,-6 L 10,-4 L-2,-2 Z', 'none', '#333', '')

      construc.params.width = 36
      construc.params.height = 36
      construc.family = 'stick'
    }
    if (typeObj === 'plug') {
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
      pushToConstruc(construc, this.qSVG.circlePath(0, 0, 16), '#fff', '#000', '')
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
            var distance = this.qSVG.measure(objTarget, nodeTarget)
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
        var angle12 = this.qSVG.angleBetweenEquations(equation1.A, equation2.A)
        if (angle12 < 20 || angle12 > 160) {
          var found = true
          for (var k in WALLS) {
            if (
              this.qSVG.rayCasting(wall.start, WALLS[k].coords) &&
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
            if (isObjectsEquals(wall.parent.end, wall.start)) {
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
              equation1 = this.qSVG.perpendicularEquation(
                equation2,
                wall.start.x,
                wall.start.y,
              )
            } else if (isObjectsEquals(wall.parent.start, wall.start)) {
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
              equation1 = this.qSVG.perpendicularEquation(
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
            this.qSVG.rayCasting(wall.start, WALLS[k].coords) &&
            !isObjectsEquals(WALLS[k].coords, wall.coords)
          ) {
            var angleFollow = this.qSVG.angleBetweenEquations(
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
          equation1 = this.qSVG.perpendicularEquation(
            equation2,
            wall.start.x,
            wall.start.y,
          )
      }

      if (wall.child != null) {
        equation3 = editor.createEquationFromWall(wall.child)
        var angle23 = this.qSVG.angleBetweenEquations(equation3.A, equation2.A)
        if (angle23 < 20 || angle23 > 160) {
          var found = true
          for (var k in WALLS) {
            if (
              this.qSVG.rayCasting(wall.end, WALLS[k].coords) &&
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
              equation3 = this.qSVG.perpendicularEquation(
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
              equation3 = this.qSVG.perpendicularEquation(
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
            this.qSVG.rayCasting(wall.end, WALLS[k].coords) &&
            !isObjectsEquals(WALLS[k].coords, wall.coords)
          ) {
            var angleFollow = this.qSVG.angleBetweenEquations(
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
          equation3 = this.qSVG.perpendicularEquation(
            equation2,
            wall.end.x,
            wall.end.y,
          )
      }

      equationFollowers = []
      for (var k in WALLS) {
        if (
          WALLS[k].child == null &&
          this.qSVG.rayCasting(WALLS[k].end, wall.coords) &&
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
          this.qSVG.rayCasting(WALLS[k].start, wall.coords) &&
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
          eq: this.qSVG.perpendicularEquation(equation2, objTarget.x, objTarget.y),
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
      if (this.qSVG.rayCasting(snap, realBboxCoords)) {
        objTarget = OBJDATA[i]
      }
    }
    if (objTarget !== false) {
      if (typeof binder != 'undefined' && binder.type == 'segment') {
        binder.graph.remove()
        binder = undefined
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
        binder = undefined
        cursor('default')
        rib()
      }
    }

    // BIND CIRCLE IF nearNode and GROUP ALL SAME XY SEG POINTS
    if ((wallNode = editor.nearWallNode(snap, 20))) {
      if (typeof binder == 'undefined' || binder.type == 'segment') {
        binder = this.qSVG.create('boxbind', 'circle', {
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
        binder = undefined
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
        var line = this.qSVG.create('none', 'line', {
          x1: binder.wall.start.x,
          y1: binder.wall.start.y,
          x2: binder.wall.end.x,
          y2: binder.wall.end.y,
          'stroke-width': 5,
          stroke: '#5cba79',
        })
        var ball1 = this.qSVG.create('none', 'circle', {
          class: 'circle_css',
          cx: binder.wall.start.x,
          cy: binder.wall.start.y,
          r: Rcirclebinder / 1.8,
        })
        var ball2 = this.qSVG.create('none', 'circle', {
          class: 'circle_css',
          cx: binder.wall.end.x,
          cy: binder.wall.end.y,
          r: Rcirclebinder / 1.8,
        })
        binder.graph = this.qSVG.create('none', 'g')
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
          var line = this.qSVG.create('none', 'line', {
            x1: binder.wall.start.x,
            y1: binder.wall.start.y,
            x2: binder.wall.end.x,
            y2: binder.wall.end.y,
            'stroke-width': 5,
            stroke: '#5cba79',
          })
          var ball1 = this.qSVG.create('none', 'circle', {
            class: 'circle_css',
            cx: binder.wall.start.x,
            cy: binder.wall.start.y,
            r: Rcirclebinder / 1.8,
          })
          var ball2 = this.qSVG.create('none', 'circle', {
            class: 'circle_css',
            cx: binder.wall.end.x,
            cy: binder.wall.end.y,
            r: Rcirclebinder / 1.8,
          })
          binder.graph = this.qSVG.create('none', 'g')
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
          binder = undefined
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
        binder = this.qSVG.create('boxbind', 'circle', {
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
        binder = undefined
      }
    }
  } else if (action == 1) {
    snap = calcul_snap(event, grid_snap)
    x = snap.x
    y = snap.y
    starter = minMoveGrid(snap, pox, poy)

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
        lineconstruc = this.qSVG.create('boxbind', 'line', {
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

        svgadd = this.qSVG.create('boxbind', 'line', {
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
            binder = this.qSVG.create('boxbind', 'circle', {
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
            binder = undefined
          }
          if (wallEndConstruc === false) cursor('crosshair')
        }
        // LINETEMP AND LITLLE SNAPPING FOR HELP TO CONSTRUC ANGLE 0 90 45 *****************************************
        var fltt = this.qSVG.angle(pox, poy, x, y)
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
        var startText = this.qSVG.middle(pox, poy, x, y)
        var angleText = this.qSVG.angle(pox, poy, x, y)
        var valueText = (
          this.qSVG.measure(
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
        var angleWall = this.qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = this.qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = this.qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = this.qSVG.vectorDeter(v1, v2)
        if (Math.sign(newAngle) == 1) {
          angleWall += 180
          binder.angleSign = 1
        }
        var startCoords = this.qSVG.middle(
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
        var angleWall = this.qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = this.qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = this.qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = this.qSVG.vectorDeter(v1, v2)
        binder.angleSign = 0
        if (Math.sign(newAngle) == 1) {
          binder.angleSign = 1
          angleWall += 180
        }

        var limits = limitObj(wall.equations.base, binder.size, wallSelect)
        if (
          this.qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
          this.qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) &&
          this.qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
          this.qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
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
            this.qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
            this.qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[0].x
            binder.y = limits[0].y
          }
          if (
            this.qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
            this.qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
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
      binder = undefined
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
        var angleWall = this.qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = this.qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = this.qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = this.qSVG.vectorDeter(v1, v2)
        if (Math.sign(newAngle) == 1) {
          angleWall += 180
          binder.angleSign = 1
        }
        var startCoords = this.qSVG.middle(
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
        var angleWall = this.qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = this.qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = this.qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = this.qSVG.vectorDeter(v1, v2)
        binder.angleSign = 0
        if (Math.sign(newAngle) == 1) {
          binder.angleSign = 1
          angleWall += 180
        }

        var limits = limitObj(wall.equations.base, binder.size, wallSelect)
        if (
          this.qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
          this.qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) &&
          this.qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
          this.qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
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
            this.qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
            this.qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[0].x
            binder.y = limits[0].y
          }
          if (
            this.qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
            this.qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
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
      binder = undefined
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
        var angleWall = this.qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = this.qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = this.qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = this.qSVG.vectorDeter(v1, v2)
        if (Math.sign(newAngle) == 1) {
          angleWall += 180
          binder.angleSign = 1
        }
        var startCoords = this.qSVG.middle(
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
        var angleWall = this.qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = this.qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = this.qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = this.qSVG.vectorDeter(v1, v2)
        binder.angleSign = 0
        if (Math.sign(newAngle) == 1) {
          binder.angleSign = 1
          angleWall += 180
        }

        var limits = limitObj(wall.equations.base, binder.size, wallSelect)
        if (
          this.qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
          this.qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) &&
          this.qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
          this.qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
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
            this.qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
            this.qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[0].x
            binder.y = limits[0].y
          }
          if (
            this.qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
            this.qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
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
      binder = undefined
    }
  }
}

function mouseMove_mode_distance (event) {
  if (mode !== 'distance_mode') {
    return
  }

  snap = calcul_snap(event, grid_snap)
  if (typeof binder == 'undefined') {
    cross = this.qSVG.create('boxbind', 'path', {
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
    labelMeasure = this.qSVG.create('none', 'text', {
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
      var startText = this.qSVG.middle(pox, poy, x, y)
      var angleText = this.qSVG.angle(pox, poy, x, y)
      var valueText = this.qSVG.measure(
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
      angleWall = this.qSVG.angle(x1, y1, x2, y2)
      binder = this.qSVG.create('boxbind', 'path', {
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
        angleWall = this.qSVG.angle(x1, y1, x2, y2)
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
        binder = undefined
      }
    } else {
      binder.remove()
      binder = undefined
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
      var angleWall = this.qSVG.angleDeg(
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
        this.qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
        this.qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
      )
        indexLimits = 1
      // NEW COORDS OBJDATA[obj]
      objTarget.x = limits[indexLimits].x
      objTarget.y = limits[indexLimits].y
      objTarget.angle = angleWall
      if (objTarget.angleSign == 1) objTarget.angle = angleWall + 180

      var limitBtwn = limitObj(wall.equations.base, objTarget.size, objTarget) // OBJ SIZE OK BTWN xy1/xy2

      if (
        this.qSVG.btwn(limitBtwn[0].x, wall.start.x, wall.end.x) &&
        this.qSVG.btwn(limitBtwn[0].y, wall.start.y, wall.end.y) &&
        this.qSVG.btwn(limitBtwn[1].x, wall.start.x, wall.end.x) &&
        this.qSVG.btwn(limitBtwn[1].y, wall.start.y, wall.end.y)
      ) {
        objTarget.limit = limitBtwn
        objTarget.update()
      } else {
        objTarget.graph.remove()
        objTarget = undefined
        OBJDATA.splice(wall.indexObj, 1)
        wallListObj.splice(k, 1)
      }
    }
    // for (k in toClean)
    $('#boxRoom').empty()
    $('#boxSurface').empty()
    Rooms = this.qSVG.polygonize(WALLS)
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

    var intersection1 = this.qSVG.intersectionOfEquations(
      equation1,
      equation2,
      'obj',
    )
    var intersection2 = this.qSVG.intersectionOfEquations(
      equation2,
      equation3,
      'obj',
    )
    var intersection3 = this.qSVG.intersectionOfEquations(
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
      if (!this.qSVG.rayCasting(intersection1, equation1.backUp.coords)) {
        // IF OUT OF WALL FOLLOWED
        var distanceFromStart = this.qSVG.gap(
          equation1.backUp.start,
          intersection1,
        )
        var distanceFromEnd = this.qSVG.gap(equation1.backUp.end, intersection1)
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
      if (!this.qSVG.rayCasting(intersection2, equation3.backUp.coords)) {
        // IF OUT OF WALL FOLLOWED
        var distanceFromStart = this.qSVG.gap(
          equation3.backUp.start,
          intersection2,
        )
        var distanceFromEnd = this.qSVG.gap(equation3.backUp.end, intersection2)
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
      var intersectionFollowers = this.qSVG.intersectionOfEquations(
        equationFollowers[i].eq,
        equation2,
        'obj',
      )
      if (
        this.qSVG.btwn(
          intersectionFollowers.x,
          binder.wall.start.x,
          binder.wall.end.x,
          'round',
        ) &&
        this.qSVG.btwn(
          intersectionFollowers.y,
          binder.wall.start.y,
          binder.wall.end.y,
          'round',
        )
      ) {
        var size = this.qSVG.measure(
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
    Rooms = this.qSVG.polygonize(WALLS)

    // OBJDATA(s) FOLLOW 90° EDGE SELECTED
    for (var rp = 0; rp < equationsObj.length; rp++) {
      var objTarget = equationsObj[rp].obj
      var intersectionObj = this.qSVG.intersectionOfEquations(
        equationsObj[rp].eq,
        equation2,
      )
      // NEW COORDS OBJDATA[o]
      objTarget.x = intersectionObj[0]
      objTarget.y = intersectionObj[1]
      var limits = limitObj(equation2, objTarget.size, objTarget)
      if (
        this.qSVG.btwn(limits[0].x, binder.wall.start.x, binder.wall.end.x) &&
        this.qSVG.btwn(limits[0].y, binder.wall.start.y, binder.wall.end.y) &&
        this.qSVG.btwn(limits[1].x, binder.wall.start.x, binder.wall.end.x) &&
        this.qSVG.btwn(limits[1].y, binder.wall.start.y, binder.wall.end.y)
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
          !this.qSVG.btwn(limits[0].x, WALLS[k].start.x, WALLS[k].end.x) ||
          !this.qSVG.btwn(limits[0].y, WALLS[k].start.y, WALLS[k].end.y) ||
          !this.qSVG.btwn(limits[1].x, WALLS[k].start.x, WALLS[k].end.x) ||
          !this.qSVG.btwn(limits[1].y, WALLS[k].start.y, WALLS[k].end.y)
        ) {
          objTarget.graph.remove()
          objTarget = undefined
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
        eq: this.qSVG.perpendicularEquation(equation2, objTarget.x, objTarget.y),
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
        var angleWall = this.qSVG.angleDeg(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        var v1 = this.qSVG.vectorXY(
          { x: wall.start.x, y: wall.start.y },
          { x: wall.end.x, y: wall.end.y },
        )
        var v2 = this.qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap)
        var newAngle = this.qSVG.vectorDeter(v1, v2)
        binder.angleSign = 0
        objTarget.angleSign = 0
        if (Math.sign(newAngle) == 1) {
          angleWall += 180
          binder.angleSign = 1
          objTarget.angleSign = 1
        }
        var limits = limitObj(wall.equations.base, binder.size, wallSelect)
        if (
          this.qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
          this.qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) &&
          this.qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
          this.qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
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
            this.qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) &&
            this.qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)
          ) {
            binder.x = limits[0].x
            binder.y = limits[0].y
            objTarget.x = limits[0].x
            objTarget.y = limits[0].y
            objTarget.limit = limits
          }
          if (
            this.qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) &&
            this.qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)
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
      var angleWall = this.qSVG.angleDeg(
        pos.wall.start.x,
        pos.wall.start.y,
        pos.wall.end.x,
        pos.wall.end.y,
      )
      var v1 = this.qSVG.vectorXY(
        { x: pos.wall.start.x, y: pos.wall.start.y },
        { x: pos.wall.end.x, y: pos.wall.end.y },
      )
      var v2 = this.qSVG.vectorXY({ x: pos.wall.end.x, y: pos.wall.end.y }, snap)
      binder.x =
        pos.x -
        (Math.sin(pos.wall.angle * ((360 / 2) * Math.PI)) * binder.thick) / 2
      binder.y =
        pos.y -
        (Math.cos(pos.wall.angle * ((360 / 2) * Math.PI)) * binder.thick) / 2
      var newAngle = this.qSVG.vectorDeter(v1, v2)
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
      binder = undefined
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

    binder = this.qSVG.create('boxbind', 'path', {
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
      binder = undefined
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
    binder = undefined
    save()
  }
}

function mouseUp_mode_line_partition (event) {
  if (mode !== 'line_mode' && mode !== 'partition_mode') {
    return
  }

  $('#linetemp').remove() // DEL LINE HELP CONSTRUC 0 45 90
  intersectionOff()

  var sizeWall = this.qSVG.measure({ x: x, y: y }, { x: pox, y: poy })
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
        (this.qSVG.measure({ x: pox, y: poy }, { x: x, y: y }) / 60).toFixed(2) +
        ' m</span>',
    )
    $('#line_construc').remove() // DEL LINE CONSTRUC HELP TO VIEW NEW SEG PATH
    lengthTemp.remove()
    lengthTemp = undefined
    construc = 0
    if (wallEndConstruc) action = 0
    wallEndConstruc = undefined
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
      binder = undefined
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
  binder = undefined
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
  binder = undefined
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
  binder = undefined
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
    binder = undefined
    labelMeasure = undefined
    cross.remove()
    cross = undefined
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
    binder = undefined
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
      equation1 = undefined
      equation2 = undefined
      equation3 = undefined
      intersectionFollowers = undefined
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
        binder = undefined
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
        binder = undefined
      }
    }

    if (mode == 'bind_mode') {
      binder.remove()
      binder = undefined
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

    mode = 'edit_text_mode'
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
  binder = undefined
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
*/

Application.prototype.qSVGFactory = function() {
  return {
    create: (id, shape, attrs) => {
      var shape = $(document.createElementNS('http://www.w3.org/2000/svg', shape))
      for (var k in attrs) {
        shape.attr(k, attrs[k])
      }
      if (id != 'none') {
        $('#' + id).append(shape)
      }
      return shape
    },
    angleDeg: (cx, cy, ex, ey) => {
      var dy = ey - cy
      var dx = ex - cx
      var theta = Math.atan2(dy, dx) // range (-PI, PI]
      theta *= 180 / Math.PI // rads to degs, range (-180, 180]
      if (theta < 0) theta = 360 + theta // range [0, 360)
      return theta
    },
    angle: (x1, y1, x2, y2, x3, y3) => {
      var x1 = parseInt(x1)
      var y1 = parseInt(y1)
      var x2 = parseInt(x2)
      var y2 = parseInt(y2)
      var anglerad
      if (!x3) {
        if (x1 - x2 == 0) anglerad = Math.PI / 2
        else {
          anglerad = Math.atan((y1 - y2) / (x1 - x2))
        }
        var angledeg = (anglerad * 180) / Math.PI
      } else {
        var x3 = parseInt(x3)
        var y3 = parseInt(y3)
        var a = Math.sqrt(
          Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2),
        )
        var b = Math.sqrt(
          Math.pow(Math.abs(x2 - x3), 2) + Math.pow(Math.abs(y2 - y3), 2),
        )
        var c = Math.sqrt(
          Math.pow(Math.abs(x3 - x1), 2) + Math.pow(Math.abs(y3 - y1), 2),
        )
        if (a == 0 || b == 0) anglerad = Math.PI / 2
        else {
          anglerad = Math.acos(
            (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b),
          )
        }
        angledeg = (360 * anglerad) / (2 * Math.PI)
      }
      return {
        rad: anglerad,
        deg: angledeg,
      }
    },
    getAngle: (el1, el2) => {
      return {
        rad: Math.atan2(el2.y - el1.y, el2.x - el1.x),
        deg: (Math.atan2(el2.y - el1.y, el2.x - el1.x) * 180) / Math.PI,
      }
    },
    middle: (xo, yo, xd, yd) => {
      var x1 = parseInt(xo)
      var y1 = parseInt(yo)
      var x2 = parseInt(xd)
      var y2 = parseInt(yd)
      var middleX = Math.abs(x1 + x2) / 2
      var middleY = Math.abs(y1 + y2) / 2
      return {
        x: middleX,
        y: middleY,
      }
    },
    triangleArea: (fp, sp, tp) => {
      var A = 0
      var B = 0
      var C = 0
      var p = 0
      A = this.qSVG.measure(fp, sp)
      B = this.qSVG.measure(sp, tp)
      C = this.qSVG.measure(tp, fp)
      p = (A + B + C) / 2
      return Math.sqrt(p * (p - A) * (p - B) * (p - C))
    },
    measure: (po, pt) => {
      return Math.sqrt(Math.pow(po.x - pt.x, 2) + Math.pow(po.y - pt.y, 2))
    },
    gap: (po, pt) => {
      return Math.pow(po.x - pt.x, 2) + Math.pow(po.y - pt.y, 2)
    },
    pDistance: (point, pointA, pointB) => {
      var x = point.x
      var y = point.y
      var x1 = pointA.x
      var y1 = pointA.y
      var x2 = pointB.x
      var y2 = pointB.y
      var A = x - x1
      var B = y - y1
      var C = x2 - x1
      var D = y2 - y1
      var dot = A * C + B * D
      var len_sq = C * C + D * D
      var param = -1
      if (len_sq != 0)
        //in case of 0 length line
        param = dot / len_sq
      var xx, yy
      if (param < 0) {
        xx = x1
        yy = y1
      } else if (param > 1) {
        xx = x2
        yy = y2
      } else {
        xx = x1 + param * C
        yy = y1 + param * D
      }
      var dx = x - xx
      var dy = y - yy
      return {
        x: xx,
        y: yy,
        distance: Math.sqrt(dx * dx + dy * dy),
      }
    },
    nearPointOnEquation: (equation, point) => {
      // Y = Ax + B ---- equation {A:val, B:val}
      var pointA = {}
      var pointB = {}
      if (equation.A == 'h') {
        return {
          x: point.x,
          y: equation.B,
          distance: Math.abs(equation.B - point.y),
        }
      } else if (equation.A == 'v') {
        return {
          x: equation.B,
          y: point.y,
          distance: Math.abs(equation.B - point.x),
        }
      } else {
        pointA.x = point.x
        pointA.y = equation.A * point.x + equation.B
        pointB.x = (point.y - equation.B) / equation.A
        pointB.y = point.y
        return this.qSVG.pDistance(point, pointA, pointB)
      }
    },
    circlePath: (cx, cy, r) => {
      return (
        'M ' +
        cx +
        ' ' +
        cy +
        ' m -' +
        r +
        ', 0 a ' +
        r +
        ',' +
        r +
        ' 0 1,0 ' +
        r * 2 +
        ',0 a ' +
        r +
        ',' +
        r +
        ' 0 1,0 -' +
        r * 2 +
        ',0'
      )
    },
    createEquation: (x0, y0, x1, y1) => {
      if (x1 - x0 == 0) {
        return {
          A: 'v',
          B: x0,
        }
      } else if (y1 - y0 == 0) {
        return {
          A: 'h',
          B: y0,
        }
      } else {
        return {
          A: (y1 - y0) / (x1 - x0),
          B: y1 - x1 * ((y1 - y0) / (x1 - x0)),
        }
      }
    },
    perpendicularEquation: (equation, x1, y1) => {
      if (typeof equation.A != 'string') {
        return {
          A: -1 / equation.A,
          B: y1 - (-1 / equation.A) * x1,
        }
      }
      if (equation.A == 'h') {
        return {
          A: 'v',
          B: x1,
        }
      }
      if (equation.A == 'v') {
        return {
          A: 'h',
          B: y1,
        }
      }
    },
    angleBetweenEquations: (m1, m2) => {
      if (m1 == 'h') m1 = 0
      if (m2 == 'h') m2 = 0
      if (m1 == 'v') m1 = 10000
      if (m2 == 'v') m2 = 10000
      var angleRad = Math.atan(Math.abs((m2 - m1) / (1 + m1 * m2)))
      return (360 * angleRad) / (2 * Math.PI)
    },
    intersectionOfEquations: (equation1, equation2, type = 'array', message = false) => {
      // type array return [x,y] ---- type object return {x:x, y:y}
      var retArray
      var retObj
      if (equation1.A == equation2.A) {
        retArray = false
        retObj = false
      }
      if (equation1.A == 'v' && equation2.A == 'h') {
        retArray = [equation1.B, equation2.B]
        retObj = { x: equation1.B, y: equation2.B }
      }
      if (equation1.A == 'h' && equation2.A == 'v') {
        retArray = [equation2.B, equation1.B]
        retObj = { x: equation2.B, y: equation1.B }
      }
      if (equation1.A == 'h' && equation2.A != 'v' && equation2.A != 'h') {
        retArray = [(equation1.B - equation2.B) / equation2.A, equation1.B]
        retObj = { x: (equation1.B - equation2.B) / equation2.A, y: equation1.B }
      }
      if (equation1.A == 'v' && equation2.A != 'v' && equation2.A != 'h') {
        retArray = [equation1.B, equation2.A * equation1.B + equation2.B]
        retObj = { x: equation1.B, y: equation2.A * equation1.B + equation2.B }
      }
      if (equation2.A == 'h' && equation1.A != 'v' && equation1.A != 'h') {
        retArray = [(equation2.B - equation1.B) / equation1.A, equation2.B]
        retObj = { x: (equation2.B - equation1.B) / equation1.A, y: equation2.B }
      }
      if (equation2.A == 'v' && equation1.A != 'v' && equation1.A != 'h') {
        retArray = [equation2.B, equation1.A * equation2.B + equation1.B]
        retObj = { x: equation2.B, y: equation1.A * equation2.B + equation1.B }
      }
      if (
        equation1.A != 'h' &&
        equation1.A != 'v' &&
        equation2.A != 'v' &&
        equation2.A != 'h'
      ) {
        var xT = (equation2.B - equation1.B) / (equation1.A - equation2.A)
        var yT = equation1.A * xT + equation1.B
        retArray = [xT, yT]
        retObj = { x: xT, y: yT }
      }
      if (type == 'array') return retArray
      else return retObj
    },
    vectorXY: (obj1, obj2) => {
      return {
        x: obj2.x - obj1.x,
        y: obj2.y - obj1.y,
      }
    },
    vectorAngle: (v1, v2) => {
      return (
        (Math.atan2(v2.y - v1.y, v2.x - v1.x) + Math.PI / 2) * (180 / Math.PI)
      )
    },
    vectorDeter: (v1, v2) => {
      return v1.x * v2.y - v1.y * v2.x
    },
    btwn: (a, b1, b2, round = false) => {
      if (round) {
        a = Math.round(a)
        b1 = Math.round(b1)
        b2 = Math.round(b2)
      }
      if (a >= b1 && a <= b2) {
        return true
      }
      if (a >= b2 && a <= b1) {
        return true
      }
      return false
    },
    nearPointFromPath: (Pathsvg, point, range = Infinity) => {
      var pathLength = Pathsvg.getTotalLength()
      if (pathLength > 0) {
        var precision = 40
        var best
        var bestLength
        var bestDistance = Infinity
        for (
          var scan, scanLength = 0, scanDistance;
          scanLength <= pathLength;
          scanLength += precision
        ) {
          scan = Pathsvg.getPointAtLength(scanLength)
          scanDistance = this.qSVG.gap(scan, point)
          if (scanDistance < bestDistance) {
            ;(best = scan),
              (bestLength = scanLength),
              (bestDistance = scanDistance)
          }
        }
        // binary search for precise estimate
        precision /= 2
        while (precision > 1) {
          var before,
            after,
            beforeLength,
            afterLength,
            beforeDistance,
            afterDistance
          if (
            (beforeLength = bestLength - precision) >= 0 &&
            (beforeDistance = this.qSVG.gap(
              (before = Pathsvg.getPointAtLength(beforeLength)),
              point,
            )) < bestDistance
          ) {
            ;(best = before),
              (bestLength = beforeLength),
              (bestDistance = beforeDistance)
          } else if (
            (afterLength = bestLength + precision) <= pathLength &&
            (afterDistance = this.qSVG.gap(
              (after = Pathsvg.getPointAtLength(afterLength)),
              point,
            )) < bestDistance
          ) {
            ;(best = after),
              (bestLength = afterLength),
              (bestDistance = afterDistance)
          } else {
            precision /= 2
          }
        }

        if (bestDistance <= range * range) {
          return {
            x: best.x,
            y: best.y,
            length: bestLength,
            distance: bestDistance,
            seg: Pathsvg.getPathSegAtLength(bestLength),
          }
        } else {
          return false
        }
      } else {
        return false
      }
    },
    getNodeFromPath: (Pathsvg, point, except = ['']) => {
      //  ON PATH RETURN FALSE IF 0 NODE ON PATHSVG WITH POINT coords
      //  RETURN INDEX ARRAY OF NODEs onPoint
      var nodeList = Pathsvg.getPathData()
      var k = 0
      var nodes = []
      var countNode = 0
      for (k = 0; k < nodeList.length; k++) {
        if (
          nodeList[k].values[0] == point.x &&
          nodeList[k].values[1] == point.y &&
          nodeList[k].type != 'Z'
        ) {
          if (except.indexOf(k) == -1) {
            countNode++
            nodes.push(k)
          }
        }
      }
      if (countNode == 0) return false
      else return nodes
    },
    polygonIntoWalls: (vertex, surface) => {
      // RETURN ARRAY [{x,y}, {x,y}, ...] OF REAL COORDS POLYGON INTO WALLS, THICKNESS PARAM
      var vertexArray = surface
      var wall = []
      var polygon = []
      for (var rr = 0; rr < vertexArray.length; rr++) {
        polygon.push({
          x: vertex[vertexArray[rr]].x,
          y: vertex[vertexArray[rr]].y,
        })
      }
      // FIND EDGE (WALLS HERE) OF THESE TWO VERTEX
      for (var i = 0; i < vertexArray.length - 1; i++) {
        for (
          var segStart = 0;
          segStart < vertex[vertexArray[i + 1]].segment.length;
          segStart++
        ) {
          for (
            var segEnd = 0;
            segEnd < vertex[vertexArray[i]].segment.length;
            segEnd++
          ) {
            if (
              vertex[vertexArray[i + 1]].segment[segStart] ==
              vertex[vertexArray[i]].segment[segEnd]
            ) {
              wall.push({
                x1: vertex[vertexArray[i]].x,
                y1: vertex[vertexArray[i]].y,
                x2: vertex[vertexArray[i + 1]].x,
                y2: vertex[vertexArray[i + 1]].y,
                segment: vertex[vertexArray[i + 1]].segment[segStart],
              })
            }
          }
        }
      }
      // CALC INTERSECS OF EQ PATHS OF THESE TWO WALLS.
      var inside = []
      var outside = []
      for (var i = 0; i < wall.length; i++) {
        var inter = []
        var edge = wall[i]
        if (i < wall.length - 1) var nextEdge = wall[i + 1]
        else var nextEdge = wall[0]
        var angleEdge = Math.atan2(edge.y2 - edge.y1, edge.x2 - edge.x1)
        var angleNextEdge = Math.atan2(
          nextEdge.y2 - nextEdge.y1,
          nextEdge.x2 - nextEdge.x1,
        )
        var edgeThicknessX = (this.WALLS[edge.segment].thick / 2) * Math.sin(angleEdge)
        var edgeThicknessY = (this.WALLS[edge.segment].thick / 2) * Math.cos(angleEdge)
        var nextEdgeThicknessX =
          (this.WALLS[nextEdge.segment].thick / 2) * Math.sin(angleNextEdge)
        var nextEdgeThicknessY =
          (this.WALLS[nextEdge.segment].thick / 2) * Math.cos(angleNextEdge)
        var eqEdgeUp = this.qSVG.createEquation(
          edge.x1 + edgeThicknessX,
          edge.y1 - edgeThicknessY,
          edge.x2 + edgeThicknessX,
          edge.y2 - edgeThicknessY,
        )
        var eqEdgeDw = this.qSVG.createEquation(
          edge.x1 - edgeThicknessX,
          edge.y1 + edgeThicknessY,
          edge.x2 - edgeThicknessX,
          edge.y2 + edgeThicknessY,
        )
        var eqNextEdgeUp = this.qSVG.createEquation(
          nextEdge.x1 + nextEdgeThicknessX,
          nextEdge.y1 - nextEdgeThicknessY,
          nextEdge.x2 + nextEdgeThicknessX,
          nextEdge.y2 - nextEdgeThicknessY,
        )
        var eqNextEdgeDw = this.qSVG.createEquation(
          nextEdge.x1 - nextEdgeThicknessX,
          nextEdge.y1 + nextEdgeThicknessY,
          nextEdge.x2 - nextEdgeThicknessX,
          nextEdge.y2 + nextEdgeThicknessY,
        )

        angleEdge = angleEdge * (180 / Math.PI)
        angleNextEdge = angleNextEdge * (180 / Math.PI)

        if (eqEdgeUp.A != eqNextEdgeUp.A) {
          inter.push(
            this.qSVG.intersectionOfEquations(eqEdgeUp, eqNextEdgeUp, 'object'),
          )
          inter.push(
            this.qSVG.intersectionOfEquations(eqEdgeDw, eqNextEdgeDw, 'object'),
          )
        } else {
          inter.push({ x: edge.x2 + edgeThicknessX, y: edge.y2 - edgeThicknessY })
          inter.push({ x: edge.x2 - edgeThicknessX, y: edge.y2 + edgeThicknessY })
        }

        for (var ii = 0; ii < inter.length; ii++) {
          if (this.qSVG.rayCasting(inter[ii], polygon)) inside.push(inter[ii])
          else outside.push(inter[ii])
        }
      }
      inside.push(inside[0])
      outside.push(outside[0])
      return { inside: inside, outside: outside }
    },
    area: (coordss) => {
      if (coordss.length < 2) return false
      var realArea = 0
      var j = coordss.length - 1
      for (var i = 0; i < coordss.length; i++) {
        realArea =
          realArea + (coordss[j].x + coordss[i].x) * (coordss[j].y - coordss[i].y)
        j = i
      }
      realArea = realArea / 2
      return Math.abs(realArea.toFixed(2))
    },
    areaRoom: (vertex, coords, digit = 2) => {
      var vertexArray = coords
      var roughArea = 0
      var j = vertexArray.length - 2
      for (var i = 0; i < vertexArray.length - 1; i++) {
        roughArea =
          roughArea +
          (vertex[vertexArray[j]].x + vertex[vertexArray[i]].x) *
            (vertex[vertexArray[j]].y - vertex[vertexArray[i]].y)
        j = i
      }
      roughArea = roughArea / 2
      return Math.abs(roughArea.toFixed(digit))
    },
    perimeterRoom: (coords, digit = 2) => {
      var vertexArray = coords
      var roughRoom = 0
      for (i = 0; i < vertexArray.length - 1; i++) {
        added = this.qSVG.measure(vertex[vertexArray[i]], vertex[vertexArray[i + 1]])
        roughRoom = roughRoom + added
      }
      return roughRoom.toFixed(digit)
    },
    junctionList: (WALLS) => {
      // H && V PROBLEM WHEN TWO SEGMENT ARE v/-> == I/->
      var junction = []
      var segmentJunction = []
      var junctionChild = []
      // JUNCTION ARRAY LIST ALL SEGMENT INTERSECTIONS
      for (var i = 0; i < WALLS.length; i++) {
        var equation1 = this.qSVG.createEquation(
          WALLS[i].start.x,
          WALLS[i].start.y,
          WALLS[i].end.x,
          WALLS[i].end.y,
        )
        for (var v = 0; v < WALLS.length; v++) {
          if (v != i) {
            var equation2 = this.qSVG.createEquation(
              WALLS[v].start.x,
              WALLS[v].start.y,
              WALLS[v].end.x,
              WALLS[v].end.y,
            )
            var intersec
            if ((intersec = this.qSVG.intersectionOfEquations(equation1, equation2))) {
              if (
                (WALLS[i].end.x == WALLS[v].start.x &&
                  WALLS[i].end.y == WALLS[v].start.y) ||
                (WALLS[i].start.x == WALLS[v].end.x &&
                  WALLS[i].start.y == WALLS[v].end.y)
              ) {
                if (
                  WALLS[i].end.x == WALLS[v].start.x &&
                  WALLS[i].end.y == WALLS[v].start.y
                ) {
                  junction.push({
                    segment: i,
                    child: v,
                    values: [WALLS[v].start.x, WALLS[v].start.y],
                    type: 'natural',
                  })
                }
                if (
                  WALLS[i].start.x == WALLS[v].end.x &&
                  WALLS[i].start.y == WALLS[v].end.y
                ) {
                  junction.push({
                    segment: i,
                    child: v,
                    values: [WALLS[i].start.x, WALLS[i].start.y],
                    type: 'natural',
                  })
                }
              } else {
                if (
                  this.qSVG.btwn(
                    intersec[0],
                    WALLS[i].start.x,
                    WALLS[i].end.x,
                    'round',
                  ) &&
                  this.qSVG.btwn(
                    intersec[1],
                    WALLS[i].start.y,
                    WALLS[i].end.y,
                    'round',
                  ) &&
                  this.qSVG.btwn(
                    intersec[0],
                    WALLS[v].start.x,
                    WALLS[v].end.x,
                    'round',
                  ) &&
                  this.qSVG.btwn(
                    intersec[1],
                    WALLS[v].start.y,
                    WALLS[v].end.y,
                    'round',
                  )
                ) {
                  intersec[0] = intersec[0]
                  intersec[1] = intersec[1]
                  junction.push({
                    segment: i,
                    child: v,
                    values: [intersec[0], intersec[1]],
                    type: 'intersection',
                  })
                }
              }
            }
            // IF EQ1 == EQ 2 FIND IF START OF SECOND SEG == END OF FIRST seg (eq.A maybe values H ou V)
            if (
              (Math.abs(equation1.A) == Math.abs(equation2.A) ||
                equation1.A == equation2.A) &&
              equation1.B == equation2.B
            ) {
              if (
                WALLS[i].end.x == WALLS[v].start.x &&
                WALLS[i].end.y == WALLS[v].start.y
              ) {
                junction.push({
                  segment: i,
                  child: v,
                  values: [WALLS[v].start.x, WALLS[v].start.y],
                  type: 'natural',
                })
              }
              if (
                WALLS[i].start.x == WALLS[v].end.x &&
                WALLS[i].start.y == WALLS[v].end.y
              ) {
                junction.push({
                  segment: i,
                  child: v,
                  values: [WALLS[i].start.x, WALLS[i].start.y],
                  type: 'natural',
                })
              }
            }
          }
        }
      }
      return junction
    },
    vertexList: (junction, segment) => {
      var vertex = []
      var vertextest = []
      for (var jj = 0; jj < junction.length; jj++) {
        var found = true
        for (var vv = 0; vv < vertex.length; vv++) {
          if (
            Math.round(junction[jj].values[0]) == Math.round(vertex[vv].x) &&
            Math.round(junction[jj].values[1]) == Math.round(vertex[vv].y)
          ) {
            found = false
            vertex[vv].segment.push(junction[jj].segment)
            break
          } else {
            found = true
          }
        }
        if (found) {
          vertex.push({
            x: Math.round(junction[jj].values[0]),
            y: Math.round(junction[jj].values[1]),
            segment: [junction[jj].segment],
            bypass: 0,
            type: junction[jj].type,
          })
        }
      }

      var toClean = []
      for (var ss = 0; ss < vertex.length; ss++) {
        vertex[ss].child = []
        vertex[ss].removed = []
        for (var sg = 0; sg < vertex[ss].segment.length; sg++) {
          for (var sc = 0; sc < vertex.length; sc++) {
            if (sc != ss) {
              for (var scg = 0; scg < vertex[sc].segment.length; scg++) {
                if (vertex[sc].segment[scg] == vertex[ss].segment[sg]) {
                  vertex[ss].child.push({
                    id: sc,
                    angle: Math.floor(this.qSVG.getAngle(vertex[ss], vertex[sc]).deg),
                  })
                }
              }
            }
          }
        }
        toClean = []
        for (var fr = 0; fr < vertex[ss].child.length - 1; fr++) {
          for (var ft = fr + 1; ft < vertex[ss].child.length; ft++) {
            if (fr != ft && typeof vertex[ss].child[fr] != 'undefined') {
              found = true

              if (
                this.qSVG.btwn(
                  vertex[ss].child[ft].angle,
                  vertex[ss].child[fr].angle + 3,
                  vertex[ss].child[fr].angle - 3,
                  'round',
                ) &&
                found
              ) {
                var dOne = this.qSVG.gap(vertex[ss], vertex[vertex[ss].child[ft].id])
                var dTwo = this.qSVG.gap(vertex[ss], vertex[vertex[ss].child[fr].id])
                if (dOne > dTwo) {
                  toClean.push(ft)
                } else {
                  toClean.push(fr)
                }
              }
            }
          }
        }
        toClean.sort(function (a, b) {
          return b - a
        })
        toClean.push(-1)
        for (var cc = 0; cc < toClean.length - 1; cc++) {
          if (toClean[cc] > toClean[cc + 1]) {
            vertex[ss].removed.push(vertex[ss].child[toClean[cc]].id)
            vertex[ss].child.splice(toClean[cc], 1)
          }
        }
      }
      vertexTest = vertex
      return vertex
    },
    arrayCompare: (arr1, arr2, app) => {
      //*******************************************************
      //* @arr1, arr2 = Array to compare                      *
      //* @app = add function pop() or shift() to @arr1, arr2 *
      //* False if arr1.length != arr2.length                 *
      //* False if value into arr1[] != arr2[] - no order     *
      //* *****************************************************
      // if (arr1.length != arr2.length) return false;
      var minus = 0
      var start = 0
      if (app == 'pop') {
        minus = 1
      }
      if (app == 'shift') {
        start = 1
      }
      var coordCounter = arr1.length - minus - start
      for (var iFirst = start; iFirst < arr1.length - minus; iFirst++) {
        for (var iSecond = start; iSecond < arr2.length - minus; iSecond++) {
          if (arr1[iFirst] == arr2[iSecond]) {
            coordCounter--
          }
        }
      }
      if (coordCounter == 0) return true
      else return false
    },
    vectorVertex: (vex1, vex2, vex3) => {
      var vCurr = this.qSVG.vectorXY(vex1, vex2)
      var vNext = this.qSVG.vectorXY(vex2, vex3)
      var Na = Math.sqrt(vCurr.x * vCurr.x + vCurr.y * vCurr.y)
      var Nb = Math.sqrt(vNext.x * vNext.x + vNext.y * vNext.y)
      var C = (vCurr.x * vNext.x + vCurr.y * vNext.y) / (Na * Nb)
      var S = vCurr.x * vNext.y - vCurr.y * vNext.x
      var BAC = Math.sign(S) * Math.acos(C)
      return BAC * (180 / Math.PI)
    },
    segmentTree: (VERTEX_NUMBER, vertex) => {
      var TREELIST = [VERTEX_NUMBER]
      WAY = []
      var COUNT = vertex.length
      var ORIGIN = VERTEX_NUMBER

      const tree = (TREELIST, ORIGIN, COUNT) => {
        if (TREELIST.length == 0) return
        var TREETEMP = []
        COUNT--
        for (var k = 0; k < TREELIST.length; k++) {
          var found = true
          var WRO = TREELIST[k]
          var WRO_ARRAY = WRO.toString().split('-')
          var WR = WRO_ARRAY[WRO_ARRAY.length - 1]

          for (var v = 0; v < vertex[WR].child.length; v++) {
            if (
              vertex[WR].child[v].id == ORIGIN &&
              COUNT < vertex.length - 1 &&
              WRO_ARRAY.length > 2
            ) {
              // WAYS HYPER
              WAY.push(WRO + '-' + ORIGIN) // WAYS
              found = false
              break
            }
          }
          if (found) {
            var bestToAdd
            var bestDet = 0
            var nextVertex = -1
            // var nextVertexValue = 360;
            var nextDeterValue = Infinity
            var nextDeterVal = 0
            var nextFlag = 0
            if (vertex[WR].child.length == 1) {
              if (WR == ORIGIN && COUNT == vertex.length - 1) {
                TREETEMP.push(WRO + '-' + vertex[WR].child[0].id)
              }
              if (WR != ORIGIN && COUNT < vertex.length - 1) {
                TREETEMP.push(WRO + '-' + vertex[WR].child[0].id)
              }
            } else {
              for (
                var v = 0;
                v < vertex[WR].child.length && vertex[WR].child.length > 0;
                v++
              ) {
                if (WR == ORIGIN && COUNT == vertex.length - 1) {
                  // TO INIT FUNCTION -> // CLOCKWISE Research
                  var vDet = this.qSVG.vectorVertex(
                    { x: 0, y: -1 },
                    vertex[WR],
                    vertex[vertex[WR].child[v].id],
                  )
                  if (vDet >= nextDeterVal) {
                    nextFlag = 1
                    nextDeterVal = vDet
                    nextVertex = vertex[WR].child[v].id
                  }
                  if (Math.sign(vDet) == -1 && nextFlag == 0) {
                    if (vDet < nextDeterValue && Math.sign(nextDeterValue) > -1) {
                      nextDeterValue = vDet
                      nextVertex = vertex[WR].child[v].id
                    }
                    if (
                      vDet > nextDeterValue &&
                      Math.sign(nextDeterValue) == -1
                    ) {
                      nextDeterValue = vDet
                      nextVertex = vertex[WR].child[v].id
                    }
                  }
                }
                if (
                  WR != ORIGIN &&
                  WRO_ARRAY[WRO_ARRAY.length - 2] != vertex[WR].child[v].id &&
                  COUNT < vertex.length - 1
                ) {
                  // COUNTERCLOCKWISE Research
                  var vDet = this.qSVG.vectorVertex(
                    vertex[WRO_ARRAY[WRO_ARRAY.length - 2]],
                    vertex[WR],
                    vertex[vertex[WR].child[v].id],
                  )
                  if (vDet < nextDeterValue && nextFlag == 0) {
                    nextDeterValue = vDet
                    nextVertex = vertex[WR].child[v].id
                  }
                  if (Math.sign(vDet) == -1) {
                    nextFlag = 1
                    if (vDet <= nextDeterValue) {
                      nextDeterValue = vDet
                      nextVertex = vertex[WR].child[v].id
                    }
                  }
                }
              }
              if (nextVertex != -1) TREETEMP.push(WRO + '-' + nextVertex)
            }
          }
        }
        if (COUNT > 0) tree(TREETEMP, ORIGIN, COUNT)
      }

      tree(TREELIST, ORIGIN, COUNT)
      return WAY
    },
    polygonize: (segment) => {
      junction = this.qSVG.junctionList(segment)
      vertex = this.qSVG.vertexList(junction, segment)
      var vertexCopy = this.qSVG.vertexList(junction, segment)

      var edgesChild = []
      for (var j = 0; j < vertex.length; j++) {
        for (var vv = 0; vv < vertex[j].child.length; vv++) {
          edgesChild.push([j, vertex[j].child[vv].id])
        }
      }
      var polygons = []
      var WAYS
      for (var jc = 0; jc < edgesChild.length; jc++) {
        var bestVertex = 0
        var bestVertexValue = Infinity
        for (var j = 0; j < vertex.length; j++) {
          if (
            vertex[j].x < bestVertexValue &&
            vertex[j].child.length > 1 &&
            vertex[j].bypass == 0
          ) {
            bestVertexValue = vertex[j].x
            bestVertex = j
          }
          if (
            vertex[j].x == bestVertexValue &&
            vertex[j].child.length > 1 &&
            vertex[j].bypass == 0
          ) {
            if (vertex[j].y > vertex[bestVertex].y) {
              bestVertexValue = vertex[j].x
              bestVertex = j
            }
          }
        }

        // console.log("%c%s", "background: yellow; font-size: 14px;","RESEARCH WAY FOR STARTING VERTEX "+bestVertex);
        WAYS = this.qSVG.segmentTree(bestVertex, vertex)
        if (WAYS.length == 0) {
          vertex[bestVertex].bypass = 1
        }
        if (WAYS.length > 0) {
          var tempSurface = WAYS[0].split('-')
          var lengthRoom = this.qSVG.areaRoom(vertex, tempSurface)
          var bestArea = parseInt(lengthRoom)
          var found = true
          for (var sss = 0; sss < polygons.length; sss++) {
            if (this.qSVG.arrayCompare(polygons[sss].way, tempSurface, 'pop')) {
              found = false
              vertex[bestVertex].bypass = 1
              break
            }
          }

          if (bestArea < 360) {
            vertex[bestVertex].bypass = 1
          }
          if (vertex[bestVertex].bypass == 0) {
            // <-------- TO REVISE IMPORTANT !!!!!!!! bestArea Control ???
            var realCoords = this.qSVG.polygonIntoWalls(vertex, tempSurface)
            var realArea = this.qSVG.area(realCoords.inside)
            var outsideArea = this.qSVG.area(realCoords.outside)
            var coords = []
            for (var rr = 0; rr < tempSurface.length; rr++) {
              coords.push({
                x: vertex[tempSurface[rr]].x,
                y: vertex[tempSurface[rr]].y,
              })
            }
            // WARNING -> FAKE
            if (realCoords.inside.length != realCoords.outside) {
              polygons.push({
                way: tempSurface,
                coords: coords,
                coordsOutside: realCoords.outside,
                coordsInside: realCoords.inside,
                area: realArea,
                outsideArea: outsideArea,
                realArea: bestArea,
              })
            } else {
              // REAL INSIDE POLYGONE -> ROOM
              polygons.push({
                way: tempSurface,
                coords: realCoords.inside,
                coordsOutside: realCoords.outside,
                area: realArea,
                outsideArea: outsideArea,
                realArea: bestArea,
              })
            }

            // REMOVE FIRST POINT OF WAY ON CHILDS FIRST VERTEX
            for (var aa = 0; aa < vertex[bestVertex].child.length; aa++) {
              if (vertex[bestVertex].child[aa].id == tempSurface[1]) {
                vertex[bestVertex].child.splice(aa, 1)
              }
            }

            // REMOVE FIRST VERTEX OF WAY ON CHILDS SECOND VERTEX
            for (var aa = 0; aa < vertex[tempSurface[1]].child.length; aa++) {
              if (vertex[tempSurface[1]].child[aa].id == bestVertex) {
                vertex[tempSurface[1]].child.splice(aa, 1)
              }
            }
            //REMOVE FILAMENTS ?????

            do {
              var looping = 0
              for (var aa = 0; aa < vertex.length; aa++) {
                if (vertex[aa].child.length == 1) {
                  looping = 1
                  vertex[aa].child = []
                  for (var ab = 0; ab < vertex.length; ab++) {
                    // OR MAKE ONLY ON THE WAY tempSurface ?? BETTER ??
                    for (var ac = 0; ac < vertex[ab].child.length; ac++) {
                      if (vertex[ab].child[ac].id == aa) {
                        vertex[ab].child.splice(ac, 1)
                      }
                    }
                  }
                }
              }
            } while (looping == 1)
          }
        }
      }
      //SUB AREA(s) ON POLYGON CONTAINS OTHERS FREE POLYGONS (polygon without commonSideEdge)
      for (var pp = 0; pp < polygons.length; pp++) {
        var inside = []
        for (var free = 0; free < polygons.length; free++) {
          if (pp != free) {
            var polygonFree = polygons[free].coords
            var countCoords = polygonFree.length
            var found = true
            for (pf = 0; pf < countCoords; pf++) {
              found = this.qSVG.rayCasting(polygonFree[pf], polygons[pp].coords)
              if (!found) {
                break
              }
            }
            if (found) {
              inside.push(free)
              polygons[pp].area = polygons[pp].area - polygons[free].outsideArea
            }
          }
        }
        polygons[pp].inside = inside
      }
      return { polygons: polygons, vertex: vertex }
    },
    diffArray: (arr1, arr2) => {
      return arr1.concat(arr2).filter(function (val) {
        if (!(arr1.includes(val) && arr2.includes(val))) return val
      })
    },
    diffObjIntoArray: (arr1, arr2) => {
      var count = 0
      for (var k = 0; k < arr1.length - 1; k++) {
        for (var n = 0; n < arr2.length - 1; n++) {
          if (isObjectsEquals(arr1[k], arr2[n])) {
            count++
          }
      //* @arr1, arr2 = Array to compare                      *
      //* @app = add function pop() or shift() to @arr1, arr2 *
      //* False if arr1.length != arr2.length                 *
      //* False if value into arr1[] != arr2[] - no order     *
      //* ***********************************
        }
      }
      var waiting = arr1.length - 1
      if (waiting < arr2.length - 1) waiting = arr2.length
      return waiting - count
    },
    rayCasting: (point, polygon) => {
      var x = point.x,
        y = point.y
      var inside = false
      for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i].x,
          yi = polygon[i].y
        var xj = polygon[j].x,
          yj = polygon[j].y
        var intersect =
          yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
      }
      return inside
    },
    polygonVisualCenter: (room) => {
      //polygon = [{x1,y1}, {x2,y2}, ...]
      var polygon = room.coords
      var insideArray = room.inside
      var sample = 80
      var grid = []
      //BOUNDING BOX OF POLYGON
      var minX, minY, maxX, maxY
      for (var i = 0; i < polygon.length; i++) {
        var p = polygon[i]
        if (!i || p.x < minX) minX = p.x
        if (!i || p.y < minY) minY = p.y
        if (!i || p.x > maxX) maxX = p.x
        if (!i || p.y > maxY) maxY = p.y
      }
      var width = maxX - minX
      var height = maxY - minY
      //INIT GRID
      var sampleWidth = Math.floor(width / sample)
      var sampleHeight = Math.floor(height / sample)
      for (var hh = 0; hh < sample; hh++) {
        for (var ww = 0; ww < sample; ww++) {
          var posX = minX + ww * sampleWidth
          var posY = minY + hh * sampleHeight
          if (this.qSVG.rayCasting({ x: posX, y: posY }, polygon)) {
            var found = true
            for (var ii = 0; ii < insideArray.length; ii++) {
              if (
                this.qSVG.rayCasting(
                  { x: posX, y: posY },
                  ROOM[insideArray[ii]].coordsOutside,
                )
              ) {
                found = false
                break
              }
            }
            if (found) {
              grid.push({ x: posX, y: posY })
            }
          }
        }
      }
      var bestRange = 0
      var bestMatrix

      for (var matrix = 0; matrix < grid.length; matrix++) {
        var minDistance = Infinity
        for (var pp = 0; pp < polygon.length - 1; pp++) {
          var scanDistance = this.qSVG.pDistance(
            grid[matrix],
            polygon[pp],
            polygon[pp + 1],
          )
          if (scanDistance.distance < minDistance) {
            minDistance = scanDistance.distance
          }
        }
        if (minDistance > bestRange) {
          bestMatrix = matrix
          bestRange = minDistance
        }
      }
      return grid[bestMatrix]
    },
    textOnDiv: (label, pos, styled, div) => {
      if (typeof pos != 'undefined') {
        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        text.setAttributeNS(null, 'x', pos.x)
        text.setAttributeNS(null, 'y', pos.y)
        text.setAttribute(
          'style',
          'fill:' +
            styled.color +
            ';font-weight:' +
            styled.fontWeight +
            ';font-size:' +
            styled.fontSize,
        )
        text.setAttributeNS(null, 'text-anchor', 'middle')
        text.textContent = label
        document.getElementById(div).appendChild(text)
      }
    },
  }
}

Application.prototype.editorFactory = function() {
  return {
    wall: (start, end, type, thick) => {
      return {
        thick,
        start,
        end,
        type,
        parent: null,
        child: null,
        angle: 0,
        equations: {},
        coords: [],
        backUp: false
      }
    },
    getWallNode: (coords, except = false) => {
      // RETURN OBJECTS ARRAY INDEX OF WALLS [WALL1, WALL2, n...] WALLS WITH THIS NODE, EXCEPT PARAM = OBJECT WALL
      var nodes = []
      for (var k in this.WALLS) {
        if (!isObjectsEquals(this.WALLS[k], except)) {
          if (isObjectsEquals(this.WALLS[k].start, coords)) {
            nodes.push({ wall: this.WALLS[k], type: 'start' })
          }
          if (isObjectsEquals(this.WALLS[k].end, coords)) {
            nodes.push({ wall: this.WALLS[k], type: 'end' })
          }
        }
      }
      if (nodes.length == 0) return false
      else return nodes
    },
    wallsComputing: (WALLS, action = false) => {
      // IF ACTION == MOVE -> equation2 exist !!!!!
      $('#boxwall').empty()
      $('#boxArea').empty()

      for (var vertice = 0; vertice < this.WALLS.length; vertice++) {
        var wall = WALLS[vertice]
        if (wall.parent != null) {
          if (
            !isObjectsEquals(wall.parent.start, wall.start) &&
            !isObjectsEquals(wall.parent.end, wall.start)
          ) {
            wall.parent = null
          }
        }
        if (wall.child != null) {
          if (
            !isObjectsEquals(wall.child.start, wall.end) &&
            !isObjectsEquals(wall.child.end, wall.end)
          ) {
            wall.child = null
          }
        }
      }

      for (var vertice = 0; vertice < this.WALLS.length; vertice++) {
        var wall = this.WALLS[vertice]
        if (wall.parent != null) {
          if (isObjectsEquals(wall.parent.start, wall.start)) {
            var previousWall = wall.parent
            var previousWallStart = previousWall.end
            var previousWallEnd = previousWall.start
          }
          if (isObjectsEquals(wall.parent.end, wall.start)) {
            var previousWall = wall.parent
            var previousWallStart = previousWall.start
            var previousWallEnd = previousWall.end
          }
        } else {
          var S = this.editor.getWallNode(wall.start, wall)
          // if (wallInhibation && isObjectsEquals(wall, wallInhibation)) S = false;
          for (var k in S) {
            var eqInter = this.editor.createEquationFromWall(S[k].wall)
            var angleInter = 90 // TO PASS TEST
            if (action == 'move') {
              angleInter = this.qSVG.angleBetweenEquations(eqInter.A, equation2.A)
            }
            if (
              S[k].type == 'start' &&
              S[k].wall.parent == null &&
              angleInter > 20 &&
              angleInter < 160
            ) {
              wall.parent = S[k].wall
              S[k].wall.parent = wall
              var previousWall = wall.parent
              var previousWallStart = previousWall.end
              var previousWallEnd = previousWall.start
            }
            if (
              S[k].type == 'end' &&
              S[k].wall.child == null &&
              angleInter > 20 &&
              angleInter < 160
            ) {
              wall.parent = S[k].wall
              S[k].wall.child = wall
              var previousWall = wall.parent
              var previousWallStart = previousWall.start
              var previousWallEnd = previousWall.end
            }
          }
        }

        if (wall.child != null) {
          if (isObjectsEquals(wall.child.end, wall.end)) {
            var nextWall = wall.child
            var nextWallStart = nextWall.end
            var nextWallEnd = nextWall.start
          } else {
            var nextWall = wall.child
            var nextWallStart = nextWall.start
            var nextWallEnd = nextWall.end
          }
        } else {
          var E = this.editor.getWallNode(wall.end, wall)
          // if (wallInhibation && isObjectsEquals(wall, wallInhibation)) E = false;
          for (var k in E) {
            var eqInter = this.editor.createEquationFromWall(E[k].wall)
            var angleInter = 90 // TO PASS TEST
            if (action == 'move') {
              angleInter = this.qSVG.angleBetweenEquations(eqInter.A, equation2.A)
            }
            if (
              E[k].type == 'end' &&
              E[k].wall.child == null &&
              angleInter > 20 &&
              angleInter < 160
            ) {
              wall.child = E[k].wall
              E[k].wall.child = wall
              var nextWall = wall.child
              var nextWallStart = nextWall.end
              var nextWallEnd = nextWall.start
            }
            if (
              E[k].type == 'start' &&
              E[k].wall.parent == null &&
              angleInter > 20 &&
              angleInter < 160
            ) {
              wall.child = E[k].wall
              E[k].wall.parent = wall
              var nextWall = wall.child
              var nextWallStart = nextWall.start
              var nextWallEnd = nextWall.end
            }
          }
        }

        var angleWall = Math.atan2(
          wall.end.y - wall.start.y,
          wall.end.x - wall.start.x,
        )
        wall.angle = angleWall
        var wallThickX = (wall.thick / 2) * Math.sin(angleWall)
        var wallThickY = (wall.thick / 2) * Math.cos(angleWall)
        var eqWallUp = this.qSVG.createEquation(
          wall.start.x + wallThickX,
          wall.start.y - wallThickY,
          wall.end.x + wallThickX,
          wall.end.y - wallThickY,
        )
        var eqWallDw = this.qSVG.createEquation(
          wall.start.x - wallThickX,
          wall.start.y + wallThickY,
          wall.end.x - wallThickX,
          wall.end.y + wallThickY,
        )
        var eqWallBase = this.qSVG.createEquation(
          wall.start.x,
          wall.start.y,
          wall.end.x,
          wall.end.y,
        )
        wall.equations = { up: eqWallUp, down: eqWallDw, base: eqWallBase }
        var dWay

        // WALL STARTED
        if (wall.parent == null) {
          var eqP = this.qSVG.perpendicularEquation(
            eqWallUp,
            wall.start.x,
            wall.start.y,
          )
          var interUp = this.qSVG.intersectionOfEquations(eqWallUp, eqP, 'object')
          var interDw = this.qSVG.intersectionOfEquations(eqWallDw, eqP, 'object')
          wall.coords = [interUp, interDw]
          dWay =
            'M' +
            interUp.x +
            ',' +
            interUp.y +
            ' L' +
            interDw.x +
            ',' +
            interDw.y +
            ' '
        } else {
          var eqP = this.qSVG.perpendicularEquation(
            eqWallUp,
            wall.start.x,
            wall.start.y,
          )
          // var previousWall = wall.parent;
          //   var previousWallStart = previousWall.start;
          //   var previousWallEnd = previousWall.end;
          var anglePreviousWall = Math.atan2(
            previousWallEnd.y - previousWallStart.y,
            previousWallEnd.x - previousWallStart.x,
          )
          var previousWallThickX =
            (previousWall.thick / 2) * Math.sin(anglePreviousWall)
          var previousWallThickY =
            (previousWall.thick / 2) * Math.cos(anglePreviousWall)
          var eqPreviousWallUp = this.qSVG.createEquation(
            previousWallStart.x + previousWallThickX,
            previousWallStart.y - previousWallThickY,
            previousWallEnd.x + previousWallThickX,
            previousWallEnd.y - previousWallThickY,
          )
          var eqPreviousWallDw = this.qSVG.createEquation(
            previousWallStart.x - previousWallThickX,
            previousWallStart.y + previousWallThickY,
            previousWallEnd.x - previousWallThickX,
            previousWallEnd.y + previousWallThickY,
          )
          if (Math.abs(anglePreviousWall - angleWall) > 0.09) {
            var interUp = this.qSVG.intersectionOfEquations(
              eqWallUp,
              eqPreviousWallUp,
              'object',
            )
            var interDw = this.qSVG.intersectionOfEquations(
              eqWallDw,
              eqPreviousWallDw,
              'object',
            )

            if (eqWallUp.A == eqPreviousWallUp.A) {
              interUp = {
                x: wall.start.x + wallThickX,
                y: wall.start.y - wallThickY,
              }
              interDw = {
                x: wall.start.x - wallThickX,
                y: wall.start.y + wallThickY,
              }
            }

            var miter = this.qSVG.gap(interUp, {
              x: previousWallEnd.x,
              y: previousWallEnd.y,
            })
            if (miter > 1000) {
              var interUp = this.qSVG.intersectionOfEquations(eqP, eqWallUp, 'object')
              var interDw = this.qSVG.intersectionOfEquations(eqP, eqWallDw, 'object')
            }
          }
          if (Math.abs(anglePreviousWall - angleWall) <= 0.09) {
            var interUp = this.qSVG.intersectionOfEquations(eqP, eqWallUp, 'object')
            var interDw = this.qSVG.intersectionOfEquations(eqP, eqWallDw, 'object')
          }
          wall.coords = [interUp, interDw]
          dWay =
            'M' +
            interUp.x +
            ',' +
            interUp.y +
            ' L' +
            interDw.x +
            ',' +
            interDw.y +
            ' '
        }

        // WALL FINISHED
        if (wall.child == null) {
          var eqP = this.qSVG.perpendicularEquation(eqWallUp, wall.end.x, wall.end.y)
          var interUp = this.qSVG.intersectionOfEquations(eqWallUp, eqP, 'object')
          var interDw = this.qSVG.intersectionOfEquations(eqWallDw, eqP, 'object')
          wall.coords.push(interDw, interUp)
          dWay =
            dWay +
            'L' +
            interDw.x +
            ',' +
            interDw.y +
            ' L' +
            interUp.x +
            ',' +
            interUp.y +
            ' Z'
        } else {
          var eqP = this.qSVG.perpendicularEquation(eqWallUp, wall.end.x, wall.end.y)
          // var nextWall = wall.child;
          //   var nextWallStart = nextWall.start;
          //   var nextWallEnd = nextWall.end;
          var angleNextWall = Math.atan2(
            nextWallEnd.y - nextWallStart.y,
            nextWallEnd.x - nextWallStart.x,
          )
          var nextWallThickX = (nextWall.thick / 2) * Math.sin(angleNextWall)
          var nextWallThickY = (nextWall.thick / 2) * Math.cos(angleNextWall)
          var eqNextWallUp = this.qSVG.createEquation(
            nextWallStart.x + nextWallThickX,
            nextWallStart.y - nextWallThickY,
            nextWallEnd.x + nextWallThickX,
            nextWallEnd.y - nextWallThickY,
          )
          var eqNextWallDw = this.qSVG.createEquation(
            nextWallStart.x - nextWallThickX,
            nextWallStart.y + nextWallThickY,
            nextWallEnd.x - nextWallThickX,
            nextWallEnd.y + nextWallThickY,
          )
          if (Math.abs(angleNextWall - angleWall) > 0.09) {
            var interUp = this.qSVG.intersectionOfEquations(
              eqWallUp,
              eqNextWallUp,
              'object',
            )
            var interDw = this.qSVG.intersectionOfEquations(
              eqWallDw,
              eqNextWallDw,
              'object',
            )

            if (eqWallUp.A == eqNextWallUp.A) {
              interUp = { x: wall.end.x + wallThickX, y: wall.end.y - wallThickY }
              interDw = { x: wall.end.x - wallThickX, y: wall.end.y + wallThickY }
            }

            var miter = this.qSVG.gap(interUp, {
              x: nextWallStart.x,
              y: nextWallStart.y,
            })
            if (miter > 1000) {
              var interUp = this.qSVG.intersectionOfEquations(eqWallUp, eqP, 'object')
              var interDw = this.qSVG.intersectionOfEquations(eqWallDw, eqP, 'object')
            }
          }
          if (Math.abs(angleNextWall - angleWall) <= 0.09) {
            var interUp = this.qSVG.intersectionOfEquations(eqWallUp, eqP, 'object')
            var interDw = this.qSVG.intersectionOfEquations(eqWallDw, eqP, 'object')
          }

          wall.coords.push(interDw, interUp)
          dWay =
            dWay +
            'L' +
            interDw.x +
            ',' +
            interDw.y +
            ' L' +
            interUp.x +
            ',' +
            interUp.y +
            ' Z'
        }

        wall.graph = this.editor.makeWall(dWay)
        $('#boxwall').append(wall.graph)
      }
    },
    makeWall: (way) => {
      var wallScreen = this.qSVG.create('none', 'path', {
        d: way,
        stroke: 'none',
        fill: this.colorWall,
        'stroke-width': 1,
        'stroke-linecap': 'butt',
        'stroke-linejoin': 'miter',
        'stroke-miterlimit': 4,
        'fill-rule': 'nonzero',
      })
      return wallScreen
    },
    invisibleWall: (wallToInvisble = false) => {
      if (!wallToInvisble) wallToInvisble = this.binder.wall
      var objWall = editor.objFromWall(wallBind)
      if (objWall.length == 0) {
        wallToInvisble.type = 'separate'
        wallToInvisble.backUp = wallToInvisble.thick
        wallToInvisble.thick = 0.07
        this.editor.architect(this.WALLS)
        this.mode = 'select_mode'
        $('#panel').show(200)
        save()
        return true
      } else {
        $('#boxinfo').html(
          'Les murs contenant des portes ou des fenêtres ne peuvent être une séparation !',
        )
        return false
      }
    },
    visibleWall: (wallToInvisble = false) => {
      if (!wallToInvisble) wallToInvisble = this.binder.wall
      wallToInvisble.type = 'normal'
      wallToInvisble.thick = wallToInvisble.backUp
      wallToInvisble.backUp = false
      this.editor.architect(this.WALLS)
      this.mode = 'select_mode'
      $('#panel').show(200)
      save()
      return true
    },
    architect: (WALLS) => {
      this.editor.wallsComputing(this.WALLS)
      const Rooms = this.qSVG.polygonize(this.WALLS)
      $('#boxRoom').empty()
      $('#boxSurface').empty()
      this.editor.roomMaker(Rooms)
      return true
    },
    splitWall: (wallToSplit = false) => {
      if (!wallToSplit) wallToSplit = this.binder.wall
      var eqWall = this.editor.createEquationFromWall(wallToSplit)
      var wallToSplitLength = this.qSVG.gap(wallToSplit.start, wallToSplit.end)
      var newWalls = []
      for (var k in this.WALLS) {
        var eq = this.editor.createEquationFromWall(this.WALLS[k])
        var inter = this.qSVG.intersectionOfEquations(eqWall, eq, 'obj')
        if (
          this.qSVG.btwn(inter.x, this.binder.wall.start.x, this.binder.wall.end.x, 'round') &&
          this.qSVG.btwn(inter.y, this.binder.wall.start.y, this.binder.wall.end.y, 'round') &&
          this.qSVG.btwn(inter.x, this.WALLS[k].start.x, this.WALLS[k].end.x, 'round') &&
          this.qSVG.btwn(inter.y, this.WALLS[k].start.y, this.WALLS[k].end.y, 'round')
        ) {
          var distance = this.qSVG.gap(wallToSplit.start, inter)
          if (distance > 5 && distance < wallToSplitLength)
            newWalls.push({ distance: distance, coords: inter })
        }
      }
      newWalls.sort(function (a, b) {
        return (a.distance - b.distance).toFixed(2)
      })
      var initCoords = wallToSplit.start
      var initThick = wallToSplit.thick
      // CLEAR THE WALL BEFORE PIECES RE-BUILDER
      for (var k in this.WALLS) {
        if (isObjectsEquals(this.WALLS[k].child, wallToSplit)) this.WALLS[k].child = null
        if (isObjectsEquals(this.WALLS[k].parent, wallToSplit)) {
          this.WALLS[k].parent = null
        }
      }
      this.WALLS.splice(this.WALLS.indexOf(wallToSplit), 1)
      var wall
      for (var k in newWalls) {
        wall = new editor.wall(
          initCoords,
          newWalls[k].coords,
          'normal',
          initThick,
        )
        this.WALLS.push(wall)
        wall.child = WALLS[WALLS.length]
        initCoords = newWalls[k].coords
      }
      // LAST WALL ->
      wall = new editor.wall(initCoords, wallToSplit.end, 'normal', initThick)
      this.WALLS.push(wall)
      this.editor.architect(this.WALLS)
      this.mode = 'select_mode'
      $('#panel').show(200)
      save()
      return true
    },
    nearWallNode: (snap, range = Infinity, except = ['']) => {
      var best
      var bestWall
      var scan
      var i = 0
      var scanDistance
      var bestDistance = Infinity
      for (var k = 0; k < this.WALLS.length; k++) {
        if (except.indexOf(this.WALLS[k]) == -1) {
          scanStart = this.WALLS[k].start
          scanEnd = this.WALLS[k].end
          scanDistance = this.qSVG.measure(scanStart, snap)
          if (scanDistance < bestDistance) {
            best = scanStart
            bestDistance = scanDistance
            bestWall = k
          }
          scanDistance = this.qSVG.measure(scanEnd, snap)
          if (scanDistance < bestDistance) {
            best = scanEnd
            bestDistance = scanDistance
            bestWall = k
          }
        }
      }
      if (bestDistance <= range) {
        return {
          x: best.x,
          y: best.y,
          bestWall: bestWall,
        }
      } else {
        return false
      }
    },
    rayCastingWall: (snap) => {
      // USING WALLS SUPER WALL OBJECTS ARRAY
      var wallList = []
      for (var i = 0; i < this.WALLS.length; i++) {
        var polygon = []
        for (var pp = 0; pp < 4; pp++) {
          polygon.push({ x: this.WALLS[i].coords[pp].x, y: this.WALLS[i].coords[pp].y }) // FOR Z
        }
        if (this.qSVG.rayCasting(snap, polygon)) {
          wallList.push(this.WALLS[i]) // Return EDGES Index
        }
      }
      if (wallList.length == 0) return false
      else {
        if (wallList.length == 1) return wallList[0]
        else return wallList
      }
    },
    stickOnWall: (snap) => {
      if (this.WALLS.length == 0) return false
      var wallDistance = Infinity
      var wallSelected = {}
      var result
      if (this.WALLS.length == 0) return false
      for (var e = 0; e < WALLS.length; e++) {
        var eq1 = this.qSVG.createEquation(
          this.WALLS[e].coords[0].x,
          this.WALLS[e].coords[0].y,
          this.WALLS[e].coords[3].x,
          this.WALLS[e].coords[3].y,
        )
        result1 = this.qSVG.nearPointOnEquation(eq1, snap)
        var eq2 = this.qSVG.createEquation(
          this.WALLS[e].coords[1].x,
          this.WALLS[e].coords[1].y,
          this.WALLS[e].coords[2].x,
          this.WALLS[e].coords[2].y,
        )
        result2 = this.qSVG.nearPointOnEquation(eq2, snap)
        if (
          result1.distance < wallDistance &&
          this.qSVG.btwn(result1.x, this.WALLS[e].coords[0].x, this.WALLS[e].coords[3].x) &&
          this.qSVG.btwn(result1.y, this.WALLS[e].coords[0].y, this.WALLS[e].coords[3].y)
        ) {
          wallDistance = result1.distance
          wallSelected = {
            wall: this.WALLS[e],
            x: result1.x,
            y: result1.y,
            distance: result1.distance,
          }
        }
        if (
          result2.distance < wallDistance &&
          this.qSVG.btwn(result2.x, this.WALLS[e].coords[1].x, this.WALLS[e].coords[2].x) &&
          this.qSVG.btwn(result2.y, this.WALLS[e].coords[1].y, this.WALLS[e].coords[2].y)
        ) {
          wallDistance = result2.distance
          wallSelected = {
            wall: this.WALLS[e],
            x: result2.x,
            y: result2.y,
            distance: result2.distance,
          }
        }
      }
      var vv = editor.nearVertice(snap)
      if (vv.distance < wallDistance) {
        var eq1 = this.qSVG.createEquation(
          vv.number.coords[0].x,
          vv.number.coords[0].y,
          vv.number.coords[3].x,
          vv.number.coords[3].y,
        )
        result1 = this.qSVG.nearPointOnEquation(eq1, vv)
        var eq2 = this.qSVG.createEquation(
          vv.number.coords[1].x,
          vv.number.coords[1].y,
          vv.number.coords[2].x,
          vv.number.coords[2].y,
        )
        result2 = this.qSVG.nearPointOnEquation(eq2, vv)
        if (
          result1.distance < wallDistance &&
          this.qSVG.btwn(result1.x, vv.number.coords[0].x, vv.number.coords[3].x) &&
          this.qSVG.btwn(result1.y, vv.number.coords[0].y, vv.number.coords[3].y)
        ) {
          wallDistance = result1.distance
          wallSelected = {
            wall: vv.number,
            x: result1.x,
            y: result1.y,
            distance: result1.distance,
          }
        }
        if (
          result2.distance < wallDistance &&
          this.qSVG.btwn(result2.x, vv.number.coords[1].x, vv.number.coords[2].x) &&
          this.qSVG.btwn(result2.y, vv.number.coords[1].y, vv.number.coords[2].y)
        ) {
          wallDistance = result2.distance
          wallSelected = {
            wall: vv.number,
            x: result2.x,
            y: result2.y,
            distance: result2.distance,
          }
        }
      }
      return wallSelected
    },
    objFromWall: (wall, typeObj = false) => {
      // RETURN OBJDATA INDEX LIST FROM AN WALL
      var objList = []
      for (var scan = 0; scan < this.OBJDATA.length; scan++) {
        var search
        if (this.OBJDATA[scan].family == 'inWall') {
          var eq = this.qSVG.createEquation(
            wall.start.x,
            wall.start.y,
            wall.end.x,
            wall.end.y,
          )
          search = this.qSVG.nearPointOnEquation(eq, this.OBJDATA[scan])
          if (
            search.distance < 0.01 &&
            this.qSVG.btwn(this.OBJDATA[scan].x, wall.start.x, wall.end.x) &&
            this.qSVG.btwn(this.OBJDATA[scan].y, wall.start.y, wall.end.y)
          )
            objList.push(this.OBJDATA[scan])
          // WARNING 0.01 TO NO COUNT OBJECT ON LIMITS OF THE EDGE !!!!!!!!!!!! UGLY CODE( MOUSE PRECISION)
          // TRY WITH ANGLE MAYBE ???
        }
      }
      return objList
    },
    createEquationFromWall: (wall) => {
      return this.qSVG.createEquation(
        wall.start.x,
        wall.start.y,
        wall.end.x,
        wall.end.y,
      )
    },
    rayCastingWalls: (snap) => {
      // WALLS SUPER ARRAY
      var wallList = []
      for (var i = 0; i < this.WALLS.length; i++) {
        var polygon = []
        for (var pp = 0; pp < 4; pp++) {
          polygon.push({ x: this.WALLS[i].coords[pp].x, y: this.WALLS[i].coords[pp].y }) // FOR Z
        }
        if (this.qSVG.rayCasting(snap, polygon)) {
          wallList.push(this.WALLS[i]) // Return EDGES Index
        }
      }
      if (wallList.length == 0) return false
      else {
        if (wallList.length == 1) return wallList[0]
        else return wallList
      }
    },
    inWallRib2: (wall, option = false) => {
      if (!option) $('#boxRib').empty()
      ribMaster = []
      var emptyArray = []
      ribMaster.push(emptyArray)
      ribMaster.push(emptyArray)
      var inter
      var distance
      var cross
      var angleTextValue = wall.angle * (180 / Math.PI)
      var objWall = editor.objFromWall(wall) // LIST OBJ ON EDGE
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
      for (var ob in objWall) {
        var objTarget = objWall[ob]
        objTarget.up = [
          this.qSVG.nearPointOnEquation(wall.equations.up, objTarget.limit[0]),
          this.qSVG.nearPointOnEquation(wall.equations.up, objTarget.limit[1]),
        ]
        objTarget.down = [
          this.qSVG.nearPointOnEquation(wall.equations.down, objTarget.limit[0]),
          this.qSVG.nearPointOnEquation(wall.equations.down, objTarget.limit[1]),
        ]

        distance = this.qSVG.measure(wall.coords[0], objTarget.up[0]) / meter
        ribMaster[0].push({
          wall: wall,
          crossObj: ob,
          side: 'up',
          coords: objTarget.up[0],
          distance: distance.toFixed(2),
        })
        distance = this.qSVG.measure(wall.coords[0], objTarget.up[1]) / meter
        ribMaster[0].push({
          wall: wall,
          crossObj: ob,
          side: 'up',
          coords: objTarget.up[1],
          distance: distance.toFixed(2),
        })
        distance = this.qSVG.measure(wall.coords[1], objTarget.down[0]) / meter
        ribMaster[1].push({
          wall: wall,
          crossObj: ob,
          side: 'down',
          coords: objTarget.down[0],
          distance: distance.toFixed(2),
        })
        distance = this.qSVG.measure(wall.coords[1], objTarget.down[1]) / meter
        ribMaster[1].push({
          wall: wall,
          crossObj: ob,
          side: 'down',
          coords: objTarget.down[1],
          distance: distance.toFixed(2),
        })
      }
      distance = this.qSVG.measure(wall.coords[0], wall.coords[3]) / meter
      ribMaster[0].push({
        wall: wall,
        crossObj: false,
        side: 'up',
        coords: wall.coords[3],
        distance: distance,
      })
      distance = this.qSVG.measure(wall.coords[1], wall.coords[2]) / meter
      ribMaster[1].push({
        wall: wall,
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
      for (var t in ribMaster) {
        for (var n = 1; n < ribMaster[t].length; n++) {
          var found = true
          var shift = -5
          var valueText = Math.abs(
            ribMaster[t][n - 1].distance - ribMaster[t][n].distance,
          )
          var angleText = angleTextValue
          if (found) {
            if (ribMaster[t][n - 1].side == 'down') {
              shift = -shift + 10
            }
            if (angleText > 89 || angleText < -89) {
              angleText -= 180
              if (ribMaster[t][n - 1].side == 'down') {
                shift = -5
              } else shift = -shift + 10
            }

            sizeText[n] = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'text',
            )
            var startText = this.qSVG.middle(
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
            sizeText[n].setAttributeNS(null, 'stroke-width', '0.4px')
            sizeText[n].setAttributeNS(null, 'fill', '#666666')
            sizeText[n].setAttribute(
              'transform',
              'rotate(' + angleText + ' ' + startText.x + ',' + startText.y + ')',
            )

            $('#boxRib').append(sizeText[n])
          }
        }
      }
    },
    obj2D: (family, classe, type, pos, angle, angleSign, size, hinge = 'normal', thick, value) => {
      // value can be "text label", "step number in stair", etc...
      this.family = family // inWall, stick, collision, free
      this.class = classe // door, window, energy, stair, measure, text ?
      this.type = type // simple, double, simpleSlide, aperture, doubleSlide, fixed, switch, lamp....
      this.x = pos.x
      this.y = pos.y
      this.angle = angle
      this.angleSign = angleSign
      this.limit = []
      this.hinge = hinge // normal, reverse
      this.graph = this.qSVG.create('none', 'g')
      this.scale = { x: 1, y: 1 }
      this.value = value
      this.size = size
      this.thick = thick
      this.width = (this.size / meter).toFixed(2)
      this.height = (this.thick / meter).toFixed(2)

      var cc = carpentryCalc(classe, type, size, thick, value)
      var blank

      for (var tt = 0; tt < cc.length; tt++) {
        if (cc[tt].path) {
          blank = this.qSVG.create('none', 'path', {
            d: cc[tt].path,
            'stroke-width': 1,
            fill: cc[tt].fill,
            stroke: cc[tt].stroke,
            'stroke-dasharray': cc[tt].strokeDashArray,
          })
        }
        if (cc[tt].text) {
          blank = this.qSVG.create('none', 'text', {
            x: cc[tt].x,
            y: cc[tt].y,
            'font-size': cc[tt].fontSize,
            stroke: cc[tt].stroke,
            'stroke-width': cc[tt].strokeWidth,
            'font-family': 'roboto',
            'text-anchor': 'middle',
            fill: cc[tt].fill,
          })
          blank[0].textContent = cc[tt].text
        }
        this.graph.append(blank)
      } // ENDFOR
      var bbox = this.graph.get(0).getBoundingClientRect()
      bbox.x = bbox.x * scaleFactor - offset.left * scaleFactor + originX_viewbox
      bbox.y = bbox.y * scaleFactor - offset.top * scaleFactor + originY_viewbox
      bbox.origin = { x: this.x, y: this.y }
      this.bbox = bbox
      this.realBbox = [
        { x: -this.size / 2, y: -this.thick / 2 },
        { x: this.size / 2, y: -this.thick / 2 },
        { x: this.size / 2, y: this.thick / 2 },
        { x: -this.size / 2, y: this.thick / 2 },
      ]
      if (family == 'byObject') this.family = cc.family
      this.params = cc.params // (bindBox, move, resize, rotate)
      cc.params.width ? (this.size = cc.params.width) : (this.size = size)
      cc.params.height ? (this.thick = cc.params.height) : (this.thick = thick)

      this.update = function () {
        this.width = (this.size / meter).toFixed(2)
        this.height = (this.thick / meter).toFixed(2)
        cc = carpentryCalc(
          this.class,
          this.type,
          this.size,
          this.thick,
          this.value,
        )
        for (var tt = 0; tt < cc.length; tt++) {
          if (cc[tt].path) {
            this.graph.find('path')[tt].setAttribute('d', cc[tt].path)
          } else {
            // this.graph.find('text').context.textContent = cc[tt].text;
          }
        }
        var hingeStatus = this.hinge // normal - reverse
        var hingeUpdate
        if (hingeStatus == 'normal') hingeUpdate = 1
        else hingeUpdate = -1
        this.graph.attr({
          transform:
            'translate(' +
            this.x +
            ',' +
            this.y +
            ') rotate(' +
            this.angle +
            ',0,0) scale(' +
            hingeUpdate +
            ', 1)',
        })
        var bbox = this.graph.get(0).getBoundingClientRect()
        bbox.x = bbox.x * scaleFactor - offset.left * scaleFactor + originX_viewbox
        bbox.y = bbox.y * scaleFactor - offset.top * scaleFactor + originY_viewbox
        bbox.origin = { x: this.x, y: this.y }
        this.bbox = bbox

        if (this.class == 'text' && this.angle == 0) {
          this.realBbox = [
            { x: this.bbox.x, y: this.bbox.y },
            { x: this.bbox.x + this.bbox.width, y: this.bbox.y },
            {
              x: this.bbox.x + this.bbox.width,
              y: this.bbox.y + this.bbox.height,
            },
            { x: this.bbox.x, y: this.bbox.y + this.bbox.height },
          ]
          this.size = this.bbox.width
          this.thick = this.bbox.height
        }

        var angleRadian = -this.angle * (Math.PI / 180)
        this.realBbox = [
          { x: -this.size / 2, y: -this.thick / 2 },
          { x: this.size / 2, y: -this.thick / 2 },
          { x: this.size / 2, y: this.thick / 2 },
          { x: -this.size / 2, y: this.thick / 2 },
        ]
        var newRealBbox = [
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
        ]
        newRealBbox[0].x =
          this.realBbox[0].y * Math.sin(angleRadian) +
          this.realBbox[0].x * Math.cos(angleRadian) +
          this.x
        newRealBbox[1].x =
          this.realBbox[1].y * Math.sin(angleRadian) +
          this.realBbox[1].x * Math.cos(angleRadian) +
          this.x
        newRealBbox[2].x =
          this.realBbox[2].y * Math.sin(angleRadian) +
          this.realBbox[2].x * Math.cos(angleRadian) +
          this.x
        newRealBbox[3].x =
          this.realBbox[3].y * Math.sin(angleRadian) +
          this.realBbox[3].x * Math.cos(angleRadian) +
          this.x
        newRealBbox[0].y =
          this.realBbox[0].y * Math.cos(angleRadian) -
          this.realBbox[0].x * Math.sin(angleRadian) +
          this.y
        newRealBbox[1].y =
          this.realBbox[1].y * Math.cos(angleRadian) -
          this.realBbox[1].x * Math.sin(angleRadian) +
          this.y
        newRealBbox[2].y =
          this.realBbox[2].y * Math.cos(angleRadian) -
          this.realBbox[2].x * Math.sin(angleRadian) +
          this.y
        newRealBbox[3].y =
          this.realBbox[3].y * Math.cos(angleRadian) -
          this.realBbox[3].x * Math.sin(angleRadian) +
          this.y
        this.realBbox = newRealBbox
        return true
      }
    },
    roomMaker: (Rooms) => {
      globalArea = 0
      var oldVertexNumber = []
      if (Rooms.polygons.length == 0) this.ROOM = []
      for (var pp = 0; pp < Rooms.polygons.length; pp++) {
        var foundRoom = false
        var roomId
        for (var rr = 0; rr < this.ROOM.length; rr++) {
          roomId = rr
          var countCoords = Rooms.polygons[pp].coords.length
          var diffCoords = this.qSVG.diffObjIntoArray(
            Rooms.polygons[pp].coords,
            this.ROOM[rr].coords,
          )
          if (Rooms.polygons[pp].way.length == this.ROOM[rr].way.length) {
            if (
              this.qSVG.diffArray(Rooms.polygons[pp].way, this.ROOM[rr].way).length == 0 ||
              diffCoords == 0
            ) {
              countCoords = 0
            }
          }
          if (Rooms.polygons[pp].way.length == this.ROOM[rr].way.length + 1) {
            if (
              this.qSVG.diffArray(Rooms.polygons[pp].way, this.ROOM[rr].way).length == 1 ||
              diffCoords == 2
            ) {
              countCoords = 0
            }
          }
          if (Rooms.polygons[pp].way.length == this.ROOM[rr].way.length - 1) {
            if (
              this.qSVG.diffArray(Rooms.polygons[pp].way, this.ROOM[rr].way).length == 1
            ) {
              countCoords = 0
            }
          }
          if (countCoords == 0) {
            foundRoom = true
            this.ROOM[rr].area = Rooms.polygons[pp].area
            this.ROOM[rr].inside = Rooms.polygons[pp].inside
            this.ROOM[rr].coords = Rooms.polygons[pp].coords
            this.ROOM[rr].coordsOutside = Rooms.polygons[pp].coordsOutside
            this.ROOM[rr].way = Rooms.polygons[pp].way
            this.ROOM[rr].coordsInside = Rooms.polygons[pp].coordsInside
            break
          }
        }
        if (!foundRoom) {
          this.ROOM.push({
            coords: Rooms.polygons[pp].coords,
            coordsOutside: Rooms.polygons[pp].coordsOutside,
            coordsInside: Rooms.polygons[pp].coordsInside,
            inside: Rooms.polygons[pp].inside,
            way: Rooms.polygons[pp].way,
            area: Rooms.polygons[pp].area,
            surface: '',
            name: '',
            color: 'gradientWhite',
            showSurface: true,
            action: 'add',
          })
        }
      }

      var toSplice = []
      for (var rr = 0; rr < this.ROOM.length; rr++) {
        var found = true
        for (var pp = 0; pp < Rooms.polygons.length; pp++) {
          var countRoom = this.ROOM[rr].coords.length
          var diffCoords = this.qSVG.diffObjIntoArray(
            Rooms.polygons[pp].coords,
            this.ROOM[rr].coords,
          )
          if (Rooms.polygons[pp].way.length == this.ROOM[rr].way.length) {
            if (
              this.qSVG.diffArray(Rooms.polygons[pp].way, this.ROOM[rr].way).length == 0 ||
              diffCoords == 0
            ) {
              countRoom = 0
            }
          }
          if (Rooms.polygons[pp].way.length == this.ROOM[rr].way.length + 1) {
            if (
              this.qSVG.diffArray(Rooms.polygons[pp].way, this.ROOM[rr].way).length == 1 ||
              diffCoords == 2
            ) {
              countRoom = 0
            }
          }
          if (Rooms.polygons[pp].way.length == this.ROOM[rr].way.length - 1) {
            if (
              this.qSVG.diffArray(Rooms.polygons[pp].way, this.ROOM[rr].way).length == 1
            ) {
              countRoom = 0
            }
          }
          if (countRoom == 0) {
            found = true
            break
          } else found = false
        }
        if (!found) toSplice.push(rr)
      }

      toSplice.sort(function (a, b) {
        return b - a
      })
      for (var ss = 0; ss < toSplice.length; ss++) {
        this.ROOM.splice(toSplice[ss], 1)
      }
      $('#boxRoom').empty()
      $('#boxSurface').empty()
      $('#boxArea').empty()
      for (var rr = 0; rr < this.ROOM.length; rr++) {
        if (this.ROOM[rr].action == 'add') globalArea = globalArea + this.ROOM[rr].area

        var pathSurface = this.ROOM[rr].coords
        var pathCreate = 'M' + pathSurface[0].x + ',' + pathSurface[0].y
        for (var p = 1; p < pathSurface.length; p++) {
          pathCreate =
            pathCreate + ' ' + 'L' + pathSurface[p].x + ',' + pathSurface[p].y
        }
        if (this.ROOM[rr].inside.length > 0) {
          for (var ins = 0; ins < this.ROOM[rr].inside.length; ins++) {
            pathCreate =
              pathCreate +
              ' M' +
              Rooms.polygons[this.ROOM[rr].inside[ins]].coords[
                Rooms.polygons[this.ROOM[rr].inside[ins]].coords.length - 1
              ].x +
              ',' +
              Rooms.polygons[this.ROOM[rr].inside[ins]].coords[
                Rooms.polygons[this.ROOM[rr].inside[ins]].coords.length - 1
              ].y
            for (
              var free = Rooms.polygons[this.ROOM[rr].inside[ins]].coords.length - 2;
              free > -1;
              free--
            ) {
              pathCreate =
                pathCreate +
                ' L' +
                Rooms.polygons[this.ROOM[rr].inside[ins]].coords[free].x +
                ',' +
                Rooms.polygons[this.ROOM[rr].inside[ins]].coords[free].y
            }
          }
        }
        this.qSVG.create('boxRoom', 'path', {
          d: pathCreate,
          fill: 'url(#' + this.ROOM[rr].color + ')',
          'fill-opacity': 1,
          stroke: 'none',
          'fill-rule': 'evenodd',
          class: 'room',
        })

        this.qSVG.create('boxSurface', 'path', {
          d: pathCreate,
          fill: '#fff',
          'fill-opacity': 1,
          stroke: 'none',
          'fill-rule': 'evenodd',
          class: 'room',
        })

        var centroid = this.qSVG.polygonVisualCenter(this.ROOM[rr])

        if (this.ROOM[rr].name != '') {
          var styled = { color: '#343938' }
          if (
            this.ROOM[rr].color == 'gradientBlack' ||
            this.ROOM[rr].color == 'gradientBlue'
          )
            styled.color = 'white'
          this.qSVG.textOnDiv(this.ROOM[rr].name, centroid, styled, 'boxArea')
        }

        if (this.ROOM[rr].name != '') centroid.y = centroid.y + 20
        var area = (this.ROOM[rr].area / (this.meter * this.meter)).toFixed(2) + ' m²'
        var styled = {
          color: '#343938',
          fontSize: '12.5px',
          fontWeight: 'normal',
        }
        if (this.ROOM[rr].surface != '') {
          styled.fontWeight = 'bold'
          area = this.ROOM[rr].surface + ' m²'
        }
        if (this.ROOM[rr].color == 'gradientBlack' || this.ROOM[rr].color == 'gradientBlue')
          styled.color = 'white'
        if (this.ROOM[rr].showSurface)
          this.qSVG.textOnDiv(area, centroid, styled, 'boxArea')
      }
      if (globalArea <= 0) {
        globalArea = 0
        $('#areaValue').html('')
      } else {
        $('#areaValue').html(
          '<i class="fa fa-map-o" aria-hidden="true"></i> ' +
            (globalArea / 3600).toFixed(1) +
            ' m²',
        )
      }
    },
    rayCastingRoom: (point) => {
      var x = point.x,
        y = point.y
      var roomGroup = []
      for (var polygon = 0; polygon < this.ROOM.length; polygon++) {
        var inside = this.qSVG.rayCasting(point, this.ROOM[polygon].coords)

        if (inside) {
          roomGroup.push(polygon)
        }
      }
      if (roomGroup.length > 0) {
        var bestArea = this.ROOM[roomGroup[0]].area
        var roomTarget
        for (var siz = 0; siz < roomGroup.length; siz++) {
          if (this.ROOM[roomGroup[siz]].area <= bestArea) {
            bestArea = this.ROOM[roomGroup[siz]].area
            roomTarget = this.ROOM[roomGroup[siz]]
          }
        }
        return roomTarget
      } else {
        return false
      }
    },
    nearVertice: (snap, range = 10000) => {
      var bestDistance = Infinity
      var bestVertice
      for (var i = 0; i < this.WALLS.length; i++) {
        var distance1 = this.qSVG.gap(snap, {
          x: this.WALLS[i].start.x,
          y: this.WALLS[i].start.y,
        })
        var distance2 = this.qSVG.gap(snap, { x: this.WALLS[i].end.x, y: this.WALLS[i].end.y })
        if (distance1 < distance2 && distance1 < bestDistance) {
          bestDistance = distance1
          bestVertice = {
            number: this.WALLS[i],
            x: this.WALLS[i].start.x,
            y: this.WALLS[i].start.y,
            distance: Math.sqrt(bestDistance),
          }
        }
        if (distance2 < distance1 && distance2 < bestDistance) {
          bestDistance = distance2
          bestVertice = {
            number: this.WALLS[i],
            x: this.WALLS[i].end.x,
            y: this.WALLS[i].end.y,
            distance: Math.sqrt(bestDistance),
          }
        }
      }
      if (bestDistance < range * range) return bestVertice
      else return false
    },
    nearWall: (snap, range = Infinity) => {
      var wallDistance = Infinity
      var wallSelected = {}
      var result
      if (this.WALLS.length == 0) return false
      for (var e = 0; e < this.WALLS.length; e++) {
        var eq = this.qSVG.createEquation(
          this.WALLS[e].start.x,
          this.WALLS[e].start.y,
          this.WALLS[e].end.x,
          this.WALLS[e].end.y,
        )
        result = this.qSVG.nearPointOnEquation(eq, snap)
        if (
          result.distance < wallDistance &&
          this.qSVG.btwn(result.x, this.WALLS[e].start.x, this.WALLS[e].end.x) &&
          this.qSVG.btwn(result.y, this.WALLS[e].start.y, this.WALLS[e].end.y)
        ) {
          wallDistance = result.distance
          wallSelected = {
            wall: this.WALLS[e],
            x: result.x,
            y: result.y,
            distance: result.distance,
          }
        }
      }
      var vv = this.editor.nearVertice(snap)
      if (vv.distance < wallDistance) {
        wallDistance = vv.distance
        wallSelected = {
          wall: vv.number,
          x: vv.x,
          y: vv.y,
          distance: vv.distance,
        }
      }
      if (wallDistance <= range) return wallSelected
      else return false
    },
    showScaleBox: () => {
      if (this.ROOM.length > 0) {
        var minX, minY, maxX, maxY
        for (var i = 0; i < this.WALLS.length; i++) {
          var px = this.WALLS[i].start.x
          var py = this.WALLS[i].start.y
          if (!i || px < minX) minX = px
          if (!i || py < minY) minY = py
          if (!i || px > maxX) maxX = px
          if (!i || py > maxY) maxY = py
          var px = this.WALLS[i].end.x
          var py = this.WALLS[i].end.y
          if (!i || px < minX) minX = px
          if (!i || py < minY) minY = py
          if (!i || px > maxX) maxX = px
          if (!i || py > maxY) maxY = py
        }
        var width = maxX - minX
        var height = maxY - minY

        var labelWidth = ((maxX - minX) / this.meter).toFixed(2)
        var labelHeight = ((maxY - minY) / this.meter).toFixed(2)

        var sideRight = 'm' + (maxX + 40) + ',' + minY
        sideRight = sideRight + ' l60,0 m-40,10 l10,-10 l10,10 m-10,-10'
        sideRight = sideRight + ' l0,' + height
        sideRight = sideRight + ' m-30,0 l60,0 m-40,-10 l10,10 l10,-10'

        sideRight = sideRight + 'M' + minX + ',' + (minY - 40)
        sideRight = sideRight + ' l0,-60 m10,40 l-10,-10 l10,-10 m-10,10'
        sideRight = sideRight + ' l' + width + ',0'
        sideRight = sideRight + ' m0,30 l0,-60 m-10,40 l10,-10 l-10,-10'

        $('#boxScale').empty()

        this.qSVG.create('boxScale', 'path', {
          d: sideRight,
          stroke: '#555',
          fill: 'none',
          'stroke-width': 0.3,
          'stroke-linecap': 'butt',
          'stroke-linejoin': 'miter',
          'stroke-miterlimit': 4,
          'fill-rule': 'nonzero',
        })

        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        text.setAttributeNS(null, 'x', maxX + 70)
        text.setAttributeNS(null, 'y', (maxY + minY) / 2 + 35)
        text.setAttributeNS(null, 'fill', '#555')
        text.setAttributeNS(null, 'text-anchor', 'middle')
        text.textContent = labelHeight + ' m'
        text.setAttribute(
          'transform',
          'rotate(270 ' + (maxX + 70) + ',' + (maxY + minY) / 2 + ')',
        )
        $('#boxScale').append(text)

        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        text.setAttributeNS(null, 'x', (maxX + minX) / 2)
        text.setAttributeNS(null, 'y', minY - 95)
        text.setAttributeNS(null, 'fill', '#555')
        text.setAttributeNS(null, 'text-anchor', 'middle')
        text.textContent = labelWidth + ' m'
        $('#boxScale').append(text)
      }
    },
  }
}

function DomReady(fn, context) {
    function onReady(event) {
        window.removeEventListener('DOMContentLoaded', onReady)
        fn.call(context, event)
    }

    function onReadyIe(event) {
        if (window.readyState === 'complete') {
            window.detachEvent('onreadystatechange', onReadyIe)
            fn.call(context, event)
        }
    }

    ;(window.addEventListener && window.addEventListener('DOMContentLoaded', onReady, false)) ||
        (window.attachEvent && window.attachEvent('onreadystatechange', onReadyIe, false))
}

var inst = new Application()
DomReady(function () {
  inst.initialize()
})

window.Floorplan = inst
