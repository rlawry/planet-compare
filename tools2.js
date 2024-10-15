// const canvas = document.getElementById("space");
// requestAnimationFrame(renderLoop);
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// ctx.lineCap = "round";
// var frameCount = 0, startTime, prevTimeScale = timeScale.value, lastTime;
// const W = canvas.width, H = canvas.height, CX = W * 0.25, CY = H * 0.5;

// const sunRad = 20, SR = sunRad;               // in pixels
// const planetScale = 0.4, PS = planetScale;          // in sun radi
// const FIRST_PLANET_DIST = 8, FPD = FIRST_PLANET_DIST; // in sun radi
// const ECCENTRICITY = 0.2, E = ECCENTRICITY;           // 0 circlular
// const KEPLER_PERIOD = 1000, KP = KEPLER_PERIOD;       // ms per orbit

// const MBLUR_LINE_GRAD = 0.01; // Steps to grade blur line
// const FRAME_RATE = 60; // Max 60 Frames per second. Only use valid values
//                        // Valid vals 60, 30, 20, 15, 12, 10, 6, 5, 4, 3, 2, 1
// const FRAME_SKIP = 60 / FRAME_RATE;
// Math.TAU = Math.PI * 2;
// Math.R90 = Math.PI * 0.5;


// const calcVectors = (A, B) => {
//     const dx = B.x - A.x;
//     const dy = B.y - A.y;
//     const rSqr = dx * dx + dy * dy, r = rSqr ** 0.5;    
//     const nx = dx / r;
//     const ny = dy / r;
//     return {nx, ny, rSqr, r, axis: Math.Math.atan2(ny, nx)};
// }
// const eccentricAnomaly = (M, e) => {  // newtons method to solve M = E-e sin(E) for E
//     var d, E = M; // guess E
//     do {
//         d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
//         E -= d;
//     } while (d > 1e-6);
//     return E;
// }


// const Planet = {
//     x:  0, y:  0, vx: 0, vy: 0, ox: 0, oy: 0,
//     init() { return this }, 
//     update() { },
//     draw(ctx) {
//         const planet = this;
//         const dx = planet.ox - planet.x;
//         const dy = planet.oy - planet.y;
//         const dist = (dx * dx + dy * dy) ** 0.5;    
//         ctx.setTransform(1, 0, 0, 1, CX + planet.x, CY + planet.y);
//         ctx.fillStyle = ctx.strokeStyle = planet.col;

//         ctx.beginPath();  
//         ctx.arc(dx / 2, dy / 2, planet.radius, 0, Math.TAU);
//         ctx.fill();


//         ctx.globalAlpha = 1;
//         planet.ox = planet.x;
//         planet.oy = planet.y;
//     }, 
// };
// const KeplerPlanet = {
//     period: 1,
//     init(e, B) {  // B at relative position at time 0. A is at apoapsis        
//         const A = this;
//         A.period =  Math.TAU / A.period;
//         A.e = e;
//         Object.assign(A, calcVectors(A, B)); 
//         A.px = Math.cos(A.axis); // Transform to Rotate semi major axis
//         A.py = Math.sin(A.axis);
//         return A;
//     },
//     update(time) {
//         const A = this;
//         const E = eccentricAnomaly(A.period * time, A.e);
//         const x = A.r * (Math.cos(E) - A.e);
//         const y = A.r * Math.sin(E) * (1 - A.e ** 2) ** 0.5;   
//         A.x = x * A.px - y * A.py;
//         A.y = x * A.py + y * A.px;
//     },    
// };
// const FixedPlanet = {
//     radius: 0,
//     col: "#EC8",
// };

// function createOrbitObj(type, x, y, radius, col, period, e, orbits) {
//     return  ({...Planet, ...type, x, y, ox: x, oy: y, period, radius, col }).init(e, orbits);
// }
// const sun = createOrbitObj(FixedPlanet , 0, 0, SR, "#FF8");
// const p1 = createOrbitObj(KeplerPlanet,  FPD * SR * 2, 0, SR * PS, "#6C1", KP, 0.6, sun);
// const p9 = createOrbitObj(KeplerPlanet,  FPD * SR * 2, 0, SR * PS, "#C61", KP * 2, 0.2, sun);

// const system = Object.assign([sun ,p1, p9], {      
//     update(time) { 
//         var i = this.length - 1;
//         while (i) { this[i--].update(time) }
//     },      
//     draw(ctx) {
//         for (const A of this) { A.draw(ctx) }
//     },
// });

// function renderLoop(time) {
//     var tT, i, pTS = prevTimeScale; // tT is totalTime
//     if (frameCount++ % FRAME_SKIP === 0) {
//         startTime = startTime ?? time;
//         tT = time - startTime;

//         ctx.setTransform(1, 0, 0, 1, 0, 0);
//         //ctx.clearRect(0, 0, W, H);

//         const inputTimeScale = timeScale.value;
//         if (inputTimeScale !== pTS) {
//             startTime = time - tT * pTS / inputTimeScale;
//             pTS = prevTimeScale = inputTimeScale;
//             tT = time - startTime;
//         }
//         const dT = tT * pTS - lastTime; // delta time
//         i = 0;
//         while (i < MBLUR_LINE_GRAD && lastTime) {
//              const current = lastTime + dT * (i++ / MBLUR_LINE_GRAD);
//              system.update(current);
//              system.draw(ctx, false);
//         }
        
//         system.update(tT * pTS);
//         system.draw(ctx, true);
        
//         lastTime = tT * pTS;
//     }
//     requestAnimationFrame(renderLoop);
// }

// function drawEllipse(x,y,xRad,yRad){
//     c = Math.Math.sqrt(Math.abs(xRad*xRad-yRad*yRad));
//     //sun.x=center.x+c;
//     ctx.moveTo(x,y);
//     ctx.save();
//     //ctx.fillStyle = color;
//     ctx.strokeStyle = "white";
//     ctx.shadowColor = '#000';
//     ctx.shadowBlur = 20;
//     ctx.shadowOffsetX = 5;
//     ctx.shadowOffsetY = 5;
//     ctx.beginPath();
//     ctx.ellipse(x-c,y,xRad,yRad,Math.PI/2,0,2*Math.PI);
//     ctx.closePath();
//     //ctx.fill();
//     ctx.stroke();
//     eccentricity = c/yRad;
//     document.getElementById("message").innerHTML = "eccentricity: " + eccentricity.toFixed(3);
//     ctx.restore();
//     sun.x = center.x;
//     sun.y = center.y;
//     drawSun(sun);
//     if(checkState){
//         drawX(c,x,y);
//     }

// }

/*******************************************************
 * The ellipical orbit of a planet around the sun is
 * defined a focal point (grey circle).
 * 
 * Mouse-over any parameter for more information.
 * Click and drag the sun or focus.
 * 
 * How does moving this point change the parameters of
 * the orbit?
 * 
 * How does the peroid change as the ellipse changes
 * 
 * Spacebar = pause
********************************************************/
var canvas = document.getElementById("space");
var ctx = canvas.getContext("2d");
var standardGravity = 6;   // GM in m^3 / s^2
// Colours
var BACKGROUND = "rgb(0, 0, 0)";
var ORBITER = "rgba(120, 80, 255, 1)";
var ORBITER_T = "rgb(120, 80, 255, 0)";

var fadePoints, areaPoints;
var fadeGap = 5;
var maxPoints = 84;
var maxArea = 5;
var a = 115;
var t = 0;

// Menu positioning
var menuX = 56;
var menuDX = 144;
var menuY = 411;
var menuDY = 18;

var selected = false;
var mouseEvents = false;

var angle = 0;
var locus1, locus2, centre, a, b, orbx, orby;
var foci_dist, eccentricity, area, period, velocity;
var foci_angle = 0;

function updateLoci() {
    t = 0;
    fadePoints = [];
    areaPoints = [];

    foci_dist = dist(locus1.x, locus1.y, locus2.x, locus2.y);
    foci_angle = Math.atan2(locus2.y - locus1.y, locus2.x - locus1.x);
    centre = {
        x: (locus1.x + locus2.x) / 2,
        y: (locus1.y + locus2.y) / 2
    };

    b = Math.sqrt(a * a - foci_dist * foci_dist / 4);
    area = Math.PI * a * b;
    eccentricity = foci_dist / (2 * a);
    period = Math.sqrt(a * a * a / standardGravity);

    orbx = centre.x + a * Math.cos(foci_angle);
    orby = centre.y + b * Math.sin(foci_angle);
}

class Locus {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        var c2 = "rgba(255,255,255,0.5)";
        var c = c;
    }
    draw() {
        ctx.fillSyle = this.c;
        if (this.isSelected()) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = c2;
        } else {
            noStroke();
        }
        ellipse(this.x, this.y, this.r, this.r);
    }

    isSelected() {
        
        if (dist(this.x, this.y, mouseX, mouseY) < this.r) {
            return true;
        }
    }

    drag() {
        var temp_x = this.x;
        var temp_y = this.y;
        this.x = mouseX;
        this.y = mouseY;

        if (dist(locus1.x, locus1.y, locus2.x, locus2.y) >= a * 2) {
            // Loci further apart than string so undo
            this.x = temp_x;
            this.y = temp_y;
        } else {
            updateLoci();
        }
    }
}

/**************************************************
 *              Helper functions
**************************************************/
function triangleArea(x1, y1, x2, y2, x3, y3) {
    return abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2;
}

function getArea() {
    var triArea = 0;
    for (var i = 1; i < areaPoints.length; i++) {
        triArea += triangleArea(locus1.x, locus1.y,
            areaPoints[i - 1][0], areaPoints[i - 1][1],
            areaPoints[i][0], areaPoints[i][1]);
    }
    return round(triArea);
}

function getEccentricity() {
    return round(1000 * eccentricity) / 1000;
}

function getPeriod() {
    return round(period / 3) / 10;
}

function getSpeed() {
    return round(300 * velocity) / 10;
}

function getSunDist() {
    return round(dist(locus1.x, locus1.y, orbx, orby));
}

function getCentre() { return centre; }
function getSun() { return locus1; }
function getLatus() {
    var r = b * b / a;
    var x = locus1.x + r * Math.cos(foci_angle + 90);
    var y = locus1.y + r * Math.sin(foci_angle + 90);
    return { x: x, y: y };
}

function changeFocalDist(x) {
    if (x < 0 || foci_dist / 2 + 1 < a) {
        locus1.x -= x * Math.cos(foci_angle);
        locus1.y -= x * Math.sin(foci_angle);
        locus2.x += x * Math.cos(foci_angle);
        locus2.y += x * Math.sin(foci_angle);
    }
}

function changePerhelion(x) {
    if (x < 0 || foci_dist > 1) {
        locus2.x -= x * Math.cos(foci_angle);
        locus2.y -= x * Math.sin(foci_angle);
    }
}

function changeAperhelion(x) {
    if (x > 0 || foci_dist > 1) {
        locus2.x += x * Math.cos(foci_angle);
        locus2.y += x * Math.sin(foci_angle);
    }
}

function changeLatusRectum(x) {
    if (x > 0 || b * b / a > 1) {
        b += x;
        a = Math.sqrt(b * b + foci_dist * foci_dist / 4);
    }
}

function semi_major() {
    return {
        x: centre.x + a * Math.cos(foci_angle),
        y: centre.y + a * Math.sin(foci_angle)
    };
}

function semi_major_opp() {
    return {
        x: centre.x - a * Math.cos(foci_angle),
        y: centre.y - a * Math.sin(foci_angle)
    };
}

function semi_minor() {
    return {
        x: centre.x + b * Math.cos(foci_angle - 90),
        y: centre.y + b * Math.sin(foci_angle - 90)
    };
}

class Parameter {
    constructor(name, f1, f2, desc) {
        this.name = name;
        this.f1 = f1;
        this.f2 = f2;
        this.desc = desc;
    }
    draw() {
        var coord1 = this.f1();
        var coord2 = this.f2();
        line(coord1.x, coord1.y, coord2.x, coord2.y);
    }
    value() {
        var coord1 = this.f1();
        var coord2 = this.f2();
        return round(dist(coord1.x, coord1.y, coord2.x, coord2.y));
    }
}

class Property {
    constructor(name, f, units, desc) {
        this.name = name;
        this.units = units;
        this.desc = desc;
        this.value = f;
    }
}

class Arrow {
    constructor(x, y, f) {
        this.x = x;
        this.y = y;
        var dx = 14;
    }
    draw() {
        var s = this.isSelected();

        if (s === 1) { ctx.fillSyle = "rgb(255, 0, 0)"; }
        else { ctx.fillSyle = "rgb(150,150,150)"; }
        triangle(this.x - dx, this.y + 5,
            this.x - dx, this.y - 5,
            this.x - dx - 8, this.y);

        if (s === 2) { ctx.fillSyle = "rgb(225, 0, 0)"; }
        else { ctx.fillSyle = "rgb(150,150,150)"; }
        triangle(this.x + dx, this.y + 5,
            this.x + dx, this.y - 5,
            this.x + dx + 8, this.y);
    }

    isSelected(e) {
        if (mouseY < this.y + 5 && mouseY > this.y - 5 &&
            mouseX < this.x + dx + 8 && mouseX > this.x - dx - 8) {
            if (mouseX < this.x) {
                return 1;
            } else {
                return 2;
            }
        }
    }

    update() {
        var s = this.isSelected();
        if (s) {
            f(s * 2 - 3);
            updateLoci();
        }
    }
}

var locus1 = new Locus(110, 100, 16, "rgb(247, 222, 59)");
var locus2 = new Locus(290, 160, 10, "rgb(128, 128, 128)");
updateLoci();

var params = [
    new Parameter("Semi-major axis", getCentre, semi_major, "Half the longest axis"),
    new Parameter("Semi-minor axis", getCentre, semi_minor, "Half the shortest axis"),
    new Parameter("Focal distance", getCentre, getSun, "Distance between sun and ellipse center (linear eccentricity)"),
    new Parameter("Perihelion", getSun, semi_major_opp, "Closest point to the sun"),
    new Parameter("Aperihelion", getSun, semi_major, "Furthest point from the sun"),
    new Parameter("Semi-latus rectum", getSun, getLatus, "Half the chord through a focus parallel to the major axis")
];

var arrows = [];
var updateFuncs = [
    function(x) { if (a + x > foci_dist/2) { a += x; }},
    function(x) { b += x; a = Math.sqrt(b * b + foci_dist * foci_dist/4);},
    changeFocalDist,
    changePerhelion,
    changeAperhelion,
    changeLatusRectum
];

for (var i=0; i<params.length; i++) {
    arrows.push(new Arrow(menuX + menuDX, menuY + menuDY*i, updateFuncs[i]));
}

var properties = [
    new Property("Eccentricity", getEccentricity, "", "How stretched the ellipse is"),
    new Property("Period", getPeriod, "seconds", "How long a complete orbit takes"),
    new Property("Speed", getSpeed, "pixels/second", "How fast the orbiting body is currently moving"),
    new Property("Orbit distance", getSunDist, "pixels", "Current distance from the sun"),
    new Property("Sweep area", getArea, "pixels²", "Area covered in a set period of time")
];

var selectables = [locus1, locus2];
var running = true;

function drawEllipseParameters() {
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.lineWidth = 1;
    for (var i = 0; i < params.length; i++) {
        if (params[i].highlighted) {
            params[i].draw();
        }
    }

}

/**************************************************
 *                 Menu Box
**************************************************/

function drawTextBox() {    
    ctx.strokeStyle = "rgb(50,50,50)";
    ctx.lineWidth = 1;
    ctx.fillSyle = "rgba(0, 0, 0, 1)";
    rect(menuX-10, menuY-12, 372, params.length*menuDY-20);
    
    // Parameters with arrows
    ctx.font = "13px Arial";    
    for (var i=0; i<params.length-3; i++) {
        textAlign(LEFT, CENTER);
        if (params[i].highlighted) {
            ctx.fillSyle = "rgb(250,250,250)";
            text(params[i].desc, menuX-5, 388);
        } else {
            ctx.fillSyle = "rgb(100,100,100)";
        }
        
        text(params[i].name + ": ", menuX, menuY+menuDY*i);
        textAlign(CENTER, CENTER);
        text(params[i].value(), menuX+menuDX, menuY+menuDY*i);
        
        arrows[i].draw();
    }
    
    // Properties
    textAlign(LEFT, CENTER);
    var dx = 193;
    for (var i=0; i<properties.length-1; i++) {
        
        if (properties[i].highlighted) {
            ctx.fillSyle = "rgb(250,250,250)";
            text(properties[i].desc, menuX-5, 388);
        } else {
            ctx.fillSyle = "rgb(100,100,100)";
        }
        
        var txt = properties[i].name + ": ";
        txt += properties[i].value();
        txt += " " + properties[i].units;
        text(txt, menuX + dx, menuY + menuDY*i);
    }
};

function drawDirectrix() {
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.lineWidth = 1;
    var d = 2 * a * a / foci_dist;
    var dx = centre.x + d * Math.cos(foci_angle);
    var dy = centre.y + d * Math.sin(foci_angle);
    line(dx + b * Math.cos(foci_angle + 90),
        dy + b * Math.sin(foci_angle + 90),
        dx + b * Math.cos(foci_angle - 90),
        dy + b * Math.sin(foci_angle - 90));
}

function moveOrbiter() {
    var r = Math.max(a, b) * (1 - eccentricity * eccentricity) /
        (1 - eccentricity * Math.cos(angle));
    angle += 360 * a * b / (period * r * r);

    var ct = Math.cos(angle);
    var st = Math.sin(angle);
    var cp = Math.cos(foci_angle);
    var sp = Math.sin(foci_angle);

    var x1 = r * ct - foci_dist / 2;
    var y1 = r * st;
    var x = centre.x + x1 * cp - y1 * sp;
    var y = centre.y + x1 * sp + y1 * cp;

    velocity = dist(orbx, orby, x, y);
    //println(Math.sqrt(speed*(2/r - 1/a)));
    orbx = x;
    orby = y;
}


function draw() {
    // Move point based on angle around and rotation of ellipse
    background(BACKGROUND);

    if (mouseEvents) {
        mouseEvents.update();
    }

    if (running) {
        moveOrbiter();

        t++;
        if (t % fadeGap === 0) {
            fadePoints.push([orbx, orby]);
            if (fadePoints.length > maxPoints) {
                fadePoints.shift();
            }
        }

        areaPoints.push([orbx, orby]);
        if (areaPoints.length > maxArea) {
            areaPoints.shift();
        }
    }

    // Background ellipse
    ctx.strokeStyle = "rgb(50,50,50)";
    ctx.lineWidth = 1;
    ctx.fillSyle = lerpAColor(ORBITER, ORBITER_T, 0.8);
    ctx.save();
    ctx.translate(centre.x, centre.y);
    ctx.rotate(foci_angle);
    ellipse(0, 0, a * 2, b * 2);
    ctx.restore();

    drawEllipseParameters();
    locus1.draw();
    locus2.draw();

    // Orbit
    noStroke();
    for (var i = 0; i < fadePoints.length; i++) {
        ctx.fillSyle = lerpAColor(ORBITER_T, ORBITER, i / (fadePoints.length));
        ellipse(fadePoints[i][0], fadePoints[i][1], 8, 8);
    }

    // Should make these a property function
    ctx.lineWidth = 1;
    if (properties[3].highlighted) {
        ctx.strokeStyle = "rgb(255,255,255)";
        line(orbx, orby, locus1.x, locus1.y);
    }

    // Sweep area
    noStroke();
    if (properties[4].highlighted) {
        ctx.fillSyle = "rgb(247, 222, 59)";
        var n = areaPoints.length - 1;
        triangle(locus1.x, locus1.y,
            areaPoints[0][0], areaPoints[0][1],
            areaPoints[n][0], areaPoints[n][1]);
    }

    //drawDirectrix();
    ctx.strokeStyle = "rgb(50,50,50)";
    ctx.fillSyle = ORBITER;
    ellipse(orbx, orby, 8, 8);

    drawTextBox();
}

function mousePressed(e) {
    let mouseEvents = e;
    for (var i in selectables) {
        if (selectables[i].isSelected(mouseEvents)) {
            selected = selectables[i];
        }
    }
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].isSelected(mouseEvents)) {
            mouseEvents = arrows[i];
        }
    }
}

function mouseReleased() {
    selected = false;
    mouseEvents = false;
}


function mouseMoved(e) {
    for (var i = params.length - 1; i >= 0; i--) {
        params[i].highlighted = false;
    }
    for (var i = properties.length - 1; i >= 0; i--) {
        properties[i].highlighted = false;
    }

    if (e.y > menuY - menuDY + 10) {
        if (e.x < menuX + menuDX + 30) {
            for (var i = params.length - 1; i >= 0; i--) {
                if (e.y > menuY + i * menuDY - 10) {
                    params[i].highlighted = true;
                    break;
                }
            }
        } else {
            for (var i = properties.length - 1; i >= 0; i--) {
                if (e.y > menuY + i * menuDY - 10) {
                    properties[i].highlighted = true;
                    break;
                }
            }
        }
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}
window.onload = function(){
    var dragStart, dragEnd, drag = false;
    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e);
        dragStart = {
            x: e.pageX - canvas.offsetLeft,
            y: e.pageY - canvas.offsetTop
          }
        drag = true;
    });

    canvas.addEventListener('mouseUp'), function() {
        drag = false;
        mouseReleased();
    }

    canvas.addEventListener('mousemove', function(event) {
        if (drag) {
            dragEnd = {
                x: event.pageX - canvas.offsetLeft,
                y: event.pageY - canvas.offsetTop
            }
            //context.translate(dragEnd.x - dragStart.x, dragEnd.y - dragStart.y);
            dragStart = dragEnd;
            mouseMoved(dragEnd);
        }
    });
}

function background(color){
    ctx.fillStyle = color;
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

function lerpColor(color1,color2){
    let rgb1 = color1;

    rgb1 = rgb1.replace(/[^\d,]/g, '').split(',');

    let rgb2 = color2;

    rgb2 = rgb2.replace(/[^\d,]/g, '').split(',');

    let red = (parseInt(rgb1[0])+parseInt(rgb2[0]))/2;
    let green = (parseInt(rgb1[1])+parseInt(rgb2[1]))/2;
    let blue = (parseInt(rgb1[2])+parseInt(rgb2[2]))/2;

    return "rgb("+red+", "+green+", "+blue+")";
}

function lerpAColor(color1,color2, alpha){
    let rgb1 = color1;

    rgb1 = rgb1.replace(/[^\d,]/g, '').split(',');

    let rgb2 = color2;

    rgb2 = rgb2.replace(/[^\d,]/g, '').split(',');

    let red = (parseInt(rgb1[0])+parseInt(rgb2[0]))/2;
    let green = (parseInt(rgb1[1])+parseInt(rgb2[1]))/2;
    let blue = (parseInt(rgb1[2])+parseInt(rgb2[2]))/2;

    return "rgba("+red+", "+green+", "+blue+", "+alpha+")";
}

var mouseDragged = function() {
    if (selected) {
        selected.drag();
    }
};
var keyPressed = function() {
    // Spacebar toggles animation
    if (keyCode === 32) { running = !running; }
};

ctx.strokeStyle = "red";
// extra text
ctx.fillStyle = "rgb(255, 138, 138)";
ctx.fillSyle = "rgb(255,255,255)";
text('kjslfjksfsdfsdfsfdsfdls',210,131);

function text(string,x,y){
    ctx.font = "13px Arial";
    ctx.fillText(string,x,y);
}

function ellipse(x,y,xRad,yRad){
    ctx.beginPath();
    ctx.ellipse(x,y,xRad,yRad,10,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function drawLine(x1,y1,x2,y2){
    //drawEndPoint(from);
    //drawEndPoint(to);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();
}

function rect(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.rect(x1,y1,x2,y2);
    ctx.stroke();
    ctx.closePath();
}

function dist(x1,y1,x2,y2){
    return ((Math.abs(x2-x1))**2+(Math.abs(y2-y1))**2)**0.5;
}

draw();