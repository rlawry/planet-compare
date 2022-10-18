const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var tmpCanvas = document.createElement('canvas'),
tmpCtx = tmpCanvas.getContext('2d');
var img;

var planets = [
    ["Mercury", 4879, "#708090"],
    ["Venus", 12104, "#c18f17"],
    ["Earth", 12759, "#129f93"],
    ["Mars", 6794, "#c1440e"],
    ["Jupiter",142984, "#c99039"],
    ["Saturn",120536, "#ceb8b8"],
    ["Uranus",51118,"#afdbf5"],
    ["Neptune",49528,"#3d5ef9"]
]
var testRadius = 100;

function drawBackground(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
}

// function loadImage (src) {
//     var deferred = when.defer(),
//         img = document.createElement('img');
//     img.onload = function () { 
//         deferred.resolve(img); 
//     };
//     img.onerror = function () { 
//         deferred.reject(new Error('Image not found: ' + src));
//     };
//     img.src = src;

//     // Return only the promise, so that the caller cannot
//     // resolve, reject, or otherwise muck with the original deferred.
//     return deferred.promise;
// }

// function loadImages(srcs) {
//     // srcs = array of image src urls

//     // Array to hold deferred for each image being loaded
//     var deferreds = [];

//     // Call loadImage for each src, and push the returned deferred
//     // onto the deferreds array
//     for(var i = 0, len = srcs.length; i < len; i++) {
//         deferreds.push(loadImage(srcs[i]));

//         // NOTE: We could push only the promise, but since this array never
//         // leaves the loadImages function, it's ok to push the whole
//         // deferred.  No one can gain access to them.
//         // However, if this array were exposed (e.g. via return value),
//         // it would be better to push only the promise.
//     }

//     // Return a new promise that will resolve only when all the
//     // promises in deferreds have resolved.
//     // NOTE: when.all returns only a promise, not a deferred, so
//     // this is safe to expose to the caller.
//     return when.all(deferreds);
// }

// loadImages(imageSrcArray).then(
//     function gotEm(imageArray) {
//         doFancyStuffWithImages(imageArray);
//         return imageArray.length;
//     },
//     function doh(err) {
//         handleError(err);
//     }
// ).then(
//     function shout (count) {
//         // This will happen after gotEm() and count is the value
//         // returned by gotEm()
//         alert('see my new ' + count + ' images?');
//     }
// );

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

var center = new Point(canvas.width/2,canvas.height/2);

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

function drawBasePlanet(color){
    ctx.moveTo(center.x/2,center.y);
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = "purple";
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.beginPath();
    ctx.arc(center.x-center.x/4,center.y,baseRadius,0,2*Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawLine(from,to){
    drawEndPoint(from);
    drawEndPoint(to);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(from.x,from.y);
    ctx.lineTo(to.x,to.y);
    ctx.closePath();
    ctx.stroke();
}
var ratio;
startGame();


function drawEndPoint(pos){
    ctx.fillStyle = "white";
    ctx.strokeStyle = "blue";
    ctx.moveTo(pos.x,pos.y);
    ctx.beginPath();
    ctx.arc(pos.x,pos.y,10,0,2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function bumpGame(rad){
    if(rad<=0){
        rad = 1;
        testRadius = 1;
    }
    drawBackground();
    drawTestPlanet(rad,testPlanet[2]);
    drawBasePlanet(planet[2]);
}

document.getElementById("space").addEventListener("wheel",function changePlanet(event){
    if(event.shiftKey){
        if(event.deltaY>0){bumpGame(testRadius+=0.5);}
        else if(event.deltaY<0){bumpGame(testRadius-=0.5);}
    }
    else{
        if(event.deltaY>0){bumpGame(testRadius+=2);}
        else if(event.deltaY<0){bumpGame(testRadius-=2);}
    }
    ratio = testRadius/baseRadius;
    if(ratio>1){
        document.getElementById("ratio").innerHTML = testPlanet[0] + " is " + ratio.toFixed(2) + " times bigger than " + planet[0] + "?";
    }
    else if(ratio == 1){
        document.getElementById("ratio").innerHTML = testPlanet[0] + " is " + ratio.toFixed(2) + " times the size of " + planet[0] + "?";
    }
    else if(ratio < 1){
        document.getElementById("ratio").innerHTML = testPlanet[0] + " is " + ratio.toFixed(2) + " times smaller than " + planet[0] + "?";
    }
});

var planet;
var testPlanet;
var trueRatio;

function startGame(){
    var rand = Math.floor(Math.random()*planets.length);
    planet = planets[rand];
    testPlanet = planet;
    while(planet == testPlanet){
        rand = Math.floor(Math.random()*planets.length);
        testPlanet = planets[rand];
    }

    if(testPlanet[0]=="Jupiter"||testPlanet[0]=="Saturn"||testPlanet[0]=="Neptune"||testPlanet[0]=="Uranus"){
        if(planet[0]=="Jupiter"||planet[0]=="Saturn"||planet[0]=="Neptune"||planet[0]=="Uranus"){
            baseRadius = Math.floor(Math.random()*80+80); 
        }
        else{
            baseRadius = Math.floor(Math.random()*30+30);
        }
    }
    else{
        baseRadius = Math.floor(Math.random()*80+80);
    }
    testRadius = Math.floor(Math.random()*80+80);
    
    console.log(testPlanet + " test and real: " + planet);
    drawBackground();
    drawTestPlanet(testRadius,testPlanet[2]);
    drawBasePlanet(planet[2]);

    document.getElementById("test-planet-label").innerHTML = testPlanet[0];
    document.getElementById("base-planet-label").innerHTML = planet[0];

    ratio = testRadius/baseRadius;
    if(ratio>1){
        document.getElementById("ratio").innerHTML = testPlanet[0] + " is " + ratio.toFixed(2) + " times bigger than " + planet[0] + "?";
    }
    else if(ratio == 1){
        document.getElementById("ratio").innerHTML = testPlanet[0] + " is " + ratio.toFixed(2) + " times the size of " + planet[0] + "?";
    }
    else if(ratio < 1){
        document.getElementById("ratio").innerHTML = testPlanet[0] + " is " + ratio.toFixed(2) + " times smaller than " + planet[0] + "?";
    }
    trueRatio = testPlanet[1]/planet[1];
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center.x = canvas.width/2;
    center.y = canvas.height/2;
    bumpGame(testRadius);
}, true);

var correctArray = [];
var incorrectArray = [];

var lastClick = 0;

function loadArrays() {
    correctArray.push(new Audio("correct1.mp3"));
    correctArray.push(new Audio("correct2.mp3"));       
    correctArray.push(new Audio("correct3.mp3"));       
    correctArray.push(new Audio("correct4.mp3"));       
    correctArray.push(new Audio("correct5.mp3"));       
    correctArray.push(new Audio("correct6.mp3"));       
    correctArray.push(new Audio("correct7.mp3"));       
    correctArray.push(new Audio("correct8.mp3"));                        
    incorrectArray.push(new Audio("incorrect.mp3"));
    incorrectArray.push(new Audio("incorrect1.mp3"));  
    incorrectArray.push(new Audio("incorrect2.mp3"));   
    incorrectArray.push(new Audio("incorrect4.mp3"));  
    incorrectArray.push(new Audio("incorrect5.mp3"));   
    incorrectArray.push(new Audio("incorrect7.mp3"));  
    incorrectArray.push(new Audio("incorrect8.mp3"));  
    incorrectArray.push(new Audio("incorrect9.mp3"));  
    incorrectArray.push(new Audio("incorrect10.mp3"));  
    incorrectArray.push(new Audio("incorrect11.mp3"));  
    incorrectArray.push(new Audio("incorrect12.mp3"));
    incorrectArray.push(new Audio("incorrect13.mp3"));  
    incorrectArray.push(new Audio("incorrect14.mp3"));  
    incorrectArray.push(new Audio("incorrect15.mp3"));  
    incorrectArray.push(new Audio("incorrect16.mp3"));    
}
loadArrays();

function score(){
    console.log(ratio.toFixed(2) + "test ratio and " + trueRatio.toFixed(2)+ " actual ratio");
    var d = new Date();
    var t = d.getTime();
    if(t-lastClick>1000){
        if (ratio.toFixed(2)==trueRatio.toFixed(2) ){
                //document.getElementById("message").innerHTML = "Correct in " + tries + " tries.";
                document.getElementById("submit").classList.add("flashcorrect");
                //tries = 1;
                var rightSound = Math.floor(Math.random()*correctArray.length);
                correctArray[rightSound].currentTime = 0;
                correctArray[rightSound].play();
                //stars++;
                document.getElementById("stars").innerHTML += "&#9733";
                delay(correctArray[rightSound].duration*1000).then(() => startGame());
                console.log(correctArray[rightSound].duration+ " duration");                
        }
        else {
            //tries++;
            //refreshCount++;
            //document.getElementById("message").innerHTML = "WRONG.";
            var wrongSound = Math.floor(Math.random()*incorrectArray.length);
            incorrectArray[wrongSound].currentTime = 0;
            incorrectArray[wrongSound].play();
            document.getElementById("submit").classList.add("flashwrong");
        }
        lastClick = t;
    }

}

document.addEventListener("DOMContentLoaded", function(){
    addListenForClear();
    startGame();
});

function addListenForClear(){
    var place = document.getElementById("submit");
    var clearIt = function() {
       place.classList.remove("flashwrong");
       place.classList.remove("flashcorrect");
    };
    place.addEventListener("animationend",clearIt);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
