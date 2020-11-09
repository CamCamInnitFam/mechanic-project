function Shape(x, y, w, h, colour){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colour = colour;
    this.isColliding = false;

    this.draw = function () {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    this.update = function () {
        if (this == draggedShape) {
            this.x = mouseX;
            this.y = mouseY;
            


        }
        
        if(this.y < 720 && this.isColliding == false){ // y coord = bottom of canvas
            this.y += gravity; //blocks fall
            if(this.y >720){ //if the block's y coord exceeds the bottom of the canvas
                this.y = 720 //correct the position
            }
        }
        if (this.isColliding == true){
            this.y += 0;            
            // this.isColliding = false;

        }
        if(isRight){
            this.x -= 1;
            isRight = false;
        }
        if(isLeft){
            this.x += 1;
            isLeft = false;
        }
        
    }

    this.checkCollision = function (i, arrayName) {
        for(var j = i+1 ; j < arrayName.length; j++){
            var checkingShape = arrayName[j];
            if (checkingShape.x < this.x + this.w &&
                checkingShape.x + checkingShape.w > this.x &&
                checkingShape.y < this.y + this.h &&
                checkingShape.y + checkingShape.h > this.y) {
                    // console.log("There is a COLLISION!");
                    this.isColliding = true;
                    checkingShape.isColliding = true;
                    if(checkingShape.x > this.x){
                        isRight = true;
                    }
                    if(checkingShape.x < this.x){
                        isLeft = true;
                    }

                    
                    break;
                    
                }
            else{
                console.log("no collision")
                //this.isColliding = false;
                checkingShape.isColliding = false;
            }
            
        }

    }

    this.containsPoint = function (x, y) {
        // console.log("this is running");
        var dx = Math.abs(x - this.x);
        var dy = Math.abs(y - this.y);
        if (dx + dy < 50) {
            return true
        }

    }
}