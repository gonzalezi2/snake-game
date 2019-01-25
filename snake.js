var c = document.getElementById('canvas');
var static = document.getElementById('staticCanvas');

var ctx = c.getContext('2d');
// For drawing elements that don't need to be updated every repaint
var staticCtx = static.getContext('2d');

var cWidth = c.width;
var cHeight = c.height;
var scale = 25;
var blockSize = cHeight / scale;
var speed = 1;
var KEYS = {
  "left": 37,
  "up": 38,
  "right": 39,
  "down": 40
};

// It's probably a good idea to reuse this object for the tail as well to keep track
// of the position of each tail block
function Block() {
  this.height = blockSize;
  this.width = blockSize;
  this.xSpeed = 0;
  this.ySpeed = 0;  
  this.tail = [];
  this.posX = Math.floor(Math.random() * scale) * blockSize;
  this.posY = Math.floor(Math.random() * scale) * blockSize;
  this.then = Date.now();
  
  this.update = () => {
    let now = Date.now();
    if(now - this.then > 200){
      this.then = Date.now();
      // Since the frame rate is limited, we know whether the next move will be out of bounds or not.
      // We don't need to check for the location of the snake, we just need to see if the next move
      // it will be out of bounds. So we can check after making a move if it will be not before
      this.posX += this.xSpeed;
      this.posY += this.ySpeed;
      // TODO: Rethink this, maybe?
      this.tail.forEach(block => {
        console.log(this);
        block[0] += this.xSpeed;
        block[1] += this.ySpeed;
      });
      if(this.isInbounds()) {
        if(this.consumeFood()) {
          // How to store the tail coordinates?
          // TODO: Rethink this, maybe?
          this.tail.push([foodPosX, foodPosY]);
          setFoodCoords();
          showFood();
        }
        this.draw();
        // This is drawing the food after each repaint
        // It would be better to move this to the second canvas so as to reduce
        // overhead
      } else {
        console.log('you lose!!! Loser');
        console.log(`Your final score: ${this.tail.length}`);
        return;
      }
    }
    requestAnimationFrame(this.update);
  };

    
  this.draw = () => {
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.fillStyle = 'white';
    ctx.fillRect(this.posX, this.posY, blockSize, blockSize);
    // TODO: FIXXX IT!!!!!!!
    this.tail.forEach(block => {
      ctx.fillRect(block[0], block[1], blockSize, blockSize);
    });
  };

  this.setDirection = (x, y) => {
    this.xSpeed = x * blockSize;
    this.ySpeed = y * blockSize;
  };
  
  // Checks the boundaries of the canvas against the position of the snake
  this.isInbounds = () => {
    return this.posX + this.width < (cWidth + (blockSize / 2)) &&
    this.posX > 0 - (blockSize / 2) &&
    this.posY + this.height < (cHeight + (blockSize / 2)) &&
    this.posY > 0 - (blockSize / 2);
  };

  // Checks to see if we landed on the food/apple
  this.consumeFood = () => {
    return foodPosX === this.posX && foodPosY === this.posY;
  };
}
function init() {
  displayGrid();
  setFoodCoords();
  showFood();
  draw();
}
function draw() {
  b.update();
  b.draw();
}
function displayGrid() {
  for(var i = 0; i < scale; i++){
    staticCtx.beginPath();
    staticCtx.strokeStyle = 'blue';
    staticCtx.moveTo(i*blockSize, 0);
    staticCtx.lineTo(i*blockSize, cHeight);
    staticCtx.stroke();
    staticCtx.closePath();
  }
  for(var j = 0; j < scale; j++){
    staticCtx.beginPath();
    staticCtx.strokeStyle = 'blue';
    staticCtx.moveTo(0, j*blockSize);
    staticCtx.lineTo(cWidth, j*blockSize);
    staticCtx.stroke();
    staticCtx.closePath();
  }
}
function moveSnake(event) {
  if(event.keyCode === KEYS.left) {
    b.setDirection(-speed, 0);
  } else if(event.keyCode === KEYS.up) {
    b.setDirection(0, -speed);
  } else if(event.keyCode === KEYS.right) {
    b.setDirection(speed, 0);
  } else if(event.keyCode === KEYS.down) {
    b.setDirection(0, speed);
  }
}
function setFoodCoords() {
  foodPosX = Math.floor(Math.random() * scale) * blockSize;
  foodPosY = Math.floor(Math.random() * scale) * blockSize;
  console.log(foodPosX, foodPosY);
}
function showFood() {
  staticCtx.clearRect(0, 0, cWidth, cHeight);
  staticCtx.fillStyle = 'red';
  staticCtx.fillRect(foodPosX, foodPosY, blockSize, blockSize);
  displayGrid();
}
document.addEventListener('keydown', moveSnake);

var b = new Block();
init();