"use strict";
var placeHolder = 0;
var isRight = false;
var isLeft = false;
var tileSize = 64;
var tileRows = 12;
var tileCols = 12;
var allShapes = []; //list of all shapes
//resizing canvas
var canvas = document.getElementById('canvas');
canvas.width = tileSize * tileCols;
canvas.height = tileSize * tileRows;
var offsetLeft = canvas.offsetLeft;
var offsetTop = canvas.offsetTop;
var cs = window.getComputedStyle(canvas);
var stageWidth = canvas.width;
var stageHeight = canvas.height;
var ctx = canvas.getContext('2d');
var gravity = 8; //block fall speed
var draggedShape = null;
var isMouseDown = false;
var mouseX = 0, mouseY = 0;
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
requestAnimationFrame(render);
// var clickButton = document.getElementById('spawnButton');
//on click
canvas.addEventListener("click", createShape);
// spawnButton.addEventListener("click", createShape);
//makes random colour for the shape
function generateHex() {
    var str = "0123456789ABCDEF";
    var result = "#";
    for (var i = 0; i < 6; i++) {
        result += str.charAt(Math.floor(Math.random() * 16));
    }
    return result;
}
function render() {
    // handle input
    manageInput();
    // update positions
    updateAllShapes();
    // resolve collisions
    checkAllCollisions();
    // draw
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    drawAllShapes();
    requestAnimationFrame(render);
}
function manageInput() {
    if (isMouseDown && draggedShape == null) {
        var newShape;
        for (var i = 0; i < allShapes.length; i++) {
            newShape = allShapes[i];
            if (newShape.containsPoint(mouseX, mouseY)) {
                console.log("this works!!!1");
                draggedShape = newShape;
                canvas.addEventListener('mousemove', onDragShape);
                break;
            }

        }


    }
}
function onMouseDown(event) {
    isMouseDown = true;
    mouseX = event.clientX - offsetLeft;
    mouseY = event.clientY - offsetTop;

}
function onMouseUp() {
    isMouseDown = false;
    canvas.removeEventListener('mousemove', onDragShape);
    draggedShape = null;
}
function onDragShape(event) {
    mouseX = event.clientX - offsetLeft;
    mouseY = event.clientY - offsetTop;
}
function createShape() {
    for (var i = 0; i < allShapes.length; i++) {
        if (allShapes[i].containsPoint(mouseX, mouseY)) {
            console.log("contains a point");
            placeHolder = 1;
            break;
        }

    }
    if (placeHolder == 0) {
        //define properties
        console.log("this works");
        var newShape = new Shape(event.clientX - offsetLeft, event.clientY - offsetTop, 50, 50, generateHex())

        console.log(newShape.x, newShape.y);
        //add to shapes list
        allShapes.push(newShape);
        //draw on canvas
        // ctx.fillStyle = newShape.colour;
        //ctx.fillRect(newShape.x, newShape.y, newShape.w, newShape.h);

    }
    placeHolder = 0 ;
    

}

function updateAllShapes() {
    var newShape;
    for (var i = 0; i < allShapes.length; i++) {
        newShape = allShapes[i];
        newShape.update();

    }

}
function drawAllShapes() {
    var newShape;
    for (var i = 0; i < allShapes.length; i++) {
        newShape = allShapes[i];
        newShape.draw();

    }
}

function checkAllCollisions() {
    var newShape;
    for (var i = 0; i < allShapes.length; i++) {
        newShape = allShapes[i];
        newShape.checkCollision(i, allShapes);
    }

    //For loop 
}
//moving shape


//needs shape stacking

//needs shape colliding

function Circle(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.logCoordinates = function () {
        console.log("X: " + this.x + " | Y: " + this.y);
    }
}

var exampleCircle = new Circle(10, 40, 20, 20);