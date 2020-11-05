"use strict";
var tileSize = 64;
var tileRows = 12;
var tileCols = 12;
var allShapes = []; //list of all shapes
//resizing canvas
var canvas = document.getElementById('canvas');
canvas.width = tileSize * tileCols;
canvas.height = tileSize * tileRows;
var offsetLeft, offsetTop;
var stageWidth, stageHeight;
offsetLeft = canvas.offsetLeft;
offsetTop = canvas.offsetTop;
var cs = window.getComputedStyle(canvas);
stageWidth = canvas.width = parseInt(cs.getPropertyValue('width'), 10);
stageHeight = canvas.height = parseInt(cs.getPropertyValue('height'), 10);
var ctx = canvas.getContext('2d');
var shapesNum = 0
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
        for (var i = 0; i < shapesNum; i++) {
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

    console.log("this works");
    //define properties
    var newShape = {}
    shapesNum += 1;
    newShape.colour = generateHex();
    console.log(newShape.colour);
    newShape.x = event.clientX - offsetLeft;
    newShape.y = event.clientY - offsetTop;
    console.log(newShape.x, newShape.y);
    //add to shapes list
    allShapes.push(newShape);
    //draw on canvas
    // ctx.fillStyle = newShape.colour;
    ctx.fillRect(newShape.x, newShape.y, 50, 50);




    newShape.draw = function () {
        ctx.fillStyle = this.colour;
        ctx.fillRect(newShape.x, newShape.y, 50, 50);
    }

    newShape.update = function () {
        if (this == draggedShape) {
            this.x = mouseX;
            this.y = mouseY;


        }
        if(this.y < 720){ // y coord = bottom of canvas
            this.y += gravity; //blocks fall
            if(this.y >720){ //if the block's y coord exceeds the bottom of the canvas
                this.y = 720 //correct the position
            }
            
            

        }
    }
    newShape.checkCollision = function (i, arrayName) {
        for(var j = i+1 ; j < arrayName.length; j++){
            var checkingShape = arrayName[j];
            // console.log("x: " + checkingShape.x + "this x " + this.x);
            if (checkingShape.x < this.x + this.width &&
                checkingShape.x + checkingShape.width > this.x &&
                checkingShape.y < this.y + this.height &&
                checkingShape.y + checkingShape.height > this.y) {
                    console.log("There is a COLLISION!");
                }
        }

    }
    newShape.containsPoint = function (x, y) {
        // console.log("this is running");
        var dx = Math.abs(x - this.x);
        var dy = Math.abs(y - this.y);
        if (dx + dy < 50) {
            return true
        }

    }
}

function updateAllShapes() {
    var newShape;
    for (var i = 0; i < shapesNum; i++) {
        newShape = allShapes[i];
        newShape.update();

    }

}
function drawAllShapes() {
    var newShape;
    for (var i = 0; i < shapesNum; i++) {
        newShape = allShapes[i];
        newShape.draw();
    }
}

function checkAllCollisions(){
    var newShape;
    for(var i = 0; i <shapesNum; i++){
        newShape = allShapes[i];
        newShape.checkCollision(i, allShapes);
    }
}
//moving shape


//needs shape stacking

//needs shape colliding