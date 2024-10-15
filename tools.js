const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var tmpCanvas = document.createElement('canvas'),
tmpCtx = tmpCanvas.getContext('2d');
var img;

var planets = [
    ["Mercury", 4879, "#708090",0.206],
    ["Venus", 12104, "#c18f17",0.007],
    ["Earth", 12759, "#129f93",0.017],
    ["Mars", 6794, "#c1440e",0.093],
    ["Jupiter",142984, "#c99039",0.048],
    ["Saturn",120536, "#ceb8b8",0.054],
    ["Uranus",51118,"#afdbf5",0.047],
    ["Neptune",49528,"#3d5ef9",0.009]
]
var testRadius = 100;
var testDiameter = testRadius*2;
var checkState = false;

function drawBackground(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
}

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

var center = new Point(canvas.clientWidth/2,canvas.clientHeight/2);

function drawTestPlanet(rad,color){
    ctx.moveTo(center.x/2,center.y);
    ctx.fillStyle = color;
    ctx.strokeStyle = "purple";
    ctx.beginPath();
    ctx.arc(center.x+canvas.width/8,center.y,rad,0,2*Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

var baseRadius = 80;
var baseDiameter = 2*baseRadius;

// function drawBasePlanet(color){
//     ctx.moveTo(center.x/2,center.y);
//     ctx.save();
//     ctx.fillStyle = color;
//     ctx.strokeStyle = "purple";
//     ctx.shadowColor = '#000';
//     ctx.shadowBlur = 20;
//     ctx.shadowOffsetX = 5;
//     ctx.shadowOffsetY = 5;
//     ctx.beginPath();
//     ctx.ellipse(center.x-center.x/4,center.y,20,25,Math.PI/2,0,2*Math.PI);
//     ctx.closePath();
//     //ctx.fill();
//     ctx.stroke();
//     ctx.restore();
// }

function drawLine(from,to){
    //drawEndPoint(from);
    //drawEndPoint(to);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(from.x,from.y);
    ctx.lineTo(to.x,to.y);
    ctx.closePath();
    ctx.stroke();
}

var emptyPos = new Point(canvas.width,canvas.height);
var xDim = 10;

function drawX(c,x,y){
    emptyPos.x = x-2*c;
    emptyPos.y = y;
    
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x-2*c+xDim,y+xDim);
    ctx.lineTo(x-2*c-xDim,y-xDim);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x-2*c+xDim,y-xDim);
    ctx.lineTo(x-2*c-xDim,y+xDim);
    ctx.closePath();
    ctx.stroke();
}

var sun = new Point(center.x,center.y);
var c = 0;
var eccentricity = 0;
var ratio;
var startXRad = 300;
var startYRad = 301;
startGame();

function drawSun(pos){
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "white";
    ctx.moveTo(pos.x,pos.y);
    ctx.beginPath();
    ctx.arc(pos.x,pos.y,10,0,2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    //console.log("We drew it somewhere");
}

function drawPlanet(pos){
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "white";
    ctx.moveTo(pos.x,pos.y);
    ctx.beginPath();
    ctx.arc(pos.x,pos.y,6,0,2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    //console.log("We drew it somewhere");
}


function bumpGame(deltX,deltY){
    startXRad += deltX;
    startYRad += deltY;
    if(startXRad > startYRad && !down){
        startYRad = startXRad;
    }
    else if(startYRad < startXRad && down){
        startXRad = startYRad;
    }
    drawBackground();
    drawEllipse(center.x,center.y,startXRad,startYRad);
    console.log(startXRad + " xrad, " + startYRad + " yrad");
}

var down = false;
var smooth = [0.01,0.1,1];
var selector = 0;

document.getElementById("space").addEventListener("wheel",function changePlanet(event){
    
    if(Math.abs(startYRad-startXRad)==0){
        selector = 2;
    }
    else if(Math.abs(startYRad-startXRad)<0.5){
        selector = 0;
    }
    updateRatio();
});

function updateRatio(){
    ratio = testRadius/baseRadius;
    if(ratio>1){
        document.getElementById("ratio").innerHTML = testPlanet[0] + " is " + ratio.toFixed(2) + " times bigger than " + planet[0] + "?";
    }
    else{
        selector = 2;
    }
    if(event.shiftKey){
        if(event.deltaY>0){
            down = false;
            if(Math.abs(startYRad-startXRad)==0){selector=2;}
            bumpGame(smooth[selector],0);
        }
        else if(event.deltaY<0){
            down = true;
            if(Math.abs(startYRad-startXRad)==0){selector=0;}
            bumpGame(-1*smooth[selector],0);
        }
    }   
    else{
        if(event.deltaY>0){
            down = false;
            if(Math.abs(startYRad-startXRad)==0){selector=0;}
            bumpGame(0,smooth[selector]);
        }
        else if(event.deltaY<0){
            down = true;
            if(Math.abs(startYRad-startXRad)==0){selector=2;}
            bumpGame(0,-1*smooth[selector]);
        }
    }
}

var planet;
var testPlanet;
var trueRatio;

function startGame(){
    drawBackground();
    drawEllipse(center.x,center.y,startXRad,startYRad);
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center.x = canvas.width/2;
    center.y = canvas.height/2;
    bumpGame(0,0);
}, true);

var correctArray = [];
var incorrectArray = [];

var lastClick = 0;

function loadArrays() {   
    correctArray.push(new Audio("correct8.mp3"));                        
    incorrectArray.push(new Audio("incorrect.mp3"));
    incorrectArray.push(new Audio("incorrect13.mp3"));      
}
loadArrays();

function score(){
    console.log(ratio.toFixed(2) + "test ratio and " + trueRatio.toFixed(2)+ " actual ratio");
    var testRatio = ratio.toFixed(2);
    var realRatio = trueRatio.toFixed(2);
    var d = new Date();
    var t = d.getTime();
    console.log(trueRatio + " true ratio" + testRatio + " testRatio" + (parseFloat(trueRatio) + 0.02) + " plus 0.02");
    if(t-lastClick>1000){
        if (testRatio==realRatio){
                //document.getElementById("message").innerHTML = "Correct in " + tries + " tries.";
                document.getElementById("submit").classList.add("flashcorrect");
                document.getElementById("message").innerHTML = "Good job!  Next round";
                var rightSound = Math.floor(Math.random()*correctArray.length);
                correctArray[rightSound].currentTime = 0;
                correctArray[rightSound].play();
                delay(correctArray[rightSound].duration*1000).then(() => {
                    document.getElementById("stars").innerHTML += "&#9733";
                    startGame()
                });
                console.log(correctArray[rightSound].duration+ " duration");                
        }
        
        else if(testRatio<=(parseFloat(realRatio)+0.02)&&(testRatio>=(parseFloat(realRatio)-0.02))){
            document.getElementById("message").innerHTML = "Close.  Check your rounding.";
            var wrongSound = Math.floor(Math.random()*incorrectArray.length);
            incorrectArray[wrongSound].currentTime = 0;
            incorrectArray[wrongSound].play();
            document.getElementById("submit").classList.add("flashwrong");
        }
        else{
            document.getElementById("message").innerHTML = "Try again.  Use Shift to smooth out your scaling.  You may also use the arrow keys.";
            var wrongSound = Math.floor(Math.random()*incorrectArray.length);
            incorrectArray[wrongSound].currentTime = 0;
            incorrectArray[wrongSound].play();
            document.getElementById("submit").classList.add("flashwrong");
        }
        lastClick = t;
    }

// function addListenForClear(){
//     var place = document.getElementById("submit");
//     var clearIt = function() {
//        place.classList.remove("flashwrong");
//        place.classList.remove("flashcorrect");
//     };
//     place.addEventListener("animationend",clearIt);
// }

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

var planets = []
planets.push(new Point(0,0));
var hw = canvas.width/2;
var hh = canvas.height/2;
//ctx.transform(1, 0, 0, -1, hw, hh);
// Ellipse dimension
var semiMaj = startYRad;		// Semi major axis
var semiMin = startXRad;		// Semi minor axis

var widthBoundary = semiMaj-.001;	// Boundary for a
var sign = 1;			// Sign of y co-ordinate
var xi = -widthBoundary;		// x index
var ellipseX, ellipseY;			// x and y coordinate on ellipse
var velX = 0;			// x component of orbital velocity
var gravity = 1;			// Gravitional parameter (M*6.67e-11)
var orbPeriod = 2 * Math.PI * semiMaj**1.5 / gravity**0.5;		// Orbital period
var timeSlice = orbPeriod / 1000;								// A slice of time

var sqrtGuts;

function next() {
	window.requestAnimationFrame(next);
    drawBackground();
    drawEllipse(center.x,center.y,startXRad,startYRad);
    orbPeriod = 2 * Math.PI * semiMaj**1.5 / gravity**0.5;		// Orbital period
    timeSlice = orbPeriod / 1000;       // A slice of time
    								
    console.log(timeSlice + " timeSlice");

    semiMaj = startYRad;		// Semi major axis
    semiMin = startXRad;		// Semi minor axis
    widthBoundary = semiMaj-.001;

    console.log(xi + " xi before");

	ctx.fillStyle = "skyblue";

    console.log(ellipseX + " ellipseX before");

	ellipseX = xi + velX * timeSlice;

    console.log(ellipseX + " ellipseX after mult" + xi + " xi piece" + velX + " velX piece" + timeSlice + " timeSlice");
	if(sign*ellipseX > widthBoundary) {
		ellipseX = sign*widthBoundary;

        console.log(ellipseX + " ellipseX after if");

		sign = -sign;
	}
    sqrtGuts = 1 - ellipseX*ellipseX/semiMaj/semiMaj;
    if((sqrtGuts)<0){
        sqrtGuts = 0;
    }
	ellipseY = sign*semiMin * (sqrtGuts)**0.5;
    console.log(ellipseY + " ellipseY after if");
	velX = ellipseY/semiMin * (gravity*semiMaj/((ellipseX - c)**2 + ellipseY*ellipseY))**0.5;
	xi = ellipseX;

    console.log(velX + " velX before go round");

    planets[0].x = ellipseX+center.x-c;
    planets[0].y = ellipseY+center.y;
    drawPlanet(planets[0]);
}
next();

function drawEllipse(x,y,xRad,yRad){
    c = Math.sqrt(Math.abs(xRad*xRad-yRad*yRad));
    //sun.x=center.x+c;
    ctx.moveTo(x,y);
    ctx.save();
    //ctx.fillStyle = color;
    ctx.strokeStyle = "white";
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.beginPath();
    ctx.ellipse(x-c,y,xRad,yRad,Math.PI/2,0,2*Math.PI);
    ctx.closePath();
    //ctx.fill();
    ctx.stroke();
    eccentricity = c/yRad;
    document.getElementById("message").innerHTML = "eccentricity: " + eccentricity.toFixed(3);
    ctx.restore();
    sun.x = center.x;
    sun.y = center.y;
    drawSun(sun);
    if(checkState){
        drawX(c,x,y);
    }

}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        bumpGame(testRadius+=0.1);
        updateRatio();
    }
    else if (e.keyCode == '40') {
        bumpGame(testRadius-=0.1);
        updateRatio();
    }

}
