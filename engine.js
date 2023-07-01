document.querySelector('#lin').addEventListener("mouseup", _MOUSEUP);
document.querySelector('#lin').addEventListener("mousemove", throttle(function (event) { _MOUSEMOVE(event); }, 30));
document.querySelector('#lin').addEventListener("mousedown", _MOUSEDOWN, true);

$(document).on('click', '#lin', function (event) {
  event.preventDefault();
});

document.querySelector('#panel').addEventListener('mousemove', function (event) {
  if ((mode == 'line_mode' || mode == 'partition_mode') && action == 1) {
    action = 0;
    if (typeof (binder) != 'undefined') {
      binder.remove();
      delete binder;
    }
    $('#linetemp').remove();
    $('#line_construc').remove();
    lengthTemp.remove();
    delete lengthTemp;
  }
});

window.addEventListener('resize', function (event) {
  width_viewbox = $('#lin').width();
  height_viewbox = $('#lin').height();
  document.querySelector('#lin').setAttribute('viewBox', originX_viewbox + ' ' + originY_viewbox + ' ' + width_viewbox + ' ' + height_viewbox)
});

// *****************************************************************************************************
// ******************************        KEYPRESS on KEYBOARD          *********************************
// *****************************************************************************************************
document.addEventListener("keydown", function (event) {
  if (mode != "text_mode") {
    if (event.keyCode == '37') {
      //LEFT
      zoom_maker('zoomleft', 100, 30);
    }
    if (event.keyCode == '38') {
      //UP
      zoom_maker('zoomtop', 100, 30);
    }
    if (event.keyCode == '39') {
      //RIGHT
      zoom_maker('zoomright', 100, 30);
    }
    if (event.keyCode == '40') {
      //DOWN
      zoom_maker('zoombottom', 100, 30);
    }
    if (event.keyCode == '107') {
      //+
      zoom_maker('zoomin', 20, 50);
    }
    if (event.keyCode == '109') {
      //-
      zoom_maker('zoomout', 20, 50);
    }
  }
  // else {
  //   if (action == 1) {
  //     binder.textContent = binder.textContent + event.key;
  //     console.log(field.value);
  //   }
  // }
});

// *****************************************************************************************************
// ******************************        MOUSE MOVE          *******************************************
// *****************************************************************************************************

function _MOUSEMOVE(event) {
  event.preventDefault();
  $('.sub').hide(100);

  //**************************************************************************
  //********************   TEXTE   MODE **************************************
  //**************************************************************************
  if (mode == 'text_mode') {
    snap = calcul_snap(event, grid_snap);
    if (action == 0) cursor('text');
    else {
      cursor('none');
    }
  }

  //**************************************************************************
  //**************        OBJECT   MODE **************************************
  //**************************************************************************
  if (mode == 'object_mode') {
    snap = calcul_snap(event, grid_snap);
    if (typeof (binder) == 'undefined') {
      $('#object_list').hide(200);
      if (modeOption == 'simpleStair') binder = new editor.obj2D("free", "stair", "simpleStair", snap, 0, 0, 0, "normal", 0, 15);
      else {
        var typeObj = modeOption;
        binder = new editor.obj2D("free", "energy", typeObj, snap, 0, 0, 0, "normal", 0);
      }

      $('#boxbind').append(binder.graph);
    }
    else {

      if ((binder.family != 'stick' && binder.family != 'collision') || WALLS.length == 0) {
        binder.x = snap.x;
        binder.y = snap.y;
        binder.oldX = binder.x;
        binder.oldY = binder.y;
        binder.update();
      }
      if (binder.family == 'collision') {
        var found = false;

        if (editor.rayCastingWalls({ x: binder.bbox.left, y: binder.bbox.top })) found = true;
        if (!found && editor.rayCastingWalls({ x: binder.bbox.left, y: binder.bbox.bottom })) found = true;
        if (!found && editor.rayCastingWalls({ x: binder.bbox.right, y: binder.bbox.top })) found = true;
        if (!found && editor.rayCastingWalls({ x: binder.bbox.right, y: binder.bbox.bottom })) found = true;

        if (!found) {
          binder.x = snap.x;
          binder.y = snap.y;
          binder.oldX = binder.x;
          binder.oldY = binder.y;
          binder.update();
        }
        else {
          binder.x = binder.oldX;
          binder.y = binder.oldY;
          binder.update();
        }
      }
      if (binder.family == 'stick') {
        pos = editor.stickOnWall(snap);
        binder.oldX = pos.x;
        binder.oldY = pos.y;
        var angleWall = qSVG.angleDeg(pos.wall.start.x, pos.wall.start.y, pos.wall.end.x, pos.wall.end.y);
        var v1 = qSVG.vectorXY({ x: pos.wall.start.x, y: pos.wall.start.y }, { x: pos.wall.end.x, y: pos.wall.end.y });
        var v2 = qSVG.vectorXY({ x: pos.wall.end.x, y: pos.wall.end.y }, snap);
        binder.x = pos.x - Math.sin(pos.wall.angle * (360 / 2 * Math.PI)) * binder.thick / 2;
        binder.y = pos.y - Math.cos(pos.wall.angle * (360 / 2 * Math.PI)) * binder.thick / 2;
        var newAngle = qSVG.vectorDeter(v1, v2);
        if (Math.sign(newAngle) == 1) {
          angleWall += 180;
          binder.x = pos.x + Math.sin(pos.wall.angle * (360 / 2 * Math.PI)) * binder.thick / 2;
          binder.y = pos.y + Math.cos(pos.wall.angle * (360 / 2 * Math.PI)) * binder.thick / 2;
        }
        binder.angle = angleWall;
        binder.update();
      }
    }
  }

  //**************************************************************************
  //**************        DISTANCE MODE **************************************
  //**************************************************************************
  if (mode == 'distance_mode') {
    snap = calcul_snap(event, grid_snap);
    if (typeof (binder) == 'undefined') {
      cross = qSVG.create("boxbind", "path", {
        d: "M-3000,0 L3000,0 M0,-3000 L0,3000",
        "stroke-width": 0.5,
        "stroke-opacity": "0.8",
        stroke: "#e2b653",
        fill: "#e2b653"
      });
      binder = new editor.obj2D("free", "measure", "", { x: 0, y: 0 }, 0, 0, 0, "normal", 0, "");
      labelMeasure = qSVG.create("none", "text", {
        x: 0,
        y: - 10,
        'font-size': '1.2em',
        stroke: "#ffffff",
        "stroke-width": "0.4px",
        'font-family': 'roboto',
        'text-anchor': 'middle',
        fill: "#3672d9"
      });
      binder.graph.append(labelMeasure);
      $('#boxbind').append(binder.graph);
    }
    else {
      x = snap.x;
      y = snap.y;
      cross.attr({
        "transform": "translate(" + (snap.x) + "," + (snap.y) + ")"
      });
      if (action == 1) {
        var startText = qSVG.middle(pox, poy, x, y);
        var angleText = qSVG.angle(pox, poy, x, y);
        var valueText = qSVG.measure({
          x: pox,
          y: poy
        }, {
          x: x,
          y: y
        });
        binder.size = valueText;
        binder.x = startText.x;
        binder.y = startText.y;
        binder.angle = angleText.deg;
        valueText = (valueText / meter).toFixed(2) + ' m';
        //labelMeasure.context.textContent = valueText;
        labelMeasure[0].textContent = valueText;

        binder.update();
      }
    }
  }

  //**************************************************************************
  //**************        ROOM MODE *****************************************
  //**************************************************************************

  if (mode == 'room_mode') {
    snap = calcul_snap(event, grid_snap);
    var roomTarget;
    if (roomTarget = editor.rayCastingRoom(snap)) {
      if (typeof (binder) != 'undefined') {
        binder.remove();
        delete binder;
      }

      var pathSurface = roomTarget.coords;
      var pathCreate = "M" + pathSurface[0].x + "," + pathSurface[0].y;
      for (var p = 1; p < pathSurface.length - 1; p++) {
        pathCreate = pathCreate + " " + "L" + pathSurface[p].x + "," + pathSurface[p].y;
      }
      pathCreate = pathCreate + "Z";

      if (roomTarget.inside.length > 0) {
        for (var ins = 0; ins < roomTarget.inside.length; ins++) {
          pathCreate = pathCreate + " M" + Rooms.polygons[roomTarget.inside[ins]].coords[Rooms.polygons[roomTarget.inside[ins]].coords.length - 1].x + "," + Rooms.polygons[roomTarget.inside[ins]].coords[Rooms.polygons[roomTarget.inside[ins]].coords.length - 1].y;
          for (var free = Rooms.polygons[roomTarget.inside[ins]].coords.length - 2; free > -1; free--) {
            pathCreate = pathCreate + " L" + Rooms.polygons[roomTarget.inside[ins]].coords[free].x + "," + Rooms.polygons[roomTarget.inside[ins]].coords[free].y;
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
        'stroke-width': 3
      });
      binder.type = 'room';
      binder.area = roomTarget.area;
      binder.id = ROOM.indexOf(roomTarget);
    }
    else {
      if (typeof (binder) != 'undefined') {
        binder.remove();
        delete binder;
      }
    }
  }

  //**************************************************************************
  //**************        DOOR/WINDOW MODE   *********************************
  //**************************************************************************

  if (mode == 'door_mode') {

    snap = calcul_snap(event, grid_snap);
    if (wallSelect = editor.nearWall(snap)) {
      var wall = wallSelect.wall;
      if (wall.type != 'separate') {
        if (typeof (binder) == 'undefined') {
          // family, classe, type, pos, angle, angleSign, size, hinge, thick
          binder = new editor.obj2D("inWall", "doorWindow", modeOption, wallSelect, 0, 0, 60, "normal", wall.thick);
          var angleWall = qSVG.angleDeg(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
          var v1 = qSVG.vectorXY({ x: wall.start.x, y: wall.start.y }, { x: wall.end.x, y: wall.end.y });
          var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap);
          var newAngle = qSVG.vectorDeter(v1, v2);
          if (Math.sign(newAngle) == 1) {
            angleWall += 180;
            binder.angleSign = 1;
          }
          var startCoords = qSVG.middle(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
          binder.x = startCoords.x;
          binder.y = startCoords.y;
          binder.angle = angleWall;
          binder.update();
          $('#boxbind').append(binder.graph);
        }
        else {
          var angleWall = qSVG.angleDeg(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
          var v1 = qSVG.vectorXY({ x: wall.start.x, y: wall.start.y }, { x: wall.end.x, y: wall.end.y });
          var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap);
          var newAngle = qSVG.vectorDeter(v1, v2);
          binder.angleSign = 0;
          if (Math.sign(newAngle) == 1) {
            binder.angleSign = 1;
            angleWall += 180;
          }

          var limits = limitObj(wall.equations.base, binder.size, wallSelect);
          if (qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) && qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)) {
            binder.x = wallSelect.x;
            binder.y = wallSelect.y;
            binder.angle = angleWall;
            binder.thick = wall.thick;
            binder.limit = limits;
            binder.update();
          }

          if ((wallSelect.x == wall.start.x && wallSelect.y == wall.start.y) || (wallSelect.x == wall.end.x && wallSelect.y == wall.end.y)) {
            if (qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)) {
              binder.x = limits[0].x;
              binder.y = limits[0].y;
            }
            if (qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)) {
              binder.x = limits[1].x;
              binder.y = limits[1].y;
            }
            binder.limit = limits;
            binder.angle = angleWall;
            binder.thick = wall.thick;
            binder.update();
          }
        }
      }
    }
    else {
      if (typeof (binder) != 'undefined') {
        binder.graph.remove();
        delete binder;
      }
    }
  } // END DOOR MODE

  //**************************************************************************
  //**************        NODE MODE *****************************************
  //**************************************************************************

  if (mode == 'node_mode') {

    snap = calcul_snap(event, grid_snap);

    if (typeof (binder) == 'undefined') {
      if (addNode = editor.nearWall(snap, 30)) {
        var x2 = addNode.wall.end.x;
        var y2 = addNode.wall.end.y;
        var x1 = addNode.wall.start.x;
        var y1 = addNode.wall.start.y;
        angleWall = qSVG.angle(x1, y1, x2, y2);
        binder = qSVG.create('boxbind', 'path', {
          id: "circlebinder",
          d: "M-20,-10 L-13,0 L-20,10 Z M-13,0 L13,0 M13,0 L20,-10 L20,10 Z",
          stroke: "#5cba79",
          fill: "#5cba79",
          "stroke-width": "1.5px"
        });
        binder.attr({
          "transform": "translate(" + (addNode.x) + "," + (addNode.y) + ") rotate(" + (angleWall.deg + 90) + ",0,0)"
        });
        binder.data = addNode;
        binder.x1 = x1;
        binder.x2 = x2;
        binder.y1 = y1;
        binder.y2 = y2;
      }
    } else {
      if (addNode = editor.nearWall(snap, 30)) {
        if (addNode) {
          var x2 = addNode.wall.end.x;
          var y2 = addNode.wall.end.y;
          var x1 = addNode.wall.start.x;
          var y1 = addNode.wall.start.y;
          angleWall = qSVG.angle(x1, y1, x2, y2);
          binder.attr({
            "transform": "translate(" + (addNode.x) + "," + (addNode.y) + ") rotate(" + (angleWall.deg + 90) + ",0,0)"
          });
          binder.data = addNode;
        }
        else {
          binder.remove();
          delete binder;
        }
      } else {
        binder.remove();
        delete binder;
      }
    }
  } // END NODE MODE

  //**********************************  SELECT MODE ***************************************************************
  if (mode == 'select_mode' && drag == 'off') { // FIRST TEST ON SELECT MODE (and drag OFF) to detect MOUSEOVER DOOR

    snap = calcul_snap(event, 'off');

    var objTarget = false;
    for (var i = 0; i < OBJDATA.length; i++) {
      var objX1 = OBJDATA[i].bbox.left;
      var objX2 = OBJDATA[i].bbox.right;
      var objY1 = OBJDATA[i].bbox.top;
      var objY2 = OBJDATA[i].bbox.bottom;
      var realBboxCoords = OBJDATA[i].realBbox;
      if (qSVG.rayCasting(snap, realBboxCoords)) {
        objTarget = OBJDATA[i];
      }
    }
    if (objTarget !== false) {
      if (typeof (binder) != 'undefined' && (binder.type == 'segment')) {
        binder.graph.remove();
        delete binder;
        cursor('default');
      }
      if (objTarget.params.bindBox) { // OBJ -> BOUNDINGBOX TOOL
        if (typeof (binder) == 'undefined') {
          binder = new editor.obj2D("free", "boundingBox", "", objTarget.bbox.origin, objTarget.angle, 0, objTarget.size, "normal", objTarget.thick, objTarget.realBbox);
          binder.update();
          binder.obj = objTarget;
          binder.type = 'boundingBox';
          binder.oldX = binder.x;
          binder.oldY = binder.y;
          $('#boxbind').append(binder.graph);
          if (!objTarget.params.move) cursor('trash'); // LIKE MEASURE ON PLAN
          if (objTarget.params.move) cursor('move');
        }
      }
      else {  // DOOR, WINDOW, APERTURE.. -- OBJ WITHOUT BINDBOX (params.bindBox = False) -- !!!!
        if (typeof (binder) == 'undefined') {
          var wallList = editor.rayCastingWall(objTarget);
          if (wallList.length > 1) wallList = wallList[0];
          inWallRib(wallList);
          var thickObj = wallList.thick;
          var sizeObj = objTarget.size;

          binder = new editor.obj2D("inWall", "socle", "", objTarget, objTarget.angle, 0, sizeObj, "normal", thickObj);
          binder.update();

          binder.oldXY = { x: objTarget.x, y: objTarget.y }; // FOR OBJECT MENU
          $('#boxbind').append(binder.graph);
        }
        else {
          if (event.target == binder.graph.get(0).firstChild) {
            cursor('move');
            binder.graph.get(0).firstChild.setAttribute("class", "circle_css_2");
            binder.type = "obj";
            binder.obj = objTarget;
          }
          else {
            cursor('default');
            binder.graph.get(0).firstChild.setAttribute("class", "circle_css_1");
            binder.type = false;
          }
        }
      }
    }
    else {
      if (typeof (binder) != 'undefined') {
        if (typeof (binder.graph) != 'undefined') binder.graph.remove();
        if (binder.type == 'node') binder.remove();
        delete binder;
        cursor('default');
        rib();

      }
    }

    // BIND CIRCLE IF nearNode and GROUP ALL SAME XY SEG POINTS
    if (wallNode = editor.nearWallNode(snap, 20)) {
      if (typeof (binder) == 'undefined' || binder.type == 'segment') {
        binder = qSVG.create('boxbind', 'circle', {
          id: "circlebinder",
          class: "circle_css_2",
          cx: wallNode.x,
          cy: wallNode.y,
          r: Rcirclebinder
        });
        binder.data = wallNode;
        binder.type = "node";
        if ($('#linebinder').length) $('#linebinder').remove();
      } else {
        // REMAKE CIRCLE_CSS ON BINDER AND TAKE DATA SEG GROUP
        // if (typeof(binder) != 'undefined') {
        //     binder.attr({
        //         class: "circle_css_2"
        //     });
        // }
      }
      cursor('move');
    } else {
      if (typeof (binder) != "undefined" && binder.type == 'node') {
        binder.remove();
        delete binder;
        hideAllSize();
        cursor('default');
        rib();
      }
    }


    // BIND WALL WITH NEARPOINT function ---> WALL BINDER CREATION
    if (wallBind = editor.rayCastingWalls(snap, WALLS)) {
      if (wallBind.length > 1) wallBind = wallBind[wallBind.length - 1];
      if (wallBind && typeof (binder) == 'undefined') {
        var objWall = editor.objFromWall(wallBind);
        if (objWall.length > 0) editor.inWallRib2(wallBind);
        binder = {};
        binder.wall = wallBind;
        inWallRib(binder.wall);
        var line = qSVG.create('none', 'line', {
          x1: binder.wall.start.x, y1: binder.wall.start.y, x2: binder.wall.end.x, y2: binder.wall.end.y,
          "stroke-width": 5,
          stroke: "#5cba79"
        });
        var ball1 = qSVG.create('none', 'circle', {
          class: "circle_css",
          cx: binder.wall.start.x, cy: binder.wall.start.y,
          r: Rcirclebinder / 1.8
        });
        var ball2 = qSVG.create('none', 'circle', {
          class: "circle_css",
          cx: binder.wall.end.x, cy: binder.wall.end.y,
          r: Rcirclebinder / 1.8
        });
        binder.graph = qSVG.create('none', 'g');
        binder.graph.append(line);
        binder.graph.append(ball1);
        binder.graph.append(ball2);
        $('#boxbind').append(binder.graph);
        binder.type = "segment";
        cursor('pointer');
      }
    } else {
      if (wallBind = editor.nearWall(snap, 6)) {
        if (wallBind && typeof (binder) == 'undefined') {
          wallBind = wallBind.wall;
          var objWall = editor.objFromWall(wallBind);
          if (objWall.length > 0) editor.inWallRib2(wallBind);
          binder = {};
          binder.wall = wallBind;
          inWallRib(binder.wall);
          var line = qSVG.create('none', 'line', {
            x1: binder.wall.start.x, y1: binder.wall.start.y, x2: binder.wall.end.x, y2: binder.wall.end.y,
            "stroke-width": 5,
            stroke: "#5cba79"
          });
          var ball1 = qSVG.create('none', 'circle', {
            class: "circle_css",
            cx: binder.wall.start.x, cy: binder.wall.start.y,
            r: Rcirclebinder / 1.8
          });
          var ball2 = qSVG.create('none', 'circle', {
            class: "circle_css",
            cx: binder.wall.end.x, cy: binder.wall.end.y,
            r: Rcirclebinder / 1.8
          });
          binder.graph = qSVG.create('none', 'g');
          binder.graph.append(line);
          binder.graph.append(ball1);
          binder.graph.append(ball2);
          $('#boxbind').append(binder.graph);
          binder.type = "segment";
          cursor('pointer');
        }
      }
      else {
        if (typeof (binder) != "undefined" && binder.type == 'segment') {
          binder.graph.remove();
          delete binder;
          hideAllSize();
          cursor('default');
          rib();
        }
      }
    }
  } // END mode == 'select_mode' && drag == 'off'

  // ------------------------------  LINE MODE ------------------------------------------------------

  if ((mode == 'line_mode' || mode == 'partition_mode') && action == 0) {
    snap = calcul_snap(event, 'off');
    cursor('grab');
    pox = snap.x;
    poy = snap.y;
    if (helpConstruc = intersection(snap, 25)) {
      if (helpConstruc.distance < 10) {
        pox = helpConstruc.x;
        poy = helpConstruc.y;
        cursor('grab');
      } else {
        cursor('crosshair');
      }
    }
    if (wallNode = editor.nearWallNode(snap, 20)) {
      pox = wallNode.x;
      poy = wallNode.y;
      cursor('grab');
      if (typeof (binder) == 'undefined') {
        binder = qSVG.create('boxbind', 'circle', {
          id: "circlebinder",
          class: "circle_css_2",
          cx: wallNode.x,
          cy: wallNode.y,
          r: Rcirclebinder / 1.5
        });
      }
      intersectionOff();
    } else {
      if (!helpConstruc) cursor('crosshair');
      if (typeof (binder) != "undefined") {
        if (binder.graph) binder.graph.remove();
        else binder.remove();
        delete binder;
      }
    }
  }

  // ******************************************************************************************************
  // ************************** ACTION = 1   LINE MODE => WALL CREATE                 *********************
  // ******************************************************************************************************

  if (action == 1 && (mode == 'line_mode' || mode == 'partition_mode')) {

    snap = calcul_snap(event, grid_snap);
    x = snap.x;
    y = snap.y;
    starter = minMoveGrid(snap);

    if (!$('#line_construc').length) {
      if (wallNode = editor.nearWallNode(snap, 20)) {
        pox = wallNode.x;
        poy = wallNode.y;

        wallStartConstruc = false;
        if (wallNode.bestWall == WALLS.length - 1) {
          cursor('validation');
        }
        else {
          cursor('grab');
        }
      } else {
        cursor('crosshair');
      }
    }

    if (starter > grid) {
      if (!$('#line_construc').length) {
        var ws = 20;
        if (mode == 'partition_mode') ws = 10;
        lineconstruc = qSVG.create("boxbind", "line", {
          id: "line_construc",
          x1: pox,
          y1: poy,
          x2: x,
          y2: y,
          "stroke-width": ws,
          "stroke-linecap": "butt",
          "stroke-opacity": 0.7,
          stroke: "#9fb2e2"
        });

        svgadd = qSVG.create("boxbind", "line", { // ORANGE TEMP LINE FOR ANGLE 0 90 45 -+
          id: "linetemp",
          x1: pox,
          y1: poy,
          x2: x,
          y2: y,
          "stroke": "transparent",
          "stroke-width": 0.5,
          "stroke-opacity": "0.9"
        });
      } else { // THE LINES AND BINDER ARE CREATED

        $('#linetemp').attr({
          x2: x,
          y2: y
        });

        if (helpConstrucEnd = intersection(snap, 10)) {
          x = helpConstrucEnd.x;
          y = helpConstrucEnd.y;
        }
        if (wallEndConstruc = editor.nearWall(snap, 12)) { // TO SNAP SEGMENT TO FINALIZE X2Y2
          x = wallEndConstruc.x;
          y = wallEndConstruc.y;
          cursor('grab');
        } else {
          cursor('crosshair');
        }

        // nearNode helped to attach the end of the construc line
        if (wallNode = editor.nearWallNode(snap, 20)) {
          if (typeof (binder) == 'undefined') {
            binder = qSVG.create('boxbind', 'circle', {
              id: "circlebinder",
              class: "circle_css_2",
              cx: wallNode.x,
              cy: wallNode.y,
              r: Rcirclebinder / 1.5
            });
          }
          $('#line_construc').attr({
            x2: wallNode.x,
            y2: wallNode.y
          });
          x = wallNode.x;
          y = wallNode.y;
          wallEndConstruc = true;
          intersectionOff();
          if (wallNode.bestWall == WALLS.length - 1 && document.getElementById("multi").checked) {
            cursor('validation');
          }
          else {
            cursor('grab');
          }
        } else {
          if (typeof (binder) != "undefined") {
            binder.remove();
            delete binder;
          }
          if (wallEndConstruc === false) cursor('crosshair');
        }
        // LINETEMP AND LITLLE SNAPPING FOR HELP TO CONSTRUC ANGLE 0 90 45 *****************************************
        var fltt = qSVG.angle(pox, poy, x, y);
        var flt = Math.abs(fltt.deg);
        var coeff = fltt.deg / flt; // -45 -> -1     45 -> 1
        var phi = poy - (coeff * pox);
        var Xdiag = (y - phi) / coeff;
        if (typeof (binder) == 'undefined') {
          // HELP FOR H LINE
          var found = false;
          if (flt < 15 && Math.abs(poy - y) < 25) {
            y = poy;
            found = true;
          } // HELP FOR V LINE
          if (flt > 75 && Math.abs(pox - x) < 25) {
            x = pox;
            found = true;
          } // HELP FOR DIAG LINE
          if (flt < 55 && flt > 35 && Math.abs(Xdiag - x) < 20) {
            x = Xdiag;
            found = true;
          }
          if (found) $('#line_construc').attr({ "stroke-opacity": 1 });
          else $('#line_construc').attr({ "stroke-opacity": 0.7 });
        }
        $('#line_construc').attr({
          x2: x,
          y2: y
        });

        // SHOW WALL SIZE -------------------------------------------------------------------------
        var startText = qSVG.middle(pox, poy, x, y);
        var angleText = qSVG.angle(pox, poy, x, y);
        var valueText = ((qSVG.measure({
          x: pox,
          y: poy
        }, {
          x: x,
          y: y
        })) / 60).toFixed(2);
        if (typeof (lengthTemp) == 'undefined') {
          lengthTemp = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          lengthTemp.setAttributeNS(null, 'x', startText.x);
          lengthTemp.setAttributeNS(null, 'y', (startText.y) - 15);
          lengthTemp.setAttributeNS(null, 'text-anchor', 'middle');
          lengthTemp.setAttributeNS(null, 'stroke', 'none');
          lengthTemp.setAttributeNS(null, 'stroke-width', '0.6px');
          lengthTemp.setAttributeNS(null, 'fill', '#777777');
          lengthTemp.textContent = valueText + 'm';
          $('#boxbind').append(lengthTemp);
        }
        if (typeof (lengthTemp) != 'undefined' && valueText > 0.1) {
          lengthTemp.setAttributeNS(null, 'x', startText.x);
          lengthTemp.setAttributeNS(null, 'y', (startText.y) - 15);
          lengthTemp.setAttribute("transform", "rotate(" + angleText.deg + " " + startText.x + "," + startText.y + ")");
          lengthTemp.textContent = valueText + ' m';
        }
        if (typeof (lengthTemp) != 'undefined' && valueText < 0.1) {
          lengthTemp.textContent = "";
        }
      }
    }
  } // END LINE MODE DETECT && ACTION = 1

  //ONMOVE
  // **************************************************************************************************
  //        ____ ___ _   _ ____  _____ ____
  //        | __ )_ _| \ | |  _ \| ____|  _ \
  //        |  _ \| ||  \| | | | |  _| | |_) |
  //        | |_) | || |\  | |_| | |___|  _ <
  //        |____/___|_| \_|____/|_____|_| \_\
  //
  // **************************************************************************************************

  if (mode == 'bind_mode') {

    snap = calcul_snap(event, grid_snap);

    if (binder.type == 'node') {
      var coords = snap;
      var magnetic = false;
      for (var k in wallListRun) {
        if (isObjectsEquals(wallListRun[k].end, binder.data)) {
          if (Math.abs(wallListRun[k].start.x - snap.x) < 20) { coords.x = wallListRun[k].start.x; magnetic = "H"; }
          if (Math.abs(wallListRun[k].start.y - snap.y) < 20) { coords.y = wallListRun[k].start.y; magnetic = "V"; }
        }
        if (isObjectsEquals(wallListRun[k].start, binder.data)) {
          if (Math.abs(wallListRun[k].end.x - snap.x) < 20) { coords.x = wallListRun[k].end.x; magnetic = "H"; }
          if (Math.abs(wallListRun[k].end.y - snap.y) < 20) { coords.y = wallListRun[k].end.y; magnetic = "V"; }
        }
      }

      if (nodeMove = editor.nearWallNode(snap, 15, wallListRun)) {
        coords.x = nodeMove.x;
        coords.y = nodeMove.y;
        $('#circlebinder').attr({ "class": "circleGum", cx: coords.x, cy: coords.y });
        cursor('grab');
      } else {
        if (magnetic != false) {
          if (magnetic == "H") snap.x = coords.x;
          else snap.y = coords.y;
        }
        if (helpConstruc = intersection(snap, 10, wallListRun)) {
          coords.x = helpConstruc.x;
          coords.y = helpConstruc.y;
          snap.x = helpConstruc.x;
          snap.y = helpConstruc.y;
          if (magnetic != false) {
            if (magnetic == "H") snap.x = coords.x;
            else snap.y = coords.y;
          }
          cursor('grab');
        } else {
          cursor('move');
        }
        binder.remove()
        //$('#circlebinder').attr({"class": "circle_css", cx: coords.x, cy: coords.y});
      }
      for (var k in wallListRun) {
        if (isObjectsEquals(wallListRun[k].start, binder.data)) {
          wallListRun[k].start.x = coords.x;
          wallListRun[k].start.y = coords.y;
        }
        if (isObjectsEquals(wallListRun[k].end, binder.data)) {
          wallListRun[k].end.x = coords.x;
          wallListRun[k].end.y = coords.y;
        }
      }
      binder.data = coords;
      editor.wallsComputing(WALLS, false); // UPDATE FALSE

      for (var k in wallListObj) {
        var wall = wallListObj[k].wall;
        var objTarget = wallListObj[k].obj;
        var angleWall = qSVG.angleDeg(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
        var limits = limitObj(wall.equations.base, 2 * wallListObj[k].distance, wallListObj[k].from); // COORDS OBJ AFTER ROTATION
        var indexLimits = 0;
        if (qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)) indexLimits = 1;
        // NEW COORDS OBJDATA[obj]
        objTarget.x = limits[indexLimits].x;
        objTarget.y = limits[indexLimits].y;
        objTarget.angle = angleWall;
        if (objTarget.angleSign == 1) objTarget.angle = angleWall + 180;

        var limitBtwn = limitObj(wall.equations.base, objTarget.size, objTarget); // OBJ SIZE OK BTWN xy1/xy2

        if (qSVG.btwn(limitBtwn[0].x, wall.start.x, wall.end.x) && qSVG.btwn(limitBtwn[0].y, wall.start.y, wall.end.y) && qSVG.btwn(limitBtwn[1].x, wall.start.x, wall.end.x) && qSVG.btwn(limitBtwn[1].y, wall.start.y, wall.end.y)) {
          objTarget.limit = limitBtwn;
          objTarget.update();
        }
        else {
          objTarget.graph.remove();
          delete objTarget;
          OBJDATA.splice(wall.indexObj, 1);
          wallListObj.splice(k, 1);
        }
      }
      // for (k in toClean)
      $('#boxRoom').empty();
      $('#boxSurface').empty();
      Rooms = qSVG.polygonize(WALLS);
      editor.roomMaker(Rooms);
    }

    // WALL MOVING ----BINDER TYPE SEGMENT-------- FUNCTION FOR H,V and Calculate Vectorial Translation

    if (binder.type == 'segment' && action == 1) {
      rib();

      if (equation2.A == 'v') { equation2.B = snap.x; }
      else if (equation2.A == 'h') { equation2.B = snap.y; }
      else { equation2.B = snap.y - (snap.x * equation2.A); }

      var intersection1 = qSVG.intersectionOfEquations(equation1, equation2, "obj");
      var intersection2 = qSVG.intersectionOfEquations(equation2, equation3, "obj");
      var intersection3 = qSVG.intersectionOfEquations(equation1, equation3, "obj");

      if (binder.wall.parent != null) {
        if (isObjectsEquals(binder.wall.parent.end, binder.wall.start)) binder.wall.parent.end = intersection1;
        else if (isObjectsEquals(binder.wall.parent.start, binder.wall.start)) binder.wall.parent.start = intersection1;
        else binder.wall.parent.end = intersection1;
      }

      if (binder.wall.child != null) {
        if (isObjectsEquals(binder.wall.child.start, binder.wall.end)) binder.wall.child.start = intersection2;
        else if (isObjectsEquals(binder.wall.child.end, binder.wall.end)) binder.wall.child.end = intersection2;
        else binder.wall.child.start = intersection2;
      }

      binder.wall.start = intersection1;
      binder.wall.end = intersection2;
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
        if (!qSVG.rayCasting(intersection1, equation1.backUp.coords)) { // IF OUT OF WALL FOLLOWED
          var distanceFromStart = qSVG.gap(equation1.backUp.start, intersection1);
          var distanceFromEnd = qSVG.gap(equation1.backUp.end, intersection1);
          if (distanceFromStart > distanceFromEnd) { // NEAR FROM End
            equation1.follow.end = intersection1;
          }
          else {
            equation1.follow.start = intersection1;
          }
        }
        else {
          equation1.follow.end = equation1.backUp.end;
          equation1.follow.start = equation1.backUp.start;
        }
      }
      if (equation3.follow != undefined) {
        if (!qSVG.rayCasting(intersection2, equation3.backUp.coords)) { // IF OUT OF WALL FOLLOWED
          var distanceFromStart = qSVG.gap(equation3.backUp.start, intersection2);
          var distanceFromEnd = qSVG.gap(equation3.backUp.end, intersection2);
          if (distanceFromStart > distanceFromEnd) { // NEAR FROM End
            equation3.follow.end = intersection2;
          }
          else {
            equation3.follow.start = intersection2;
          }
        }
        else {
          equation3.follow.end = equation3.backUp.end;
          equation3.follow.start = equation3.backUp.start;
        }
      }

      // EQ FOLLOWERS WALL MOVING
      for (var i = 0; i < equationFollowers.length; i++) {
        var intersectionFollowers = qSVG.intersectionOfEquations(equationFollowers[i].eq, equation2, "obj");
        if (qSVG.btwn(intersectionFollowers.x, binder.wall.start.x, binder.wall.end.x, 'round') && qSVG.btwn(intersectionFollowers.y, binder.wall.start.y, binder.wall.end.y, 'round')) {
          var size = qSVG.measure(equationFollowers[i].wall.start, equationFollowers[i].wall.end);
          if (equationFollowers[i].type == "start") {
            equationFollowers[i].wall.start = intersectionFollowers;
            if (size < 5) {
              if (equationFollowers[i].wall.child == null) {
                WALLS.splice(WALLS.indexOf(equationFollowers[i].wall), 1);
                equationFollowers.splice(i, 1);
              }
            }
          }
          if (equationFollowers[i].type == "end") {
            equationFollowers[i].wall.end = intersectionFollowers;
            if (size < 5) {
              if (equationFollowers[i].wall.parent == null) {
                WALLS.splice(WALLS.indexOf(equationFollowers[i].wall), 1);
                equationFollowers.splice(i, 1);
              }
            }
          }
        }
      }
      // WALL COMPUTING, BLOCK FAMILY OF BINDERWALL IF NULL (START OR END) !!!!!
      editor.wallsComputing(WALLS, "move");
      Rooms = qSVG.polygonize(WALLS);

      // OBJDATA(s) FOLLOW 90° EDGE SELECTED
      for (var rp = 0; rp < equationsObj.length; rp++) {
        var objTarget = equationsObj[rp].obj;
        var intersectionObj = qSVG.intersectionOfEquations(equationsObj[rp].eq, equation2);
        // NEW COORDS OBJDATA[o]
        objTarget.x = intersectionObj[0];
        objTarget.y = intersectionObj[1];
        var limits = limitObj(equation2, objTarget.size, objTarget);
        if (qSVG.btwn(limits[0].x, binder.wall.start.x, binder.wall.end.x) && qSVG.btwn(limits[0].y, binder.wall.start.y, binder.wall.end.y) && qSVG.btwn(limits[1].x, binder.wall.start.x, binder.wall.end.x) && qSVG.btwn(limits[1].y, binder.wall.start.y, binder.wall.end.y)) {
          objTarget.limit = limits;
          objTarget.update();
        }
      }
      // DELETING ALL OBJECT "INWALL" OVERSIZED INTO ITS EDGE (EDGE BY EDGE CONTROL)
      for (var k in WALLS) {
        var objWall = editor.objFromWall(WALLS[k]); // LIST OBJ ON EDGE
        for (var ob in objWall) {
          var objTarget = objWall[ob];
          var eq = editor.createEquationFromWall(WALLS[k]);
          var limits = limitObj(eq, objTarget.size, objTarget);
          if (!qSVG.btwn(limits[0].x, WALLS[k].start.x, WALLS[k].end.x) || !qSVG.btwn(limits[0].y, WALLS[k].start.y, WALLS[k].end.y) || !qSVG.btwn(limits[1].x, WALLS[k].start.x, WALLS[k].end.x) || !qSVG.btwn(limits[1].y, WALLS[k].start.y, WALLS[k].end.y)) {
            objTarget.graph.remove();
            delete objTarget;
            var indexObj = OBJDATA.indexOf(objTarget);
            OBJDATA.splice(indexObj, 1);
          }
        }
      }

      equationsObj = []; // REINIT eqObj -> MAYBE ONE OR PLUS OF OBJDATA REMOVED !!!!
      var objWall = editor.objFromWall(binder.wall); // LIST OBJ ON EDGE
      for (var ob = 0; ob < objWall.length; ob++) {
        var objTarget = objWall[ob];
        equationsObj.push({ obj: objTarget, wall: binder.wall, eq: qSVG.perpendicularEquation(equation2, objTarget.x, objTarget.y) });
      }

      $('#boxRoom').empty();
      $('#boxSurface').empty();
      editor.roomMaker(Rooms);
      $('#lin').css('cursor', 'pointer');
    }

    // **********************************************************************
    // ----------------------  BOUNDING BOX ------------------------------
    // **********************************************************************
    // binder.obj.params.move ---> FOR MEASURE DONT MOVE
    if (binder.type == 'boundingBox' && action == 1 && binder.obj.params.move) {
      binder.x = snap.x;
      binder.y = snap.y;
      binder.obj.x = snap.x;
      binder.obj.y = snap.y;
      binder.obj.update();
      binder.update();
    }

    // **********************************************************************
    // OBJ MOVING
    // **********************************************************************
    if (binder.type == 'obj' && action == 1) {
      if (wallSelect = editor.nearWall(snap)) {
        if (wallSelect.wall.type != 'separate') {
          inWallRib(wallSelect.wall);

          var objTarget = binder.obj;
          var wall = wallSelect.wall;
          var angleWall = qSVG.angleDeg(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
          var v1 = qSVG.vectorXY({ x: wall.start.x, y: wall.start.y }, { x: wall.end.x, y: wall.end.y });
          var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap);
          var newAngle = qSVG.vectorDeter(v1, v2);
          binder.angleSign = 0;
          objTarget.angleSign = 0;
          if (Math.sign(newAngle) == 1) {
            angleWall += 180;
            binder.angleSign = 1;
            objTarget.angleSign = 1;
          }
          var limits = limitObj(wall.equations.base, binder.size, wallSelect);
          if (qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) && qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)) {
            binder.x = wallSelect.x;
            binder.y = wallSelect.y;
            binder.angle = angleWall;
            binder.thick = wall.thick;
            objTarget.x = wallSelect.x;
            objTarget.y = wallSelect.y;
            objTarget.angle = angleWall;
            objTarget.thick = wall.thick;
            objTarget.limit = limits;
            binder.update();
            objTarget.update();
          }

          if ((wallSelect.x == wall.start.x && wallSelect.y == wall.start.y) || (wallSelect.x == wall.end.x && wallSelect.y == wall.end.y)) {
            if (qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)) {
              binder.x = limits[0].x;
              binder.y = limits[0].y;
              objTarget.x = limits[0].x;
              objTarget.y = limits[0].y;
              objTarget.limit = limits;
            }
            if (qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)) {
              binder.x = limits[1].x;
              binder.y = limits[1].y;
              objTarget.x = limits[1].x;
              objTarget.y = limits[1].y;
              objTarget.limit = limits;
            }
            binder.angle = angleWall;
            binder.thick = wall.thick;
            objTarget.angle = angleWall;
            objTarget.thick = wall.thick;
            binder.update();
            objTarget.update();
          }
        }
      }
    } // END OBJ MOVE
    if (binder.type != 'obj' && binder.type != 'segment') rib();
  }
  // ENDBIND ACTION MOVE **************************************************************************

  // ---DRAG VIEWBOX PANNING -------------------------------------------------------

  if (mode == 'select_mode' && drag == 'on') {
    snap = calcul_snap(event, grid_snap);
    $('#lin').css('cursor', 'move');
    distX = (snap.xMouse - pox) * factor;
    distY = (snap.yMouse - poy) * factor;
    // pox = event.pageX;
    // poy = event.pageY;
    zoom_maker('zoomdrag', distX, distY);
  }
} // END MOUSEMOVE

// *****************************************************************************************************
// *****************************************************************************************************
// *****************************************************************************************************
// ******************************        MOUSE DOWN            *****************************************
// *****************************************************************************************************
// *****************************************************************************************************
// *****************************************************************************************************

function _MOUSEDOWN(event) {

  event.preventDefault();
  // *******************************************************************
  // **************************   DISTANCE MODE   **********************
  // *******************************************************************
  if (mode == 'distance_mode') {
    if (action == 0) {
      action = 1;
      snap = calcul_snap(event, grid_snap);
      pox = snap.x;
      poy = snap.y;
    }
  }

  // *******************************************************************
  // *************************   LINE/WALL MODE   **********************
  // *******************************************************************
  if (mode == 'line_mode' || mode == 'partition_mode') {
    if (action == 0) {
      snap = calcul_snap(event, grid_snap);
      pox = snap.x;
      poy = snap.y;
      if (wallStartConstruc = editor.nearWall(snap, 12)) { // TO SNAP SEGMENT TO FINALIZE X2Y2
        pox = wallStartConstruc.x;
        poy = wallStartConstruc.y;
      }
    }
    else {
      // FINALIZE LINE_++
      construc = 1;
    }
    action = 1;
  }
  if (mode == 'edit_door_mode') { // ACTION 1 ACTIVATE EDITION OF THE DOOR
    action = 1;
    $('#lin').css('cursor', 'pointer');
  }

  // *******************************************************************
  // **********************   SELECT MODE + BIND   *********************
  // *******************************************************************
  if (mode == 'select_mode') {
    if (typeof (binder) != 'undefined' && (binder.type == 'segment' || binder.type == 'node' || binder.type == 'obj' || binder.type == 'boundingBox')) {
      mode = 'bind_mode';

      if (binder.type == 'obj') {
        action = 1;
      }

      if (binder.type == 'boundingBox') {
        action = 1;
      }

      // INIT FOR HELP BINDER NODE MOVING H V (MOUSE DOWN)
      if (binder.type == 'node') {
        $('#boxScale').hide(100);
        var node = binder.data;
        pox = node.x;
        poy = node.y;
        var nodeControl = { x: pox, y: poy };

        // DETERMINATE DISTANCE OF OPPOSED NODE ON EDGE(s) PARENT(s) OF THIS NODE !!!! NODE 1 -- NODE 2 SYSTE% :-(
        wallListObj = []; // SUPER VAR -- WARNING
        var objWall;
        wallListRun = [];
        for (var ee = WALLS.length - 1; ee > -1; ee--) { // SEARCH MOST YOUNG WALL COORDS IN NODE BINDER
          if (isObjectsEquals(WALLS[ee].start, nodeControl) || isObjectsEquals(WALLS[ee].end, nodeControl)) {
            wallListRun.push(WALLS[ee]);
            break;
          }
        }
        if (wallListRun[0].child != null) {
          if (isObjectsEquals(wallListRun[0].child.start, nodeControl) || isObjectsEquals(wallListRun[0].child.end, nodeControl)) wallListRun.push(wallListRun[0].child);
        }
        if (wallListRun[0].parent != null) {
          if (isObjectsEquals(wallListRun[0].parent.start, nodeControl) || isObjectsEquals(wallListRun[0].parent.end, nodeControl)) wallListRun.push(wallListRun[0].parent);
        }

        for (var k in wallListRun) {
          if (isObjectsEquals(wallListRun[k].start, nodeControl) || isObjectsEquals(wallListRun[k].end, nodeControl)) {
            var nodeTarget = wallListRun[k].start;
            if (isObjectsEquals(wallListRun[k].start, nodeControl)) {
              nodeTarget = wallListRun[k].end;
            }
            objWall = editor.objFromWall(wallListRun[k]); // LIST OBJ ON EDGE -- NOT INDEX !!!
            wall = wallListRun[k];
            for (var ob = 0; ob < objWall.length; ob++) {
              var objTarget = objWall[ob];
              var distance = qSVG.measure(objTarget, nodeTarget);
              wallListObj.push({ wall: wall, from: nodeTarget, distance: distance, obj: objTarget, indexObj: ob });
            }
          }
        }
        magnetic = 0;
        action = 1;
      }
      if (binder.type == 'segment') {

        $('#boxScale').hide(100);
        var wall = binder.wall;
        binder.before = binder.wall.start;
        equation2 = editor.createEquationFromWall(wall);
        if (wall.parent != null) {
          equation1 = editor.createEquationFromWall(wall.parent);
          var angle12 = qSVG.angleBetweenEquations(equation1.A, equation2.A);
          if (angle12 < 20 || angle12 > 160) {
            var found = true;
            for (var k in WALLS) {
              if (qSVG.rayCasting(wall.start, WALLS[k].coords) && !isObjectsEquals(WALLS[k], wall.parent) && !isObjectsEquals(WALLS[k], wall)) {
                if (wall.parent.parent != null && isObjectsEquals(wall, wall.parent.parent)) wall.parent.parent = null;
                if (wall.parent.child != null && isObjectsEquals(wall, wall.parent.child)) wall.parent.child = null;
                wall.parent = null;
                found = false;
                break;
              }
            }
            if (found) {
              var newWall;
              if (isObjectsEquals(wall.parent.end, wall.start, "1")) {
                newWall = new editor.wall(wall.parent.end, wall.start, "normal", wall.thick);
                WALLS.push(newWall);
                newWall.parent = wall.parent;
                newWall.child = wall;
                wall.parent.child = newWall;
                wall.parent = newWall;
                equation1 = qSVG.perpendicularEquation(equation2, wall.start.x, wall.start.y);
              }
              else if (isObjectsEquals(wall.parent.start, wall.start, "2")) {
                newWall = new editor.wall(wall.parent.start, wall.start, "normal", wall.thick);
                WALLS.push(newWall);
                newWall.parent = wall.parent;
                newWall.child = wall;
                wall.parent.parent = newWall;
                wall.parent = newWall;
                equation1 = qSVG.perpendicularEquation(equation2, wall.start.x, wall.start.y);
              }
              // CREATE NEW WALL
            }
          }
        }
        if (wall.parent == null) {
          var foundEq = false;
          for (var k in WALLS) {
            if (qSVG.rayCasting(wall.start, WALLS[k].coords) && !isObjectsEquals(WALLS[k].coords, wall.coords)) {
              var angleFollow = qSVG.angleBetweenEquations(WALLS[k].equations.base.A, equation2.A);
              if (angleFollow < 20 || angleFollow > 160) break;
              equation1 = editor.createEquationFromWall(WALLS[k]);
              equation1.follow = WALLS[k];
              equation1.backUp = {
                coords: WALLS[k].coords,
                start: WALLS[k].start,
                end: WALLS[k].end,
                child: WALLS[k].child,
                parent: WALLS[k].parent
              };
              foundEq = true;
              break;
            }
          }
          if (!foundEq) equation1 = qSVG.perpendicularEquation(equation2, wall.start.x, wall.start.y);
        }

        if (wall.child != null) {
          equation3 = editor.createEquationFromWall(wall.child);
          var angle23 = qSVG.angleBetweenEquations(equation3.A, equation2.A);
          if (angle23 < 20 || angle23 > 160) {
            var found = true;
            for (var k in WALLS) {
              if (qSVG.rayCasting(wall.end, WALLS[k].coords) && !isObjectsEquals(WALLS[k], wall.child) && !isObjectsEquals(WALLS[k], wall)) {
                if (wall.child.parent != null && isObjectsEquals(wall, wall.child.parent)) wall.child.parent = null;
                if (wall.child.child != null && isObjectsEquals(wall, wall.child.child)) wall.child.child = null;
                wall.child = null;
                found = false;
                break;
              }
            }
            if (found) {
              if (isObjectsEquals(wall.child.start, wall.end)) {
                var newWall = new editor.wall(wall.end, wall.child.start, "new", wall.thick);
                WALLS.push(newWall);
                newWall.parent = wall;
                newWall.child = wall.child;
                wall.child.parent = newWall;
                wall.child = newWall;
                equation3 = qSVG.perpendicularEquation(equation2, wall.end.x, wall.end.y);
              }
              else if (isObjectsEquals(wall.child.end, wall.end)) {
                var newWall = new editor.wall(wall.end, wall.child.end, "normal", wall.thick);
                WALLS.push(newWall);
                newWall.parent = wall;
                newWall.child = wall.child;
                wall.child.child = newWall;
                wall.child = newWall;
                equation3 = qSVG.perpendicularEquation(equation2, wall.end.x, wall.end.y);
              }
              // CREATE NEW WALL
            }
          }
        }
        if (wall.child == null) {
          var foundEq = false;
          for (var k in WALLS) {
            if (qSVG.rayCasting(wall.end, WALLS[k].coords) && !isObjectsEquals(WALLS[k].coords, wall.coords, "4")) {
              var angleFollow = qSVG.angleBetweenEquations(WALLS[k].equations.base.A, equation2.A);
              if (angleFollow < 20 || angleFollow > 160) break;
              equation3 = editor.createEquationFromWall(WALLS[k]);
              equation3.follow = WALLS[k];
              equation3.backUp = {
                coords: WALLS[k].coords,
                start: WALLS[k].start,
                end: WALLS[k].end,
                child: WALLS[k].child,
                parent: WALLS[k].parent
              };
              foundEq = true;
              break;
            }
          }
          if (!foundEq) equation3 = qSVG.perpendicularEquation(equation2, wall.end.x, wall.end.y);
        }

        equationFollowers = [];
        for (var k in WALLS) {
          if (WALLS[k].child == null && qSVG.rayCasting(WALLS[k].end, wall.coords) && !isObjectsEquals(wall, WALLS[k])) {
            equationFollowers.push({
              wall: WALLS[k],
              eq: editor.createEquationFromWall(WALLS[k]),
              type: "end"
            });
          }
          if (WALLS[k].parent == null && qSVG.rayCasting(WALLS[k].start, wall.coords) && !isObjectsEquals(wall, WALLS[k])) {
            equationFollowers.push({
              wall: WALLS[k],
              eq: editor.createEquationFromWall(WALLS[k]),
              type: "start"
            });
          }
        }

        equationsObj = [];
        var objWall = editor.objFromWall(wall); // LIST OBJ ON EDGE
        for (var ob = 0; ob < objWall.length; ob++) {
          var objTarget = objWall[ob];
          equationsObj.push({ obj: objTarget, wall: wall, eq: qSVG.perpendicularEquation(equation2, objTarget.x, objTarget.y) });
        }
        action = 1;
      }
    }

    else {
      action = 0;
      drag = 'on';
      snap = calcul_snap(event, grid_snap);
      pox = snap.xMouse;
      poy = snap.yMouse;
    }
  }
}

//******************************************************************************************************
//*******************  *****  ******        ************************************************************
//*******************  *****  ******  ****  ************************************************************
//*******************  *****  ******  ****  ************************************************************
//*******************  *****  ******        ************************************************************
//*******************         ******  ******************************************************************
//**********************************  ******************************************************************

function _MOUSEUP(event) {
  if (showRib) $('#boxScale').show(200);
  drag = 'off';
  cursor('default');
  if (mode == 'select_mode') {
    if (typeof (binder) != 'undefined') {
      binder.remove();
      delete binder;
      save();
    }
  }

  //**************************************************************************
  //********************   TEXTE   MODE **************************************
  //**************************************************************************
  if (mode == 'text_mode') {
    if (action == 0) {
      action = 1;
      const textModal = new bootstrap.Modal($('#textToLayer'))

      textModal.show();
      mode == 'edit_text_mode';
    }
  }

  //**************************************************************************
  //**************        OBJECT   MODE **************************************
  //**************************************************************************
  if (mode == 'object_mode') {
    OBJDATA.push(binder);
    binder.graph.remove();
    var targetBox = 'boxcarpentry';
    if (OBJDATA[OBJDATA.length - 1].class == 'energy') targetBox = 'boxEnergy';
    if (OBJDATA[OBJDATA.length - 1].class == 'furniture') targetBox = 'boxFurniture';
    $('#' + targetBox).append(OBJDATA[OBJDATA.length - 1].graph);
    delete binder;
    $('#boxinfo').html('Object added');
    fonc_button('select_mode');
    save();
  }

  // *******************************************************************
  // **************************   DISTANCE MODE   **********************
  // *******************************************************************
  if (mode == 'distance_mode') {

    if (action == 1) {
      action = 0;
      // MODIFY BBOX FOR BINDER ZONE (TXT)
      var bbox = labelMeasure.get(0).getBoundingClientRect();
      bbox.x = (bbox.x * factor) - (offset.left * factor) + originX_viewbox;
      bbox.y = (bbox.y * factor) - (offset.top * factor) + originY_viewbox;
      bbox.origin = { x: bbox.x + (bbox.width / 2), y: bbox.y + (bbox.height / 2) };
      binder.bbox = bbox;
      binder.realBbox = [
        { x: binder.bbox.x, y: binder.bbox.y }, { x: binder.bbox.x + binder.bbox.width, y: binder.bbox.y }, { x: binder.bbox.x + binder.bbox.width, y: binder.bbox.y + binder.bbox.height }, { x: binder.bbox.x, y: binder.bbox.y + binder.bbox.height }];
      binder.size = binder.bbox.width;
      binder.thick = binder.bbox.height;
      binder.graph.append(labelMeasure);
      OBJDATA.push(binder);
      binder.graph.remove();
      $('#boxcarpentry').append(OBJDATA[OBJDATA.length - 1].graph);
      delete binder;
      delete labelMeasure;
      cross.remove();
      delete cross;
      $('#boxinfo').html('Measure added');
      fonc_button('select_mode');
      save();
    }
  }

  // *******************************************************************
  // **************************   ROOM MODE   **************************
  // *******************************************************************

  if (mode == 'room_mode') {

    if (typeof (binder) == "undefined") {
      return false;
    }

    var area = binder.area / 3600;
    binder.attr({ 'fill': 'none', 'stroke': '#ddf00a', 'stroke-width': 7 });
    $('.size').html(area.toFixed(2) + " m²");
    $('#roomIndex').val(binder.id);
    if (ROOM[binder.id].surface != '') $('#roomSurface').val(ROOM[binder.id].surface);
    else $('#roomSurface').val('');
    document.querySelector('#seeArea').checked = ROOM[binder.id].showSurface;
    document.querySelector('#roomBackground').value = ROOM[binder.id].color;
    var roomName = ROOM[binder.id].name;
    document.querySelector('#roomName').value = roomName;
    if (ROOM[binder.id].name != '') {
      document.querySelector('#roomLabel').innerHTML = roomName + ' <span class="caret"></span>';
    }
    else {
      document.querySelector('#roomLabel').innerHTML = 'None <span class="caret"></span>';
    }

    var actionToDo = ROOM[binder.id].action;
    document.querySelector('#' + actionToDo + 'Action').checked = true;
    $('#panel').hide(100);
    $('#roomTools').show('300')
    $('#lin').css('cursor', 'default');
    $('#boxinfo').html('Config. the room');

    mode = 'edit_room_mode';
    save();
  }

  // *******************************************************************
  // **************************   NODE MODE   **************************
  // *******************************************************************

  if (mode == 'node_mode') {
    if (typeof (binder) != 'undefined') { // ALSO ON MOUSEUP WITH HAVE CIRCLEBINDER ON ADDPOINT
      var newWall = new editor.wall({ x: binder.data.x, y: binder.data.y }, binder.data.wall.end, "normal", binder.data.wall.thick);
      WALLS.push(newWall);
      binder.data.wall.end = { x: binder.data.x, y: binder.data.y };
      binder.remove();
      delete binder;
      editor.architect(WALLS);
      save();
    }
    fonc_button('select_mode');
  }

  // *******************************************************************  ***** ****      *******  ******  ******  *****
  // **************************   OBJ MODE   ***************************  *   * *******     *****  ******  ******   **
  // *******************************************************************  ***** ****       ******  ******  ******  ***

  if (mode == 'door_mode') {
    if (typeof (binder) == "undefined") {
      $('#boxinfo').html('The plan currently contains no wall.');
      fonc_button('select_mode');
      return false;
    }
    OBJDATA.push(binder);
    binder.graph.remove();
    $('#boxcarpentry').append(OBJDATA[OBJDATA.length - 1].graph);
    delete binder;
    $('#boxinfo').html('Element added');
    fonc_button('select_mode');
    save();
  }

  // *******************************************************************
  // ********************   LINE MODE MOUSE UP   ***********************
  // *******************************************************************

  if (mode == 'line_mode' || mode == 'partition_mode') {
    $('#linetemp').remove(); // DEL LINE HELP CONSTRUC 0 45 90
    intersectionOff();

    var sizeWall = qSVG.measure({ x: x, y: y }, { x: pox, y: poy });
    sizeWall = sizeWall / meter;
    if ($('#line_construc').length && sizeWall > 0.3) {
      var sizeWall = wallSize;
      if (mode == 'partition_mode') sizeWall = partitionSize;
      var wall = new editor.wall({ x: pox, y: poy }, { x: x, y: y }, "normal", sizeWall);
      WALLS.push(wall);
      editor.architect(WALLS);

      if (document.getElementById("multi").checked && !wallEndConstruc) {
        cursor('validation');
        action = 1;
      }
      else action = 0;
      $('#boxinfo').html('Wall added <span style=\'font-size:0.6em\'>Moy. ' + (qSVG.measure(
        { x: pox, y: poy }, { x: x, y: y }) / 60).toFixed(2) + ' m</span>');
      $('#line_construc').remove(); // DEL LINE CONSTRUC HELP TO VIEW NEW SEG PATH
      lengthTemp.remove();
      delete lengthTemp;
      construc = 0;
      if (wallEndConstruc) action = 0;
      delete wallEndConstruc;
      pox = x;
      poy = y;
      save();
    }
    else {
      action = 0;
      construc = 0;
      $('#boxinfo').html('Select mode');
      fonc_button('select_mode');
      if (typeof (binder) != 'undefined') {
        binder.remove();
        delete binder;
      }
      snap = calcul_snap(event, grid_snap);
      pox = snap.x;
      poy = snap.y;
    }
  }
  // **************************** END LINE MODE MOUSE UP **************************

  //**************************************************************************************
  //**********************      BIND MODE MOUSE UP    ************************************
  //**************************************************************************************

  if (mode == 'bind_mode') {
    action = 0;
    construc = 0; // CONSTRUC 0 TO FREE BINDER GROUP NODE WALL MOVING
    if (typeof (binder) != 'undefined') {
      fonc_button('select_mode');
      if (binder.type == 'node') {

      } // END BINDER NODE

      if (binder.type == 'segment') {

        var found = false;
        if (binder.wall.start == binder.before) {
          found = true;
        }

        if (found) {
          $('#panel').hide(100);
          var objWall = editor.objFromWall(wallBind);
          $('#boxinfo').html('Modify a wall<br/><span style="font-size:0.7em;color:#de9b43">This wall can\'t become a separation (contains doors or windows) !</span>');
          if (objWall.length > 0) $('#separate').hide();
          else if (binder.wall.type == 'separate') {
            $('#separate').hide();
            $('#rangeThick').hide();
            $('#recombine').show();
            $('#cutWall').hide();
            document.getElementById('titleWallTools').textContent = "Modify the separation";
          }
          else {
            $('#cutWall').show();
            $('#separate').show();
            $('#rangeThick').show();
            $('#recombine').hide();
            document.getElementById('titleWallTools').textContent = "Modify the wall";
            $('#boxinfo').html('Modify the wall');
          }
          $('#wallTools').show(200);
          document.getElementById('wallWidth').setAttribute('min', 7);
          document.getElementById('wallWidth').setAttribute('max', 50);
          document.getElementById('wallWidthScale').textContent = "7-50";
          document.getElementById("wallWidth").value = binder.wall.thick;
          document.getElementById("wallWidthVal").textContent = binder.wall.thick;
          mode = 'edit_wall_mode';
        }
        delete equation1;
        delete equation2;
        delete equation3;
        delete intersectionFollowers;
      }

      if (binder.type == 'obj') {
        var moveObj = Math.abs(binder.oldXY.x - binder.x) + Math.abs(binder.oldXY.y - binder.y);
        if (moveObj < 1) {
          $('#panel').hide(100);
          $('#objTools').show('200')
          $('#lin').css('cursor', 'default');
          $('#boxinfo').html('Config. the door/window');
          console.log('obj ??')
          document.getElementById('doorWindowWidth').setAttribute('min', binder.obj.params.resizeLimit.width.min);
          document.getElementById('doorWindowWidth').setAttribute('max', binder.obj.params.resizeLimit.width.max);
          document.getElementById('doorWindowWidthScale').textContent = binder.obj.params.resizeLimit.width.min + "-" + binder.obj.params.resizeLimit.width.max;
          document.getElementById("doorWindowWidth").value = binder.obj.size;
          document.getElementById("doorWindowWidthVal").textContent = binder.obj.size;
          mode = 'edit_door_mode';

        }
        else {
          mode = "select_mode";
          action = 0;
          binder.graph.remove();
          delete binder;
        }
      }

      if (typeof (binder) != 'undefined' && binder.type == 'boundingBox') {
        var moveObj = Math.abs(binder.oldX - binder.x) + Math.abs(binder.oldY - binder.y);
        var objTarget = binder.obj;
        if (!objTarget.params.move) {
          // TO REMOVE MEASURE ON PLAN
          objTarget.graph.remove();
          OBJDATA.splice(OBJDATA.indexOf(objTarget), 1);
          $('#boxinfo').html('Measure deleted !');
        }
        if (moveObj < 1 && objTarget.params.move) {
          if (!objTarget.params.resize) $('#objBoundingBoxScale').hide();
          else $('#objBoundingBoxScale').show();
          if (!objTarget.params.rotate) $('#objBoundingBoxRotation').hide();
          else $('#objBoundingBoxRotation').show();
          $('#panel').hide(100);
          console.log(objTarget.params.resizeLimit.width.min)
          $('#objBoundingBox').show('200')
          $('#lin').css('cursor', 'default');
          $('#boxinfo').html('Modify the object');
          console.log(objTarget)
          document.getElementById('bboxWidth').setAttribute('min', objTarget.params.resizeLimit.width.min);
          document.getElementById('bboxWidth').setAttribute('max', objTarget.params.resizeLimit.width.max);
          document.getElementById('bboxWidthScale').textContent = objTarget.params.resizeLimit.width.min + "-" + objTarget.params.resizeLimit.height.max;
          document.getElementById('bboxHeight').setAttribute('min', objTarget.params.resizeLimit.height.min);
          document.getElementById('bboxHeight').setAttribute('max', objTarget.params.resizeLimit.height.max);
          document.getElementById('bboxHeightScale').textContent = objTarget.params.resizeLimit.height.min + "-" + objTarget.params.resizeLimit.height.max;
          $('#stepsCounter').hide();
          if (objTarget.class == 'stair') {
            document.getElementById("bboxStepsVal").textContent = objTarget.value;
            $('#stepsCounter').show();
          }
          document.getElementById("bboxWidth").value = objTarget.width * 100;
          document.getElementById("bboxWidthVal").textContent = objTarget.width * 100;
          document.getElementById("bboxHeight").value = objTarget.height * 100;
          document.getElementById("bboxHeightVal").textContent = objTarget.height * 100;
          document.getElementById("bboxRotation").value = objTarget.angle;
          document.getElementById("bboxRotationVal").textContent = objTarget.angle;
          mode = 'edit_boundingBox_mode';
        }
        else {
          mode = "select_mode";
          action = 0;
          binder.graph.remove();
          delete binder;
        }
      }

      if (mode == 'bind_mode') {
        binder.remove();
        delete binder;
      }
    } // END BIND IS DEFINED
    save();
  } // END BIND MODE

  if (mode != 'edit_room_mode') {
    editor.showScaleBox();
    rib();
  }
}
