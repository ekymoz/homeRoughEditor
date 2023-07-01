var editor = {

  wall: function (start, end, type, thick) {
    this.thick = thick;
    this.start = start;
    this.end = end;
    this.type = type;
    this.parent = null;
    this.child = null;
    this.angle = 0;
    this.equations = {};
    this.coords = [];
    this.backUp = false;
  },

  // RETURN OBJECTS ARRAY INDEX OF WALLS [WALL1, WALL2, n...] WALLS WITH THIS NODE, EXCEPT PARAM = OBJECT WALL
  getWallNode: function (coords, except = false) {
    var nodes = [];
    for (var k in WALLS) {
      if (!isObjectsEquals(WALLS[k], except)) {
        if (isObjectsEquals(WALLS[k].start, coords)) {
          nodes.push({ wall: WALLS[k], type: "start" });
        }
        if (isObjectsEquals(WALLS[k].end, coords)) {
          nodes.push({ wall: WALLS[k], type: "end" });
        }
      }
    }
    if (nodes.length == 0) return false;
    else return nodes;
  },

  wallsComputing: function (WALLS, action = false) {
    // IF ACTION == MOVE -> equation2 exist !!!!!
    $('#boxwall').empty();
    $('#boxArea').empty();

    for (var vertice = 0; vertice < WALLS.length; vertice++) {
      var wall = WALLS[vertice];
      if (wall.parent != null) {
        if (!isObjectsEquals(wall.parent.start, wall.start) && !isObjectsEquals(wall.parent.end, wall.start)) {
          wall.parent = null;
        }
      }
      if (wall.child != null) {
        if (!isObjectsEquals(wall.child.start, wall.end) && !isObjectsEquals(wall.child.end, wall.end)) {
          wall.child = null;
        }
      }
    }

    for (var vertice = 0; vertice < WALLS.length; vertice++) {
      var wall = WALLS[vertice];
      if (wall.parent != null) {
        if (isObjectsEquals(wall.parent.start, wall.start)) {
          var previousWall = wall.parent;
          var previousWallStart = previousWall.end;
          var previousWallEnd = previousWall.start;
        }
        if (isObjectsEquals(wall.parent.end, wall.start)) {
          var previousWall = wall.parent;
          var previousWallStart = previousWall.start;
          var previousWallEnd = previousWall.end;
        }
      }
      else {
        var S = editor.getWallNode(wall.start, wall);
        // if (wallInhibation && isObjectsEquals(wall, wallInhibation)) S = false;
        for (var k in S) {
          var eqInter = editor.createEquationFromWall(S[k].wall);
          var angleInter = 90; // TO PASS TEST
          if (action == "move") {
            angleInter = qSVG.angleBetweenEquations(eqInter.A, equation2.A);
          }
          if (S[k].type == 'start' && S[k].wall.parent == null && angleInter > 20 && angleInter < 160) {
            wall.parent = S[k].wall;
            S[k].wall.parent = wall;
            var previousWall = wall.parent;
            var previousWallStart = previousWall.end;
            var previousWallEnd = previousWall.start;
          }
          if (S[k].type == 'end' && S[k].wall.child == null && angleInter > 20 && angleInter < 160) {
            wall.parent = S[k].wall;
            S[k].wall.child = wall;
            var previousWall = wall.parent;
            var previousWallStart = previousWall.start;
            var previousWallEnd = previousWall.end;
          }
        }
      }

      if (wall.child != null) {
        if (isObjectsEquals(wall.child.end, wall.end)) {
          var nextWall = wall.child;
          var nextWallStart = nextWall.end;
          var nextWallEnd = nextWall.start;
        }
        else {
          var nextWall = wall.child;
          var nextWallStart = nextWall.start;
          var nextWallEnd = nextWall.end;
        }
      }
      else {
        var E = editor.getWallNode(wall.end, wall);
        // if (wallInhibation && isObjectsEquals(wall, wallInhibation)) E = false;
        for (var k in E) {
          var eqInter = editor.createEquationFromWall(E[k].wall);
          var angleInter = 90; // TO PASS TEST
          if (action == "move") {
            angleInter = qSVG.angleBetweenEquations(eqInter.A, equation2.A);
          }
          if (E[k].type == 'end' && E[k].wall.child == null && angleInter > 20 && angleInter < 160) {
            wall.child = E[k].wall;
            E[k].wall.child = wall;
            var nextWall = wall.child;
            var nextWallStart = nextWall.end;
            var nextWallEnd = nextWall.start;
          }
          if (E[k].type == 'start' && E[k].wall.parent == null && angleInter > 20 && angleInter < 160) {
            wall.child = E[k].wall;
            E[k].wall.parent = wall;
            var nextWall = wall.child;
            var nextWallStart = nextWall.start;
            var nextWallEnd = nextWall.end;
          }
        }
      }

      var angleWall = Math.atan2(wall.end.y - wall.start.y, wall.end.x - wall.start.x);
      wall.angle = angleWall;
      var wallThickX = (wall.thick / 2) * Math.sin(angleWall);
      var wallThickY = (wall.thick / 2) * Math.cos(angleWall);
      var eqWallUp = qSVG.createEquation(wall.start.x + wallThickX, wall.start.y - wallThickY, wall.end.x + wallThickX, wall.end.y - wallThickY);
      var eqWallDw = qSVG.createEquation(wall.start.x - wallThickX, wall.start.y + wallThickY, wall.end.x - wallThickX, wall.end.y + wallThickY);
      var eqWallBase = qSVG.createEquation(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
      wall.equations = { up: eqWallUp, down: eqWallDw, base: eqWallBase };
      var dWay;

      // WALL STARTED
      if (wall.parent == null) {
        var eqP = qSVG.perpendicularEquation(eqWallUp, wall.start.x, wall.start.y);
        var interUp = qSVG.intersectionOfEquations(eqWallUp, eqP, "object");
        var interDw = qSVG.intersectionOfEquations(eqWallDw, eqP, "object");
        wall.coords = [interUp, interDw];
        dWay = "M" + interUp.x + "," + interUp.y + " L" + interDw.x + "," + interDw.y + " ";
      }
      else {
        var eqP = qSVG.perpendicularEquation(eqWallUp, wall.start.x, wall.start.y);
        // var previousWall = wall.parent;
        //   var previousWallStart = previousWall.start;
        //   var previousWallEnd = previousWall.end;
        var anglePreviousWall = Math.atan2(previousWallEnd.y - previousWallStart.y, previousWallEnd.x - previousWallStart.x);
        var previousWallThickX = (previousWall.thick / 2) * Math.sin(anglePreviousWall);
        var previousWallThickY = (previousWall.thick / 2) * Math.cos(anglePreviousWall);
        var eqPreviousWallUp = qSVG.createEquation(previousWallStart.x + previousWallThickX, previousWallStart.y - previousWallThickY, previousWallEnd.x + previousWallThickX, previousWallEnd.y - previousWallThickY);
        var eqPreviousWallDw = qSVG.createEquation(previousWallStart.x - previousWallThickX, previousWallStart.y + previousWallThickY, previousWallEnd.x - previousWallThickX, previousWallEnd.y + previousWallThickY);
        if (Math.abs(anglePreviousWall - angleWall) > 0.09) {
          var interUp = qSVG.intersectionOfEquations(eqWallUp, eqPreviousWallUp, "object");
          var interDw = qSVG.intersectionOfEquations(eqWallDw, eqPreviousWallDw, "object");

          if (eqWallUp.A == eqPreviousWallUp.A) {
            interUp = { x: wall.start.x + wallThickX, y: wall.start.y - wallThickY };
            interDw = { x: wall.start.x - wallThickX, y: wall.start.y + wallThickY };
          }

          var miter = qSVG.gap(interUp, { x: previousWallEnd.x, y: previousWallEnd.y });
          if (miter > 1000) {
            var interUp = qSVG.intersectionOfEquations(eqP, eqWallUp, "object");
            var interDw = qSVG.intersectionOfEquations(eqP, eqWallDw, "object");
          }
        }
        if (Math.abs(anglePreviousWall - angleWall) <= 0.09) {
          var interUp = qSVG.intersectionOfEquations(eqP, eqWallUp, "object");
          var interDw = qSVG.intersectionOfEquations(eqP, eqWallDw, "object");
        }
        wall.coords = [interUp, interDw];
        dWay = "M" + interUp.x + "," + interUp.y + " L" + interDw.x + "," + interDw.y + " ";
      }

      // WALL FINISHED
      if (wall.child == null) {
        var eqP = qSVG.perpendicularEquation(eqWallUp, wall.end.x, wall.end.y);
        var interUp = qSVG.intersectionOfEquations(eqWallUp, eqP, "object");
        var interDw = qSVG.intersectionOfEquations(eqWallDw, eqP, "object");
        wall.coords.push(interDw, interUp);
        dWay = dWay + "L" + interDw.x + "," + interDw.y + " L" + interUp.x + "," + interUp.y + " Z";
      }
      else {
        var eqP = qSVG.perpendicularEquation(eqWallUp, wall.end.x, wall.end.y);
        // var nextWall = wall.child;
        //   var nextWallStart = nextWall.start;
        //   var nextWallEnd = nextWall.end;
        var angleNextWall = Math.atan2(nextWallEnd.y - nextWallStart.y, nextWallEnd.x - nextWallStart.x);
        var nextWallThickX = (nextWall.thick / 2) * Math.sin(angleNextWall);
        var nextWallThickY = (nextWall.thick / 2) * Math.cos(angleNextWall);
        var eqNextWallUp = qSVG.createEquation(nextWallStart.x + nextWallThickX, nextWallStart.y - nextWallThickY, nextWallEnd.x + nextWallThickX, nextWallEnd.y - nextWallThickY);
        var eqNextWallDw = qSVG.createEquation(nextWallStart.x - nextWallThickX, nextWallStart.y + nextWallThickY, nextWallEnd.x - nextWallThickX, nextWallEnd.y + nextWallThickY);
        if (Math.abs(angleNextWall - angleWall) > 0.09) {
          var interUp = qSVG.intersectionOfEquations(eqWallUp, eqNextWallUp, "object");
          var interDw = qSVG.intersectionOfEquations(eqWallDw, eqNextWallDw, "object");

          if (eqWallUp.A == eqNextWallUp.A) {
            interUp = { x: wall.end.x + wallThickX, y: wall.end.y - wallThickY };
            interDw = { x: wall.end.x - wallThickX, y: wall.end.y + wallThickY };
          }

          var miter = qSVG.gap(interUp, { x: nextWallStart.x, y: nextWallStart.y });
          if (miter > 1000) {
            var interUp = qSVG.intersectionOfEquations(eqWallUp, eqP, "object");
            var interDw = qSVG.intersectionOfEquations(eqWallDw, eqP, "object");
          }
        }
        if (Math.abs(angleNextWall - angleWall) <= 0.09) {
          var interUp = qSVG.intersectionOfEquations(eqWallUp, eqP, "object");
          var interDw = qSVG.intersectionOfEquations(eqWallDw, eqP, "object");
        }

        wall.coords.push(interDw, interUp);
        dWay = dWay + "L" + interDw.x + "," + interDw.y + " L" + interUp.x + "," + interUp.y + " Z";
      }

      wall.graph = editor.makeWall(dWay);
      $('#boxwall').append(wall.graph);
    }
  },

  makeWall: function (way) {
    var wallScreen = qSVG.create('none', 'path', {
      d: way,
      stroke: "none",
      fill: colorWall,
      "stroke-width": 1,
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": 4,
      "fill-rule": "nonzero"
    });
    return wallScreen;
  },

  invisibleWall: function (wallToInvisble = false) {
    if (!wallToInvisble) wallToInvisble = binder.wall;
    var objWall = editor.objFromWall(wallBind);
    if (objWall.length == 0) {
      wallToInvisble.type = "separate";
      wallToInvisble.backUp = wallToInvisble.thick;
      wallToInvisble.thick = 0.07;
      editor.architect(WALLS);
      mode = "select_mode";
      $('#panel').show(200);
      save();
      return true;
    }
    else {
      $('#boxinfo').html('Les murs contenant des portes ou des fenêtres ne peuvent être une séparation !');
      return false;
    }
  },

  visibleWall: function (wallToInvisble = false) {
    if (!wallToInvisble) wallToInvisble = binder.wall;
    wallToInvisble.type = "normal";
    wallToInvisble.thick = wallToInvisble.backUp;
    wallToInvisble.backUp = false;
    editor.architect(WALLS);
    mode = "select_mode";
    $('#panel').show(200);
    save();
    return true;
  },

  architect: function (WALLS) {
    editor.wallsComputing(WALLS);
    Rooms = qSVG.polygonize(WALLS);
    $('#boxRoom').empty();
    $('#boxSurface').empty();
    editor.roomMaker(Rooms);
    return true;
  },

  splitWall: function (wallToSplit = false) {
    if (!wallToSplit) wallToSplit = binder.wall;
    var eqWall = editor.createEquationFromWall(wallToSplit);
    var wallToSplitLength = qSVG.gap(wallToSplit.start, wallToSplit.end);
    var newWalls = [];
    for (var k in WALLS) {
      var eq = editor.createEquationFromWall(WALLS[k]);
      var inter = qSVG.intersectionOfEquations(eqWall, eq, 'obj');
      if (qSVG.btwn(inter.x, binder.wall.start.x, binder.wall.end.x, 'round') && qSVG.btwn(inter.y, binder.wall.start.y, binder.wall.end.y, 'round') && qSVG.btwn(inter.x, WALLS[k].start.x, WALLS[k].end.x, 'round') && qSVG.btwn(inter.y, WALLS[k].start.y, WALLS[k].end.y, 'round')) {
        var distance = qSVG.gap(wallToSplit.start, inter);
        if (distance > 5 && distance < wallToSplitLength) newWalls.push({ distance: distance, coords: inter });
      }
    }
    newWalls.sort(function (a, b) {
      return (a.distance - b.distance).toFixed(2);
    });
    var initCoords = wallToSplit.start;
    var initThick = wallToSplit.thick;
    // CLEAR THE WALL BEFORE PIECES RE-BUILDER
    for (var k in WALLS) {
      if (isObjectsEquals(WALLS[k].child, wallToSplit)) WALLS[k].child = null;
      if (isObjectsEquals(WALLS[k].parent, wallToSplit)) { WALLS[k].parent = null; }
    }
    WALLS.splice(WALLS.indexOf(wallToSplit), 1);
    var wall;
    for (var k in newWalls) {
      wall = new editor.wall(initCoords, newWalls[k].coords, "normal", initThick);
      WALLS.push(wall);
      wall.child = WALLS[WALLS.length];
      initCoords = newWalls[k].coords;
    }
    // LAST WALL ->
    wall = new editor.wall(initCoords, wallToSplit.end, "normal", initThick);
    WALLS.push(wall);
    editor.architect(WALLS);
    mode = "select_mode";
    $('#panel').show(200);
    save();
    return true;
  },

  nearWallNode: function (snap, range = Infinity, except = ['']) {
    var best;
    var bestWall;
    var scan;
    var i = 0;
    var scanDistance;
    var bestDistance = Infinity;
    for (var k = 0; k < WALLS.length; k++) {
      if (except.indexOf(WALLS[k]) == -1) {
        scanStart = WALLS[k].start;
        scanEnd = WALLS[k].end;
        scanDistance = qSVG.measure(scanStart, snap);
        if (scanDistance < bestDistance) {
          best = scanStart;
          bestDistance = scanDistance;
          bestWall = k;
        }
        scanDistance = qSVG.measure(scanEnd, snap);
        if (scanDistance < bestDistance) {
          best = scanEnd;
          bestDistance = scanDistance;
          bestWall = k;
        }
      }
    }
    if (bestDistance <= range) {
      return ({
        x: best.x,
        y: best.y,
        bestWall: bestWall
      });
    } else {
      return false;
    }
  },

  // USING WALLS SUPER WALL OBJECTS ARRAY
  rayCastingWall: function (snap) {
    var wallList = [];
    for (var i = 0; i < WALLS.length; i++) {
      var polygon = [];
      for (var pp = 0; pp < 4; pp++) {
        polygon.push({ x: WALLS[i].coords[pp].x, y: WALLS[i].coords[pp].y }); // FOR Z
      }
      if (qSVG.rayCasting(snap, polygon)) {
        wallList.push(WALLS[i]); // Return EDGES Index
      }
    }
    if (wallList.length == 0) return false;
    else {
      if (wallList.length == 1) return wallList[0];
      else return wallList;
    }
  },

  stickOnWall: function (snap) {
    if (WALLS.length == 0) return false;
    var wallDistance = Infinity;
    var wallSelected = {};
    var result;
    if (WALLS.length == 0) return false;
    for (var e = 0; e < WALLS.length; e++) {
      var eq1 = qSVG.createEquation(WALLS[e].coords[0].x, WALLS[e].coords[0].y, WALLS[e].coords[3].x, WALLS[e].coords[3].y);
      result1 = qSVG.nearPointOnEquation(eq1, snap);
      var eq2 = qSVG.createEquation(WALLS[e].coords[1].x, WALLS[e].coords[1].y, WALLS[e].coords[2].x, WALLS[e].coords[2].y);
      result2 = qSVG.nearPointOnEquation(eq2, snap);
      if (result1.distance < wallDistance && qSVG.btwn(result1.x, WALLS[e].coords[0].x, WALLS[e].coords[3].x) && qSVG.btwn(result1.y, WALLS[e].coords[0].y, WALLS[e].coords[3].y)) {
        wallDistance = result1.distance;
        wallSelected = { wall: WALLS[e], x: result1.x, y: result1.y, distance: result1.distance };
      }
      if (result2.distance < wallDistance && qSVG.btwn(result2.x, WALLS[e].coords[1].x, WALLS[e].coords[2].x) && qSVG.btwn(result2.y, WALLS[e].coords[1].y, WALLS[e].coords[2].y)) {
        wallDistance = result2.distance;
        wallSelected = { wall: WALLS[e], x: result2.x, y: result2.y, distance: result2.distance };
      }
    }
    var vv = editor.nearVertice(snap);
    if (vv.distance < wallDistance) {
      var eq1 = qSVG.createEquation(vv.number.coords[0].x, vv.number.coords[0].y, vv.number.coords[3].x, vv.number.coords[3].y);
      result1 = qSVG.nearPointOnEquation(eq1, vv);
      var eq2 = qSVG.createEquation(vv.number.coords[1].x, vv.number.coords[1].y, vv.number.coords[2].x, vv.number.coords[2].y);
      result2 = qSVG.nearPointOnEquation(eq2, vv);
      if (result1.distance < wallDistance && qSVG.btwn(result1.x, vv.number.coords[0].x, vv.number.coords[3].x) && qSVG.btwn(result1.y, vv.number.coords[0].y, vv.number.coords[3].y)) {
        wallDistance = result1.distance;
        wallSelected = { wall: vv.number, x: result1.x, y: result1.y, distance: result1.distance };
      }
      if (result2.distance < wallDistance && qSVG.btwn(result2.x, vv.number.coords[1].x, vv.number.coords[2].x) && qSVG.btwn(result2.y, vv.number.coords[1].y, vv.number.coords[2].y)) {
        wallDistance = result2.distance;
        wallSelected = { wall: vv.number, x: result2.x, y: result2.y, distance: result2.distance };
      }
    }
    return wallSelected;
  },


  // RETURN OBJDATA INDEX LIST FROM AN WALL
  objFromWall: function (wall, typeObj = false) {
    var objList = [];
    for (var scan = 0; scan < OBJDATA.length; scan++) {
      var search;
      if (OBJDATA[scan].family == 'inWall') {
        var eq = qSVG.createEquation(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
        search = qSVG.nearPointOnEquation(eq, OBJDATA[scan]);
        if (search.distance < 0.01 && qSVG.btwn(OBJDATA[scan].x, wall.start.x, wall.end.x) && qSVG.btwn(OBJDATA[scan].y, wall.start.y, wall.end.y)) objList.push(OBJDATA[scan]);
        // WARNING 0.01 TO NO COUNT OBJECT ON LIMITS OF THE EDGE !!!!!!!!!!!! UGLY CODE( MOUSE PRECISION)
        // TRY WITH ANGLE MAYBE ???
      }
    }
    return objList;
  },

  createEquationFromWall: function (wall) {
    return qSVG.createEquation(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
  },

  // WALLS SUPER ARRAY
  rayCastingWalls: function (snap) {
    var wallList = [];
    for (var i = 0; i < WALLS.length; i++) {
      var polygon = [];
      for (var pp = 0; pp < 4; pp++) {
        polygon.push({ x: WALLS[i].coords[pp].x, y: WALLS[i].coords[pp].y }); // FOR Z
      }
      if (qSVG.rayCasting(snap, polygon)) {
        wallList.push(WALLS[i]); // Return EDGES Index
      }
    }
    if (wallList.length == 0) return false;
    else {
      if (wallList.length == 1) return wallList[0];
      else return wallList;
    }
  },

  inWallRib2: function (wall, option = false) {
    if (!option) $('#boxRib').empty();
    ribMaster = [];
    var emptyArray = [];
    ribMaster.push(emptyArray);
    ribMaster.push(emptyArray);
    var inter;
    var distance;
    var cross;
    var angleTextValue = wall.angle * (180 / Math.PI);
    var objWall = editor.objFromWall(wall); // LIST OBJ ON EDGE
    ribMaster[0].push({ wall: wall, crossObj: false, side: 'up', coords: wall.coords[0], distance: 0 });
    ribMaster[1].push({ wall: wall, crossObj: false, side: 'down', coords: wall.coords[1], distance: 0 });
    for (var ob in objWall) {
      var objTarget = objWall[ob];
      objTarget.up = [
        qSVG.nearPointOnEquation(wall.equations.up, objTarget.limit[0]),
        qSVG.nearPointOnEquation(wall.equations.up, objTarget.limit[1])
      ];
      objTarget.down = [
        qSVG.nearPointOnEquation(wall.equations.down, objTarget.limit[0]),
        qSVG.nearPointOnEquation(wall.equations.down, objTarget.limit[1])
      ];

      distance = qSVG.measure(wall.coords[0], objTarget.up[0]) / meter;
      ribMaster[0].push({ wall: wall, crossObj: ob, side: 'up', coords: objTarget.up[0], distance: distance.toFixed(2) });
      distance = qSVG.measure(wall.coords[0], objTarget.up[1]) / meter;
      ribMaster[0].push({ wall: wall, crossObj: ob, side: 'up', coords: objTarget.up[1], distance: distance.toFixed(2) });
      distance = qSVG.measure(wall.coords[1], objTarget.down[0]) / meter;
      ribMaster[1].push({ wall: wall, crossObj: ob, side: 'down', coords: objTarget.down[0], distance: distance.toFixed(2) });
      distance = qSVG.measure(wall.coords[1], objTarget.down[1]) / meter;
      ribMaster[1].push({ wall: wall, crossObj: ob, side: 'down', coords: objTarget.down[1], distance: distance.toFixed(2) });
    }
    distance = qSVG.measure(wall.coords[0], wall.coords[3]) / meter;
    ribMaster[0].push({ wall: wall, crossObj: false, side: 'up', coords: wall.coords[3], distance: distance });
    distance = qSVG.measure(wall.coords[1], wall.coords[2]) / meter;
    ribMaster[1].push({ wall: wall, crossObj: false, side: 'down', coords: wall.coords[2], distance: distance });
    ribMaster[0].sort(function (a, b) {
      return (a.distance - b.distance).toFixed(2);
    });
    ribMaster[1].sort(function (a, b) {
      return (a.distance - b.distance).toFixed(2);
    });
    for (var t in ribMaster) {
      for (var n = 1; n < ribMaster[t].length; n++) {
        var found = true;
        var shift = -5;
        var valueText = Math.abs(ribMaster[t][n - 1].distance - ribMaster[t][n].distance);
        var angleText = angleTextValue;
        if (found) {
          if (ribMaster[t][n - 1].side == 'down') { shift = -shift + 10; }
          if (angleText > 89 || angleText < -89) {
            angleText -= 180;
            if (ribMaster[t][n - 1].side == 'down') { shift = -5; }
            else shift = -shift + 10;
          }



          sizeText[n] = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          var startText = qSVG.middle(ribMaster[t][n - 1].coords.x, ribMaster[t][n - 1].coords.y, ribMaster[t][n].coords.x, ribMaster[t][n].coords.y);
          sizeText[n].setAttributeNS(null, 'x', startText.x);
          sizeText[n].setAttributeNS(null, 'y', (startText.y) + shift);
          sizeText[n].setAttributeNS(null, 'text-anchor', 'middle');
          sizeText[n].setAttributeNS(null, 'font-family', 'roboto');
          sizeText[n].setAttributeNS(null, 'stroke', '#ffffff');
          sizeText[n].textContent = valueText.toFixed(2);
          if (sizeText[n].textContent < 1) {
            sizeText[n].setAttributeNS(null, 'font-size', '0.8em');
            sizeText[n].textContent = sizeText[n].textContent.substring(1, sizeText[n].textContent.length);
          }
          else sizeText[n].setAttributeNS(null, 'font-size', '1em');
          sizeText[n].setAttributeNS(null, 'stroke-width', '0.4px');
          sizeText[n].setAttributeNS(null, 'fill', '#666666');
          sizeText[n].setAttribute("transform", "rotate(" + angleText + " " + startText.x + "," + (startText.y) + ")");

          $('#boxRib').append(sizeText[n]);
        }
      }
    }
  },

  // value can be "text label", "step number in stair", etc...
  obj2D: function (family, classe, type, pos, angle, angleSign, size, hinge = 'normal', thick, value) {
    this.family = family   // inWall, stick, collision, free
    this.class = classe;  // door, window, energy, stair, measure, text ?
    this.type = type; // simple, double, simpleSlide, aperture, doubleSlide, fixed, switch, lamp....
    this.x = pos.x;
    this.y = pos.y;
    this.angle = angle;
    this.angleSign = angleSign;
    this.limit = [];
    this.hinge = hinge; // normal, reverse
    this.graph = qSVG.create('none', 'g');
    this.scale = { x: 1, y: 1 };
    this.value = value;
    this.size = size;
    this.thick = thick;
    this.width = (this.size / meter).toFixed(2);
    this.height = (this.thick / meter).toFixed(2);

    var cc = carpentryCalc(classe, type, size, thick, value);
    var blank;

    for (var tt = 0; tt < cc.length; tt++) {
      if (cc[tt].path) {
        blank = qSVG.create('none', 'path', {
          d: cc[tt].path,
          "stroke-width": 1,
          fill: cc[tt].fill,
          stroke: cc[tt].stroke,
          'stroke-dasharray': cc[tt].strokeDashArray,
          opacity: cc[tt].opacity
        });
      }
      if (cc[tt].text) {
        blank = qSVG.create("none", "text", {
          x: cc[tt].x,
          y: cc[tt].y,
          'font-size': cc[tt].fontSize,
          stroke: cc[tt].stroke,
          "stroke-width": cc[tt].strokeWidth,
          'font-family': 'roboto',
          'text-anchor': 'middle',
          fill: cc[tt].fill
        });
        blank[0].textContent = cc[tt].text;
      }
      this.graph.append(blank);

    } // ENDFOR
    var bbox = this.graph.get(0).getBoundingClientRect();
    bbox.x = (bbox.x * factor) - (offset.left * factor) + originX_viewbox;
    bbox.y = (bbox.y * factor) - (offset.top * factor) + originY_viewbox;
    bbox.origin = { x: this.x, y: this.y };
    this.bbox = bbox;
    this.realBbox = [{ x: -this.size / 2, y: -this.thick / 2 }, { x: this.size / 2, y: -this.thick / 2 }, { x: this.size / 2, y: this.thick / 2 }, { x: -this.size / 2, y: this.thick / 2 }];
    if (family == "byObject") this.family = cc.family;
    this.params = cc.params; // (bindBox, move, resize, rotate)
    cc.params.width ? this.size = cc.params.width : this.size = size;
    cc.params.height ? this.thick = cc.params.height : this.thick = thick;


    this.update = function () {
      this.width = (this.size / meter).toFixed(2);
      this.height = (this.thick / meter).toFixed(2);
      cc = carpentryCalc(this.class, this.type, this.size, this.thick, this.value);
      for (var tt = 0; tt < cc.length; tt++) {
        if (cc[tt].path) {
          this.graph.find('path')[tt].setAttribute("d", cc[tt].path);
        }
        else {
          // this.graph.find('text').context.textContent = cc[tt].text;
        }
      }
      var hingeStatus = this.hinge; // normal - reverse
      var hingeUpdate;
      if (hingeStatus == 'normal') hingeUpdate = 1;
      else hingeUpdate = -1;
      this.graph.attr({ "transform": "translate(" + (this.x) + "," + (this.y) + ") rotate(" + this.angle + ",0,0) scale(" + hingeUpdate + ", 1)" });
      var bbox = this.graph.get(0).getBoundingClientRect();
      bbox.x = (bbox.x * factor) - (offset.left * factor) + originX_viewbox;
      bbox.y = (bbox.y * factor) - (offset.top * factor) + originY_viewbox;
      bbox.origin = { x: this.x, y: this.y };
      this.bbox = bbox;

      if (this.class == "text" && this.angle == 0) {
        this.realBbox = [
          { x: this.bbox.x, y: this.bbox.y }, { x: this.bbox.x + this.bbox.width, y: this.bbox.y }, { x: this.bbox.x + this.bbox.width, y: this.bbox.y + this.bbox.height }, { x: this.bbox.x, y: this.bbox.y + this.bbox.height }];
        this.size = this.bbox.width;
        this.thick = this.bbox.height;
      }

      var angleRadian = -(this.angle) * (Math.PI / 180);
      this.realBbox = [{ x: -this.size / 2, y: -this.thick / 2 }, { x: this.size / 2, y: -this.thick / 2 }, { x: this.size / 2, y: this.thick / 2 }, { x: -this.size / 2, y: this.thick / 2 }];
      var newRealBbox = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
      newRealBbox[0].x = (this.realBbox[0].y * Math.sin(angleRadian) + this.realBbox[0].x * Math.cos(angleRadian)) + this.x;
      newRealBbox[1].x = (this.realBbox[1].y * Math.sin(angleRadian) + this.realBbox[1].x * Math.cos(angleRadian)) + this.x;
      newRealBbox[2].x = (this.realBbox[2].y * Math.sin(angleRadian) + this.realBbox[2].x * Math.cos(angleRadian)) + this.x;
      newRealBbox[3].x = (this.realBbox[3].y * Math.sin(angleRadian) + this.realBbox[3].x * Math.cos(angleRadian)) + this.x;
      newRealBbox[0].y = (this.realBbox[0].y * Math.cos(angleRadian) - this.realBbox[0].x * Math.sin(angleRadian)) + this.y;
      newRealBbox[1].y = (this.realBbox[1].y * Math.cos(angleRadian) - this.realBbox[1].x * Math.sin(angleRadian)) + this.y;
      newRealBbox[2].y = (this.realBbox[2].y * Math.cos(angleRadian) - this.realBbox[2].x * Math.sin(angleRadian)) + this.y;
      newRealBbox[3].y = (this.realBbox[3].y * Math.cos(angleRadian) - this.realBbox[3].x * Math.sin(angleRadian)) + this.y;
      this.realBbox = newRealBbox;
      return true;
    }
  },

  roomMaker: function (Rooms) {
    globalArea = 0;
    var oldVertexNumber = [];
    if (Rooms.polygons.length == 0) ROOM = [];
    for (var pp = 0; pp < Rooms.polygons.length; pp++) {
      var foundRoom = false;
      var roomId;
      for (var rr = 0; rr < ROOM.length; rr++) {
        roomId = rr;
        var countCoords = Rooms.polygons[pp].coords.length;
        var diffCoords = qSVG.diffObjIntoArray(Rooms.polygons[pp].coords, ROOM[rr].coords);
        if (Rooms.polygons[pp].way.length == ROOM[rr].way.length) {
          if (qSVG.diffArray(Rooms.polygons[pp].way, ROOM[rr].way).length == 0 || diffCoords == 0) {
            countCoords = 0;
          }
        }
        if (Rooms.polygons[pp].way.length == ROOM[rr].way.length + 1) {
          if (qSVG.diffArray(Rooms.polygons[pp].way, ROOM[rr].way).length == 1 || diffCoords == 2) {
            countCoords = 0;
          }
        }
        if (Rooms.polygons[pp].way.length == ROOM[rr].way.length - 1) {
          if (qSVG.diffArray(Rooms.polygons[pp].way, ROOM[rr].way).length == 1) {
            countCoords = 0;
          }
        }
        if (countCoords == 0) {
          foundRoom = true;
          ROOM[rr].area = Rooms.polygons[pp].area;
          ROOM[rr].inside = Rooms.polygons[pp].inside;
          ROOM[rr].coords = Rooms.polygons[pp].coords;
          ROOM[rr].coordsOutside = Rooms.polygons[pp].coordsOutside;
          ROOM[rr].way = Rooms.polygons[pp].way;
          ROOM[rr].coordsInside = Rooms.polygons[pp].coordsInside;
          break;
        }
      }
      if (!foundRoom) {
        ROOM.push({ coords: Rooms.polygons[pp].coords, coordsOutside: Rooms.polygons[pp].coordsOutside, coordsInside: Rooms.polygons[pp].coordsInside, inside: Rooms.polygons[pp].inside, way: Rooms.polygons[pp].way, area: Rooms.polygons[pp].area, surface: '', name: '', color: 'gradientWhite', showSurface: true, action: 'add' });
      }
    }

    var toSplice = [];
    for (var rr = 0; rr < ROOM.length; rr++) {
      var found = true;
      for (var pp = 0; pp < Rooms.polygons.length; pp++) {
        var countRoom = ROOM[rr].coords.length;
        var diffCoords = qSVG.diffObjIntoArray(Rooms.polygons[pp].coords, ROOM[rr].coords);
        if (Rooms.polygons[pp].way.length == ROOM[rr].way.length) {
          if (qSVG.diffArray(Rooms.polygons[pp].way, ROOM[rr].way).length == 0 || diffCoords == 0) {
            countRoom = 0;
          }
        }
        if (Rooms.polygons[pp].way.length == ROOM[rr].way.length + 1) {
          if (qSVG.diffArray(Rooms.polygons[pp].way, ROOM[rr].way).length == 1 || diffCoords == 2) {
            countRoom = 0;
          }
        }
        if (Rooms.polygons[pp].way.length == ROOM[rr].way.length - 1) {
          if (qSVG.diffArray(Rooms.polygons[pp].way, ROOM[rr].way).length == 1) {
            countRoom = 0;
          }
        }
        if (countRoom == 0) { found = true; break; }
        else found = false;
      }
      if (!found) toSplice.push(rr);
    }

    toSplice.sort(function (a, b) {
      return b - a;
    });
    for (var ss = 0; ss < toSplice.length; ss++) {
      ROOM.splice(toSplice[ss], 1);
    }
    $('#boxRoom').empty();
    $('#boxSurface').empty();
    $('#boxArea').empty();
    for (var rr = 0; rr < ROOM.length; rr++) {

      if (ROOM[rr].action == 'add') globalArea = globalArea + ROOM[rr].area;

      var pathSurface = ROOM[rr].coords;
      var pathCreate = "M" + pathSurface[0].x + "," + pathSurface[0].y;
      for (var p = 1; p < pathSurface.length; p++) {
        pathCreate = pathCreate + " " + "L" + pathSurface[p].x + "," + pathSurface[p].y;
      }
      if (ROOM[rr].inside.length > 0) {
        for (var ins = 0; ins < ROOM[rr].inside.length; ins++) {
          pathCreate = pathCreate + " M" + Rooms.polygons[ROOM[rr].inside[ins]].coords[Rooms.polygons[ROOM[rr].inside[ins]].coords.length - 1].x + "," + Rooms.polygons[ROOM[rr].inside[ins]].coords[Rooms.polygons[ROOM[rr].inside[ins]].coords.length - 1].y;
          for (var free = Rooms.polygons[ROOM[rr].inside[ins]].coords.length - 2; free > -1; free--) {
            pathCreate = pathCreate + " L" + Rooms.polygons[ROOM[rr].inside[ins]].coords[free].x + "," + Rooms.polygons[ROOM[rr].inside[ins]].coords[free].y;
          }
        }
      }
      qSVG.create('boxRoom', 'path', {
        d: pathCreate,
        fill: 'url(#' + ROOM[rr].color + ')',
        'fill-opacity': 1, stroke: 'none', 'fill-rule': 'evenodd', class: 'room'
      });

      qSVG.create('boxSurface', 'path', {
        d: pathCreate,
        fill: '#fff', 'fill-opacity': 1, stroke: 'none', 'fill-rule': 'evenodd', class: 'room'
      });

      var centroid = qSVG.polygonVisualCenter(ROOM[rr]);

      if (ROOM[rr].name != '') {
        var styled = { color: '#343938' };
        if (ROOM[rr].color == 'gradientBlack' || ROOM[rr].color == 'gradientBlue') styled.color = 'white';
        qSVG.textOnDiv(ROOM[rr].name, centroid, styled, 'boxArea');
      }

      if (ROOM[rr].name != '') centroid.y = centroid.y + 20;
      var area = ((ROOM[rr].area) / (meter * meter)).toFixed(2) + ' m²';
      var styled = { color: '#343938', fontSize: '18px', fontWeight: 'normal' };
      if (ROOM[rr].surface != '') {
        styled.fontWeight = 'bold';
        area = ROOM[rr].surface + ' m²';
      }
      if (ROOM[rr].color == 'gradientBlack' || ROOM[rr].color == 'gradientBlue') styled.color = 'white';
      if (ROOM[rr].showSurface) qSVG.textOnDiv(area, centroid, styled, 'boxArea');
    }
    if (globalArea <= 0) {
      globalArea = 0;
      $('#areaValue').html('');
    }
    else {
      $('#areaValue').html('<i class="fa fa-map-o" aria-hidden="true"></i> ' + (globalArea / 3600).toFixed(1) + ' m²');
    }
  },

  rayCastingRoom: function (point) {
    var x = point.x, y = point.y;
    var roomGroup = [];
    for (var polygon = 0; polygon < ROOM.length; polygon++) {
      var inside = qSVG.rayCasting(point, ROOM[polygon].coords);

      if (inside) {
        roomGroup.push(polygon);
      }
    }
    if (roomGroup.length > 0) {
      var bestArea = ROOM[roomGroup[0]].area;
      var roomTarget;
      for (var siz = 0; siz < roomGroup.length; siz++) {
        if (ROOM[roomGroup[siz]].area <= bestArea) {
          bestArea = ROOM[roomGroup[siz]].area;
          roomTarget = ROOM[roomGroup[siz]];
        }
      }
      return roomTarget;
    }
    else {
      return false;
    }
  },

  nearVertice: function (snap, range = 10000) {
    var bestDistance = Infinity;
    var bestVertice;
    for (var i = 0; i < WALLS.length; i++) {
      var distance1 = qSVG.gap(snap, { x: WALLS[i].start.x, y: WALLS[i].start.y });
      var distance2 = qSVG.gap(snap, { x: WALLS[i].end.x, y: WALLS[i].end.y });
      if (distance1 < distance2 && distance1 < bestDistance) {
        bestDistance = distance1;
        bestVertice = { number: WALLS[i], x: WALLS[i].start.x, y: WALLS[i].start.y, distance: Math.sqrt(bestDistance) };
      }
      if (distance2 < distance1 && distance2 < bestDistance) {
        bestDistance = distance2;
        bestVertice = { number: WALLS[i], x: WALLS[i].end.x, y: WALLS[i].end.y, distance: Math.sqrt(bestDistance) };
      }
    }
    if (bestDistance < range * range) return bestVertice;
    else return false;
  },

  nearWall: function (snap, range = Infinity) {
    var wallDistance = Infinity;
    var wallSelected = {};
    var result;
    if (WALLS.length == 0) return false;
    for (var e = 0; e < WALLS.length; e++) {
      var eq = qSVG.createEquation(WALLS[e].start.x, WALLS[e].start.y, WALLS[e].end.x, WALLS[e].end.y);
      result = qSVG.nearPointOnEquation(eq, snap);
      if (result.distance < wallDistance && qSVG.btwn(result.x, WALLS[e].start.x, WALLS[e].end.x) && qSVG.btwn(result.y, WALLS[e].start.y, WALLS[e].end.y)) {
        wallDistance = result.distance;
        wallSelected = { wall: WALLS[e], x: result.x, y: result.y, distance: result.distance };
      }
    }
    var vv = editor.nearVertice(snap);
    if (vv.distance < wallDistance) {
      wallDistance = vv.distance;
      wallSelected = { wall: vv.number, x: vv.x, y: vv.y, distance: vv.distance };
    }
    if (wallDistance <= range) return wallSelected;
    else return false;
  },

  showScaleBox: function () {
    if (ROOM.length > 0) {
      var minX, minY, maxX, maxY;
      for (var i = 0; i < WALLS.length; i++) {
        var px = WALLS[i].start.x;
        var py = WALLS[i].start.y;
        if (!i || px < minX) minX = px;
        if (!i || py < minY) minY = py;
        if (!i || px > maxX) maxX = px;
        if (!i || py > maxY) maxY = py;
        var px = WALLS[i].end.x;
        var py = WALLS[i].end.y;
        if (!i || px < minX) minX = px;
        if (!i || py < minY) minY = py;
        if (!i || px > maxX) maxX = px;
        if (!i || py > maxY) maxY = py;
      }
      var width = maxX - minX;
      var height = maxY - minY;

      var labelWidth = ((maxX - minX) / meter).toFixed(2);
      var labelHeight = ((maxY - minY) / meter).toFixed(2);

      var sideRight = 'm' + (maxX + 40) + ',' + minY;
      sideRight = sideRight + ' l60,0 m-40,10 l10,-10 l10,10 m-10,-10';
      sideRight = sideRight + ' l0,' + height;
      sideRight = sideRight + ' m-30,0 l60,0 m-40,-10 l10,10 l10,-10';

      sideRight = sideRight + 'M' + (minX) + ',' + (minY - 40);
      sideRight = sideRight + ' l0,-60 m10,40 l-10,-10 l10,-10 m-10,10';
      sideRight = sideRight + ' l' + width + ',0';
      sideRight = sideRight + ' m0,30 l0,-60 m-10,40 l10,-10 l-10,-10';

      $('#boxScale').empty();

      qSVG.create('boxScale', 'path', {
        d: sideRight,
        stroke: "#555",
        fill: "none",
        "stroke-width": 0.3,
        "stroke-linecap": "butt",
        "stroke-linejoin": "miter",
        "stroke-miterlimit": 4,
        "fill-rule": "nonzero"
      });

      var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttributeNS(null, 'x', (maxX + 70));
      text.setAttributeNS(null, 'y', ((maxY + minY) / 2) + 35);
      text.setAttributeNS(null, 'fill', '#555');
      text.setAttributeNS(null, 'text-anchor', 'middle');
      text.textContent = labelHeight + ' m';
      text.setAttribute("transform", "rotate(270 " + (maxX + 70) + "," + (maxY + minY) / 2 + ")");
      $('#boxScale').append(text);

      var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttributeNS(null, 'x', (maxX + minX) / 2);
      text.setAttributeNS(null, 'y', (minY - 95));
      text.setAttributeNS(null, 'fill', '#555');
      text.setAttributeNS(null, 'text-anchor', 'middle');
      text.textContent = labelWidth + ' m';
      $('#boxScale').append(text);

    }
  }

  // END EDITOR
}
