//----------------------- Quick SVG LIBRARY --------------------------------------------------
//----------------------- V1.0 Licence MIT ---------------------------------------------------
//----------------------- Author : Patrick RASPINO--------------------------------------------
//----------------------- 11/08/16 -----------------------------------------------------------

// 'use strict';

// eslint-disable-next-line no-unused-vars
const qSVGCreate = function ($, isObjectsEquals) {
    const qSVG = {
        create: function (id, shape, attrs) {
            const shapeEl = $(
                document.createElementNS("http://www.w3.org/2000/svg", shape)
            );
            for (const k in attrs) {
                shapeEl.attr(k, attrs[k]);
            }
            if (id !== "none") {
                $(`#${id}`).append(shapeEl);
            }
            return shapeEl;
        },

        angleDeg: function (cx, cy, ex, ey) {
            const dy = ey - cy;
            const dx = ex - cx;
            let theta = Math.atan2(dy, dx); // range (-PI, PI]
            theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
            if (theta < 0) {
                theta = 360 + theta; // range [0, 360)
            }
            return theta;
        },

        angle: function (x1, y1, x2, y2, x3, y3) {
            const px1 = parseInt(x1);
            const py1 = parseInt(y1);
            const px2 = parseInt(x2);
            const py2 = parseInt(y2);
            let anglerad;
            let angledeg;
            if (!x3) {
                if (px1 - px2 === 0) {
                    anglerad = Math.PI / 2;
                } else {
                    anglerad = Math.atan((py1 - py2) / (px1 - px2));
                }
                angledeg = (anglerad * 180) / Math.PI;
            } else {
                const px3 = parseInt(x3);
                const py3 = parseInt(y3);
                const a = Math.sqrt(
                    Math.pow(Math.abs(px2 - px1), 2) +
                        Math.pow(Math.abs(py2 - py1), 2)
                );
                const b = Math.sqrt(
                    Math.pow(Math.abs(px2 - px3), 2) +
                        Math.pow(Math.abs(py2 - py3), 2)
                );
                const c = Math.sqrt(
                    Math.pow(Math.abs(px3 - px1), 2) +
                        Math.pow(Math.abs(py3 - py1), 2)
                );
                if (a === 0 || b === 0) {
                    anglerad = Math.PI / 2;
                } else {
                    anglerad = Math.acos(
                        (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) /
                            (2 * a * b)
                    );
                }
                angledeg = (360 * anglerad) / (2 * Math.PI);
            }
            return {
                rad: anglerad,
                deg: angledeg,
            };
        },

        getAngle: function (el1, el2) {
            return {
                rad: Math.atan2(el2.y - el1.y, el2.x - el1.x),
                deg: (Math.atan2(el2.y - el1.y, el2.x - el1.x) * 180) / Math.PI,
            };
        },

        middle: function (xo, yo, xd, yd) {
            const x1 = parseInt(xo);
            const y1 = parseInt(yo);
            const x2 = parseInt(xd);
            const y2 = parseInt(yd);
            const middleX = Math.abs(x1 + x2) / 2;
            const middleY = Math.abs(y1 + y2) / 2;
            return {
                x: middleX,
                y: middleY,
            };
        },

        triangleArea: function (fp, sp, tp) {
            const A = qSVG.measure(fp, sp);
            const B = qSVG.measure(sp, tp);
            const C = qSVG.measure(tp, fp);
            const p = (A + B + C) / 2;
            return Math.sqrt(p * (p - A) * (p - B) * (p - C));
        },

        measure: function (po, pt) {
            return Math.sqrt(
                Math.pow(po.x - pt.x, 2) + Math.pow(po.y - pt.y, 2)
            );
        },

        gap: function (po, pt) {
            return Math.pow(po.x - pt.x, 2) + Math.pow(po.y - pt.y, 2);
        },

        pDistance(point, pointA, pointB) {
            const x = point.x;
            const y = point.y;
            const x1 = pointA.x;
            const y1 = pointA.y;
            const x2 = pointB.x;
            const y2 = pointB.y;
            const A = x - x1;
            const B = y - y1;
            const C = x2 - x1;
            const D = y2 - y1;
            const dot = A * C + B * D;
            const len_sq = C * C + D * D;
            let param = -1;
            if (len_sq !== 0) {
                // in case of 0 length line
                param = dot / len_sq;
            }
            let xx;
            let yy;
            if (param < 0) {
                xx = x1;
                yy = y1;
            } else if (param > 1) {
                xx = x2;
                yy = y2;
            } else {
                xx = x1 + param * C;
                yy = y1 + param * D;
            }
            const dx = x - xx;
            const dy = y - yy;
            return {
                x: xx,
                y: yy,
                distance: Math.sqrt(dx * dx + dy * dy),
            };
        },

        nearPointOnEquation: function (equation, point) {
            // Y = Ax + B ---- equation {A:val, B:val}
            if (equation.A === "h") {
                return {
                    x: point.x,
                    y: equation.B,
                    distance: Math.abs(equation.B - point.y),
                };
            } else if (equation.A === "v") {
                return {
                    x: equation.B,
                    y: point.y,
                    distance: Math.abs(equation.B - point.x),
                };
            }
            const pointA = {
                x: point.x,
                y: equation.A * point.x + equation.B,
            };
            const pointB = {
                x: (point.y - equation.B) / equation.A,
                y: point.y,
            };
            return qSVG.pDistance(point, pointA, pointB);
        },

        circlePath: function (cx, cy, r) {
            return `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,0 ${
                r * 2
            },0 a ${r},${r} 0 1,0 -${r * 2},0`;
        },

        createEquation: function (x0, y0, x1, y1) {
            if (x1 - x0 === 0) {
                return { A: "v", B: x0 };
            } else if (y1 - y0 === 0) {
                return { A: "h", B: y0 };
            }
            return {
                A: (y1 - y0) / (x1 - x0),
                B: y1 - x1 * ((y1 - y0) / (x1 - x0)),
            };
        },

        perpendicularEquation: function (equation, x1, y1) {
            if (typeof equation.A !== "string") {
                return {
                    A: -1 / equation.A,
                    B: y1 - (-1 / equation.A) * x1,
                };
            }
            if (equation.A === "h") {
                return { A: "v", B: x1 };
            }
            if (equation.A === "v") {
                return { A: "h", B: y1 };
            }
        },

        angleBetweenEquations: function (m1, m2) {
            let pm1 = m1 === "h" ? (m1 = 0) : m1;
            let pm2 = m2 === "h" ? (m2 = 0) : m2;
            pm1 = pm1 === "v" ? (pm1 = 10000) : pm1;
            pm2 = pm2 === "v" ? (pm2 = 10000) : pm2;
            const angleRad = Math.atan(Math.abs((pm2 - pm1) / (1 + pm1 * pm2)));
            return (360 * angleRad) / (2 * Math.PI);
        },

        // type array return [x,y] ---- type object return {x:x, y:y}
        intersectionOfEquations: function (eq1, eq2, type = "array") {
            let retObj;
            if (eq1.A === eq2.A) {
                retObj = false;
            }
            if (eq1.A === "v" && eq2.A === "h") {
                retObj = { x: eq1.B, y: eq2.B };
            }
            if (eq1.A === "h" && eq2.A === "v") {
                retObj = { x: eq2.B, y: eq1.B };
            }
            if (eq1.A === "h" && eq2.A !== "v" && eq2.A !== "h") {
                retObj = { x: (eq1.B - eq2.B) / eq2.A, y: eq1.B };
            }
            if (eq1.A === "v" && eq2.A !== "v" && eq2.A !== "h") {
                retObj = { x: eq1.B, y: eq2.A * eq1.B + eq2.B };
            }
            if (eq2.A === "h" && eq1.A !== "v" && eq1.A !== "h") {
                retObj = { x: (eq2.B - eq1.B) / eq1.A, y: eq2.B };
            }
            if (eq2.A === "v" && eq1.A !== "v" && eq1.A !== "h") {
                retObj = { x: eq2.B, y: eq1.A * eq2.B + eq1.B };
            }
            if (
                eq1.A !== "h" &&
                eq1.A !== "v" &&
                eq2.A !== "v" &&
                eq2.A !== "h"
            ) {
                const xT = (eq2.B - eq1.B) / (eq1.A - eq2.A);
                const yT = eq1.A * xT + eq1.B;
                retObj = { x: xT, y: yT };
            }
            if (type === "array" && retObj) {
                return [retObj.x, retObj.y];
            }
            return retObj;
        },

        vectorXY: function (obj1, obj2) {
            return {
                x: obj2.x - obj1.x,
                y: obj2.y - obj1.y,
            };
        },

        vectorAngle: function (v1, v2) {
            return (
                (Math.atan2(v2.y - v1.y, v2.x - v1.x) + Math.PI / 2) *
                (180 / Math.PI)
            );
        },

        vectorDeter: function (v1, v2) {
            return v1.x * v2.y - v1.y * v2.x;
        },

        btwn: function (a, b1, b2, round = false) {
            if (round) {
                a = Math.round(a);
                b1 = Math.round(b1);
                b2 = Math.round(b2);
            }
            if (a >= b1 && a <= b2) {
                return true;
            }
            if (a >= b2 && a <= b1) {
                return true;
            }
            return false;
        },

        nearPointFromPath: function (Pathsvg, point, range = Infinity) {
            const pathLength = Pathsvg.getTotalLength();
            if (pathLength > 0) {
                let precision = 40;
                let best;
                let bestLength;
                let bestDistance = Infinity;
                for (let len = 0; len <= pathLength; len += precision) {
                    const scan = Pathsvg.getPointAtLength(len);
                    const scanDistance = qSVG.gap(scan, point);
                    if (scanDistance < bestDistance) {
                        best = scan;
                        bestLength = len;
                        bestDistance = scanDistance;
                    }
                }
                // binary search for precise estimate
                precision /= 2;
                while (precision > 1) {
                    const beforeLength = bestLength - precision;
                    const afterLength = bestLength + precision;
                    const before = Pathsvg.getPointAtLength(beforeLength);
                    const after = Pathsvg.getPointAtLength(afterLength);
                    const beforeDistance = qSVG.gap(before, point);
                    const afterDistance = qSVG.gap(after, point);
                    if (beforeLength >= 0 && beforeDistance < bestDistance) {
                        best = before;
                        bestLength = beforeLength;
                        bestDistance = beforeDistance;
                    } else if (
                        afterLength <= pathLength &&
                        afterDistance < bestDistance
                    ) {
                        best = after;
                        bestLength = afterLength;
                        bestDistance = afterDistance;
                    } else {
                        precision /= 2;
                    }
                }

                if (bestDistance <= range * range) {
                    return {
                        x: best.x,
                        y: best.y,
                        length: bestLength,
                        distance: bestDistance,
                        seg: Pathsvg.getPathSegAtLength(bestLength),
                    };
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },

        //  ON PATH RETURN FALSE IF 0 NODE ON PATHSVG WITH POINT coords
        //  RETURN INDEX ARRAY OF NODEs onPoint
        getNodeFromPath: function (Pathsvg, point, except = [""]) {
            const nodeList = Pathsvg.getPathData();
            const nodes = [];
            let countNode = 0;
            for (const [k, node] of nodeList.entries()) {
                if (
                    node.values[0] === point.x &&
                    node.values[1] === point.y &&
                    node.type !== "Z"
                ) {
                    if (except.indexOf(k) === -1) {
                        countNode++;
                        nodes.push(k);
                    }
                }
            }
            if (countNode === 0) {
                return false;
            }
            return nodes;
        },

        // RETURN ARRAY [{x,y}, {x,y}, ...] OF REAL COORDS POLYGON INTO WALLS, THICKNESS PARAM
        polygonIntoWalls: function (vertex, surface, WALLS) {
            const vertexArray = surface;
            const wall = [];
            const polygon = [];
            for (const v of vertexArray) {
                polygon.push({ x: vertex[v].x, y: vertex[v].y });
            }
            // FIND EDGE (WALLS HERE) OF THESE TWO VERTEX
            for (let i = 0; i < vertexArray.length - 1; i++) {
                for (
                    let segStart = 0;
                    segStart < vertex[vertexArray[i + 1]].segment.length;
                    segStart++
                ) {
                    for (
                        let segEnd = 0;
                        segEnd < vertex[vertexArray[i]].segment.length;
                        segEnd++
                    ) {
                        if (
                            vertex[vertexArray[i + 1]].segment[segStart] ===
                            vertex[vertexArray[i]].segment[segEnd]
                        ) {
                            wall.push({
                                x1: vertex[vertexArray[i]].x,
                                y1: vertex[vertexArray[i]].y,
                                x2: vertex[vertexArray[i + 1]].x,
                                y2: vertex[vertexArray[i + 1]].y,
                                segment:
                                    vertex[vertexArray[i + 1]].segment[
                                        segStart
                                    ],
                            });
                        }
                    }
                }
            }
            // CALC INTERSECS OF EQ PATHS OF THESE TWO WALLS.
            const inside = [];
            const outside = [];
            for (let i = 0; i < wall.length; i++) {
                const inter = [];
                const edge = wall[i];
                let nextEdge = wall[0];
                if (i < wall.length - 1) {
                    nextEdge = wall[i + 1];
                }
                let angleEdge = Math.atan2(
                    edge.y2 - edge.y1,
                    edge.x2 - edge.x1
                );
                let angleNextEdge = Math.atan2(
                    nextEdge.y2 - nextEdge.y1,
                    nextEdge.x2 - nextEdge.x1
                );
                const edgeThicknessX =
                    (WALLS[edge.segment].thick / 2) * Math.sin(angleEdge);
                const edgeThicknessY =
                    (WALLS[edge.segment].thick / 2) * Math.cos(angleEdge);
                const nextEdgeThicknessX =
                    (WALLS[nextEdge.segment].thick / 2) *
                    Math.sin(angleNextEdge);
                const nextEdgeThicknessY =
                    (WALLS[nextEdge.segment].thick / 2) *
                    Math.cos(angleNextEdge);
                const eqEdgeUp = qSVG.createEquation(
                    edge.x1 + edgeThicknessX,
                    edge.y1 - edgeThicknessY,
                    edge.x2 + edgeThicknessX,
                    edge.y2 - edgeThicknessY
                );
                const eqEdgeDw = qSVG.createEquation(
                    edge.x1 - edgeThicknessX,
                    edge.y1 + edgeThicknessY,
                    edge.x2 - edgeThicknessX,
                    edge.y2 + edgeThicknessY
                );
                const eqNextEdgeUp = qSVG.createEquation(
                    nextEdge.x1 + nextEdgeThicknessX,
                    nextEdge.y1 - nextEdgeThicknessY,
                    nextEdge.x2 + nextEdgeThicknessX,
                    nextEdge.y2 - nextEdgeThicknessY
                );
                const eqNextEdgeDw = qSVG.createEquation(
                    nextEdge.x1 - nextEdgeThicknessX,
                    nextEdge.y1 + nextEdgeThicknessY,
                    nextEdge.x2 - nextEdgeThicknessX,
                    nextEdge.y2 + nextEdgeThicknessY
                );

                angleEdge = angleEdge * (180 / Math.PI);
                angleNextEdge = angleNextEdge * (180 / Math.PI);

                if (eqEdgeUp.A !== eqNextEdgeUp.A) {
                    inter.push(
                        qSVG.intersectionOfEquations(
                            eqEdgeUp,
                            eqNextEdgeUp,
                            "object"
                        )
                    );
                    inter.push(
                        qSVG.intersectionOfEquations(
                            eqEdgeDw,
                            eqNextEdgeDw,
                            "object"
                        )
                    );
                } else {
                    inter.push({
                        x: edge.x2 + edgeThicknessX,
                        y: edge.y2 - edgeThicknessY,
                    });
                    inter.push({
                        x: edge.x2 - edgeThicknessX,
                        y: edge.y2 + edgeThicknessY,
                    });
                }

                for (const i of inter) {
                    if (qSVG.rayCasting(i, polygon)) {
                        inside.push(i);
                    } else {
                        outside.push(i);
                    }
                }
            }
            inside.push(inside[0]);
            outside.push(outside[0]);
            return { inside: inside, outside: outside };
        },

        area: function (coordss) {
            if (coordss.length < 2) {
                return false;
            }
            let realArea = 0;
            let j = coordss.length - 1;
            for (const [i, c] of coordss.entries()) {
                realArea =
                    realArea + (coordss[j].x + c.x) * (coordss[j].y - c.y);
                j = i;
            }
            realArea = realArea / 2;
            return Math.abs(realArea.toFixed(2));
        },

        areaRoom: function (vertex, coords, digit = 2) {
            const vertexArray = coords;
            let roughArea = 0;
            let j = vertexArray.length - 2;
            for (const [i, v] of vertexArray.entries()) {
                roughArea =
                    roughArea +
                    (vertex[vertexArray[j]].x + vertex[v].x) *
                        (vertex[vertexArray[j]].y - vertex[v].y);
                j = i;
            }
            roughArea = roughArea / 2;
            return Math.abs(roughArea.toFixed(digit));
        },

        // H && V PROBLEM WHEN TWO SEGMENT ARE v/-> == I/->
        junctionList: function (WALLS) {
            const junction = [];
            // JUNCTION ARRAY LIST ALL SEGMENT INTERSECTIONS
            for (const [i, w] of WALLS.entries()) {
                const eq1 = qSVG.createEquation(
                    w.start.x,
                    w.start.y,
                    w.end.x,
                    w.end.y
                );
                for (const [v, w2] of WALLS.entries()) {
                    if (v === i) {
                        continue;
                    }
                    const eq2 = qSVG.createEquation(
                        w2.start.x,
                        w2.start.y,
                        w2.end.x,
                        w2.end.y
                    );
                    const itc = qSVG.intersectionOfEquations(eq1, eq2);
                    if (itc) {
                        if (
                            (w.end.x === w2.start.x &&
                                w.end.y === w2.start.y) ||
                            (w.start.x === w2.end.x && w.start.y === w2.end.y)
                        ) {
                            if (
                                w.end.x === w2.start.x &&
                                w.end.y === w2.start.y
                            ) {
                                junction.push({
                                    segment: i,
                                    child: v,
                                    values: [w2.start.x, w2.start.y],
                                    type: "natural",
                                });
                            }
                            if (
                                w.start.x === w2.end.x &&
                                w.start.y === w2.end.y
                            ) {
                                junction.push({
                                    segment: i,
                                    child: v,
                                    values: [w.start.x, w.start.y],
                                    type: "natural",
                                });
                            }
                        } else if (
                            qSVG.btwn(itc[0], w.start.x, w.end.x, "round") &&
                            qSVG.btwn(itc[1], w.start.y, w.end.y, "round") &&
                            qSVG.btwn(itc[0], w2.start.x, w2.end.x, "round") &&
                            qSVG.btwn(itc[1], w2.start.y, w2.end.y, "round")
                        ) {
                            junction.push({
                                segment: i,
                                child: v,
                                values: [itc[0], itc[1]],
                                type: "intersection",
                            });
                        }
                    }
                    // IF EQ1 == EQ 2 FIND IF START OF SECOND SEG == END OF FIRST seg (eq.A maybe values H ou V)
                    if (
                        (Math.abs(eq1.A) === Math.abs(eq2.A) ||
                            eq1.A === eq2.A) &&
                        eq1.B === eq2.B
                    ) {
                        if (w.end.x === w2.start.x && w.end.y === w2.start.y) {
                            junction.push({
                                segment: i,
                                child: v,
                                values: [w2.start.x, w2.start.y],
                                type: "natural",
                            });
                        }
                        if (w.start.x === w2.end.x && w.start.y === w2.end.y) {
                            junction.push({
                                segment: i,
                                child: v,
                                values: [w.start.x, w.start.y],
                                type: "natural",
                            });
                        }
                    }
                }
            }
            return junction;
        },

        vertexList: function (junction) {
            const vertex = [];
            let found = true;
            for (const j1 of junction) {
                found = true;
                for (const vv of vertex) {
                    if (
                        Math.round(j1.values[0]) === Math.round(vv.x) &&
                        Math.round(j1.values[1]) === Math.round(vv.y)
                    ) {
                        found = false;
                        vv.segment.push(j1.segment);
                        break;
                    } else {
                        found = true;
                    }
                }
                if (found) {
                    vertex.push({
                        x: Math.round(j1.values[0]),
                        y: Math.round(j1.values[1]),
                        segment: [j1.segment],
                        bypass: 0,
                        type: j1.type,
                    });
                }
            }

            let toClean = [];
            for (const [ss, v1] of vertex.entries()) {
                v1.child = [];
                v1.removed = [];
                for (const sg1 of v1.segment) {
                    for (const [sc, v2] of vertex.entries()) {
                        if (sc !== ss) {
                            for (let scg = 0; scg < v2.segment.length; scg++) {
                                if (v2.segment[scg] === sg1) {
                                    v1.child.push({
                                        id: sc,
                                        angle: Math.floor(
                                            qSVG.getAngle(v1, v2).deg
                                        ),
                                    });
                                }
                            }
                        }
                    }
                }
                toClean = [];
                for (const [fr, v1c1] of v1.child.entries()) {
                    for (const [ft, v1c2] of v1.child.entries()) {
                        if (fr !== ft && typeof v1c1 !== "undefined") {
                            found = true;

                            if (
                                qSVG.btwn(
                                    v1c2.angle,
                                    v1c1.angle + 3,
                                    v1c1.angle - 3,
                                    "round"
                                ) &&
                                found
                            ) {
                                let dOne = qSVG.gap(v1, vertex[v1c2.id]);
                                let dTwo = qSVG.gap(v1, vertex[v1c1.id]);
                                if (dOne > dTwo) {
                                    toClean.push(ft);
                                } else {
                                    toClean.push(fr);
                                }
                            }
                        }
                    }
                }
                toClean.sort(function (a, b) {
                    return b - a;
                });
                toClean.push(-1);
                for (let cc = 0; cc < toClean.length - 1; cc++) {
                    if (toClean[cc] > toClean[cc + 1]) {
                        v1.removed.push(v1.child[toClean[cc]].id);
                        v1.child.splice(toClean[cc], 1);
                    }
                }
            }
            return vertex;
        },

        //*******************************************************
        //* @arr1, arr2 = Array to compare                      *
        //* @app = add function pop() or shift() to @arr1, arr2 *
        //* False if arr1.length != arr2.length                 *
        //* False if value into arr1[] != arr2[] - no order     *
        //* *****************************************************
        arrayCompare: function (arr1, arr2, app) {
            // if (arr1.length != arr2.length) return false;
            let minus = 0;
            let start = 0;
            if (app === "pop") {
                minus = 1;
            }
            if (app === "shift") {
                start = 1;
            }
            let coordCounter = arr1.length - minus - start;
            for (let iFirst = start; iFirst < arr1.length - minus; iFirst++) {
                for (
                    let iSecond = start;
                    iSecond < arr2.length - minus;
                    iSecond++
                ) {
                    if (arr1[iFirst] === arr2[iSecond]) {
                        coordCounter--;
                    }
                }
            }
            if (coordCounter === 0) {
                return true;
            }
            return false;
        },

        vectorVertex: function (vex1, vex2, vex3) {
            const vCurr = qSVG.vectorXY(vex1, vex2);
            const vNext = qSVG.vectorXY(vex2, vex3);
            const Na = Math.sqrt(vCurr.x * vCurr.x + vCurr.y * vCurr.y);
            const Nb = Math.sqrt(vNext.x * vNext.x + vNext.y * vNext.y);
            const C = (vCurr.x * vNext.x + vCurr.y * vNext.y) / (Na * Nb);
            const S = vCurr.x * vNext.y - vCurr.y * vNext.x;
            const BAC = Math.sign(S) * Math.acos(C);
            return BAC * (180 / Math.PI);
        },

        segmentTree: function (VERTEX_NUMBER, vertex) {
            const TREELIST = [VERTEX_NUMBER];
            const WAY = [];
            const COUNT = vertex.length;
            const ORIGIN = VERTEX_NUMBER;
            tree(TREELIST, ORIGIN, COUNT);
            return WAY;

            function tree(TREELIST, ORIGIN, COUNT) {
                if (TREELIST.length === 0) {
                    return;
                }
                const TREETEMP = [];
                COUNT--;
                for (let k = 0; k < TREELIST.length; k++) {
                    let found = true;
                    const WRO = TREELIST[k];
                    const WRO_ARRAY = WRO.toString().split("-");
                    const WR = parseInt(WRO_ARRAY[WRO_ARRAY.length - 1]);

                    for (const v of vertex[WR].child) {
                        if (
                            v.id === ORIGIN &&
                            COUNT < vertex.length - 1 &&
                            WRO_ARRAY.length > 2
                        ) {
                            // WAYS HYPER
                            WAY.push(`${WRO}-${ORIGIN}`); // WAYS
                            found = false;
                            break;
                        }
                    }
                    if (found) {
                        let nextVertex = -1;
                        // const nextVertexValue = 360;
                        let nextDeterValue = Infinity;
                        let nextDeterVal = 0;
                        let nextFlag = 0;
                        if (vertex[WR].child.length === 1) {
                            if (WR === ORIGIN && COUNT === vertex.length - 1) {
                                TREETEMP.push(
                                    `${WRO}-${vertex[WR].child[0].id}`
                                );
                            }
                            if (WR !== ORIGIN && COUNT < vertex.length - 1) {
                                TREETEMP.push(
                                    `${WRO}-${vertex[WR].child[0].id}`
                                );
                            }
                        } else {
                            for (
                                let v = 0;
                                v < vertex[WR].child.length &&
                                vertex[WR].child.length > 0;
                                v++
                            ) {
                                if (
                                    WR === ORIGIN &&
                                    COUNT === vertex.length - 1
                                ) {
                                    // TO INIT FUNCTION -> // CLOCKWISE Research
                                    const vDet = qSVG.vectorVertex(
                                        { x: 0, y: -1 },
                                        vertex[WR],
                                        vertex[vertex[WR].child[v].id]
                                    );
                                    if (vDet >= nextDeterVal) {
                                        nextFlag = 1;
                                        nextDeterVal = vDet;
                                        nextVertex = vertex[WR].child[v].id;
                                    }
                                    if (
                                        Math.sign(vDet) === -1 &&
                                        nextFlag === 0
                                    ) {
                                        if (
                                            vDet < nextDeterValue &&
                                            Math.sign(nextDeterValue) > -1
                                        ) {
                                            nextDeterValue = vDet;
                                            nextVertex = vertex[WR].child[v].id;
                                        }
                                        if (
                                            vDet > nextDeterValue &&
                                            Math.sign(nextDeterValue) === -1
                                        ) {
                                            nextDeterValue = vDet;
                                            nextVertex = vertex[WR].child[v].id;
                                        }
                                    }
                                }
                                if (
                                    WR !== ORIGIN &&
                                    WRO_ARRAY[WRO_ARRAY.length - 2] !==
                                        vertex[WR].child[v].id &&
                                    COUNT < vertex.length - 1
                                ) {
                                    // COUNTERCLOCKWISE Research
                                    const vDet = qSVG.vectorVertex(
                                        vertex[WRO_ARRAY[WRO_ARRAY.length - 2]],
                                        vertex[WR],
                                        vertex[vertex[WR].child[v].id]
                                    );
                                    if (
                                        vDet < nextDeterValue &&
                                        nextFlag === 0
                                    ) {
                                        nextDeterValue = vDet;
                                        nextVertex = vertex[WR].child[v].id;
                                    }
                                    if (Math.sign(vDet) === -1) {
                                        nextFlag = 1;
                                        if (vDet <= nextDeterValue) {
                                            nextDeterValue = vDet;
                                            nextVertex = vertex[WR].child[v].id;
                                        }
                                    }
                                }
                            }
                            if (nextVertex !== -1) {
                                TREETEMP.push(`${WRO}-${nextVertex}`);
                            }
                        }
                    }
                }
                if (COUNT > 0) {
                    tree(TREETEMP, ORIGIN, COUNT);
                }
            }
        },

        polygonize: function (segment) {
            const junction = qSVG.junctionList(segment);
            const vertex = qSVG.vertexList(junction, segment);

            const edgesChild = [];
            for (const [j, v] of vertex.entries()) {
                for (const vc of v.child) {
                    edgesChild.push([j, vc.id]);
                }
            }
            const polygons = [];
            for (let jc = 0; jc < edgesChild.length; jc++) {
                let bestVertex = 0;
                let bestVertexValue = Infinity;

                for (const [j, vj] of vertex.entries()) {
                    if (
                        vj.x < bestVertexValue &&
                        vj.child.length > 1 &&
                        vj.bypass === 0
                    ) {
                        bestVertexValue = vj.x;
                        bestVertex = j;
                    }
                    if (
                        vj.x === bestVertexValue &&
                        vj.child.length > 1 &&
                        vj.bypass === 0
                    ) {
                        if (vj.y > vertex[bestVertex].y) {
                            bestVertexValue = vj.x;
                            bestVertex = j;
                        }
                    }
                }

                // console.log("%c%s", "background: yellow; font-size: 14px;","RESEARCH WAY FOR STARTING VERTEX "+bestVertex);
                const WAYS = qSVG.segmentTree(bestVertex, vertex);
                if (WAYS.length === 0) {
                    vertex[bestVertex].bypass = 1;
                }
                if (WAYS.length > 0) {
                    const tempSurface = WAYS[0].split("-");
                    const lengthRoom = qSVG.areaRoom(vertex, tempSurface);
                    const bestArea = parseInt(lengthRoom);
                    for (const p of polygons) {
                        if (qSVG.arrayCompare(p.way, tempSurface, "pop")) {
                            vertex[bestVertex].bypass = 1;
                            break;
                        }
                    }

                    if (bestArea < 360) {
                        vertex[bestVertex].bypass = 1;
                    }
                    if (vertex[bestVertex].bypass === 0) {
                        // <-------- TO REVISE IMPORTANT !!!!!!!! bestArea Control ???
                        const realCoords = qSVG.polygonIntoWalls(
                            vertex,
                            tempSurface,
                            segment
                        );
                        const realArea = qSVG.area(realCoords.inside);
                        const outsideArea = qSVG.area(realCoords.outside);
                        const coords = [];
                        for (const t of tempSurface) {
                            coords.push({ x: vertex[t].x, y: vertex[t].y });
                        }
                        // WARNING -> FAKE
                        if (realCoords.inside.length !== realCoords.outside) {
                            polygons.push({
                                way: tempSurface,
                                coords: coords,
                                coordsOutside: realCoords.outside,
                                coordsInside: realCoords.inside,
                                area: realArea,
                                outsideArea: outsideArea,
                                realArea: bestArea,
                            });
                        } else {
                            // REAL INSIDE POLYGONE -> ROOM
                            polygons.push({
                                way: tempSurface,
                                coords: realCoords.inside,
                                coordsOutside: realCoords.outside,
                                area: realArea,
                                outsideArea: outsideArea,
                                realArea: bestArea,
                            });
                        }

                        // REMOVE FIRST POINT OF WAY ON CHILDS FIRST VERTEX
                        for (const [i, v] of vertex[
                            bestVertex
                        ].child.entries()) {
                            if (v.id === tempSurface[1]) {
                                vertex[bestVertex].child.splice(i, 1);
                            }
                        }

                        // REMOVE FIRST VERTEX OF WAY ON CHILDS SECOND VERTEX
                        for (const [i, v] of vertex[
                            tempSurface[1]
                        ].child.entries()) {
                            if (v.id === bestVertex) {
                                vertex[tempSurface[1]].child.splice(i, 1);
                            }
                        }
                        //REMOVE FILAMENTS ?????

                        let looping = 0;
                        do {
                            looping = 0;
                            for (const [aa, v] of vertex.entries()) {
                                if (v.child.length === 1) {
                                    looping = 1;
                                    v.child = [];
                                    for (const v2 of vertex) {
                                        // for (let ab = 0; ab < vertex.length; ab++) {
                                        // OR MAKE ONLY ON THE WAY tempSurface ?? BETTER ??
                                        for (const [
                                            ac,
                                            v2c,
                                        ] of v2.child.entries()) {
                                            if (v2c.id === aa) {
                                                v2.child.splice(ac, 1);
                                            }
                                        }
                                    }
                                }
                            }
                        } while (looping === 1);
                    }
                }
            }
            //SUB AREA(s) ON POLYGON CONTAINS OTHERS FREE POLYGONS (polygon without commonSideEdge)
            for (const [pp, p1] of polygons.entries()) {
                const inside = [];
                for (const [free, p2] of polygons.entries()) {
                    if (pp !== free) {
                        let found = true;
                        for (const c of p2.coords) {
                            found = qSVG.rayCasting(c, p1.coords);
                            if (!found) {
                                break;
                            }
                        }
                        if (found) {
                            inside.push(free);
                            p1.area = p1.area - p2.outsideArea;
                        }
                    }
                }
                p1.inside = inside;
            }
            return { polygons: polygons, vertex: vertex };
        },

        diffArray: function (arr1, arr2) {
            return arr1.concat(arr2).filter(function (val) {
                if (!(arr1.includes(val) && arr2.includes(val))) {
                    return val;
                }
            });
        },

        diffObjIntoArray: function (arr1, arr2) {
            let count = 0;
            for (let k = 0; k < arr1.length - 1; k++) {
                for (let n = 0; n < arr2.length - 1; n++) {
                    if (isObjectsEquals(arr1[k], arr2[n])) {
                        count++;
                    }
                }
            }
            let waiting = arr1.length - 1;
            if (waiting < arr2.length - 1) {
                waiting = arr2.length;
            }
            return waiting - count;
        },

        rayCasting: function (point, polygon) {
            const x = point.x;
            const y = point.y;
            let inside = false;
            for (
                let i = 0, j = polygon.length - 1;
                i < polygon.length;
                j = i++
            ) {
                const xi = polygon[i].x;
                const yi = polygon[i].y;
                const xj = polygon[j].x;
                const yj = polygon[j].y;
                const intersect =
                    yi > y !== yj > y &&
                    x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
                if (intersect) {
                    inside = !inside;
                }
            }
            return inside;
        },

        //polygon = [{x1,y1}, {x2,y2}, ...]
        polygonVisualCenter: function (room, allRooms) {
            const polygon = room.coords;
            const insideArray = room.inside;
            const sample = 80;
            const grid = [];
            //BOUNDING BOX OF POLYGON
            let minX, minY, maxX, maxY;
            for (const [i, p] of polygon.entries()) {
                minX = !i || p.x < minX ? p.x : minX;
                minY = !i || p.y < minY ? p.y : minY;
                maxX = !i || p.x > maxX ? p.x : maxX;
                maxY = !i || p.y > maxY ? p.y : maxY;
            }
            const width = maxX - minX;
            const height = maxY - minY;
            //INIT GRID
            const sampleWidth = Math.floor(width / sample);
            const sampleHeight = Math.floor(height / sample);
            for (let hh = 0; hh < sample; hh++) {
                for (let ww = 0; ww < sample; ww++) {
                    const posX = minX + ww * sampleWidth;
                    const posY = minY + hh * sampleHeight;
                    if (qSVG.rayCasting({ x: posX, y: posY }, polygon)) {
                        let found = true;
                        for (let i of insideArray) {
                            if (
                                qSVG.rayCasting(
                                    { x: posX, y: posY },
                                    allRooms[i].coordsOutside
                                )
                            ) {
                                found = false;
                                break;
                            }
                        }
                        if (found) {
                            grid.push({ x: posX, y: posY });
                        }
                    }
                }
            }
            let bestRange = 0;
            let bestMatrix;

            for (const matrix of grid) {
                let minDistance = Infinity;
                for (let pp = 0; pp < polygon.length - 1; pp++) {
                    const scanDistance = qSVG.pDistance(
                        matrix,
                        polygon[pp],
                        polygon[pp + 1]
                    );
                    if (scanDistance.distance < minDistance) {
                        minDistance = scanDistance.distance;
                    }
                }
                if (minDistance > bestRange) {
                    bestMatrix = matrix;
                    bestRange = minDistance;
                }
            }
            return bestMatrix;
        },

        textOnDiv: function (label, pos, styled, div) {
            if (typeof pos !== "undefined") {
                const text = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "text"
                );
                text.setAttributeNS(null, "x", pos.x);
                text.setAttributeNS(null, "y", pos.y);
                text.setAttribute(
                    "style",
                    `fill:${styled.color};font-weight:${styled.fontWeight};font-size:${styled.fontSize}`
                );
                text.setAttributeNS(null, "text-anchor", "middle");
                text.textContent = label;
                document.getElementById(div).appendChild(text);
            }
        },
    };

    return qSVG;
};
