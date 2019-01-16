var c = document.getElementById('canvas');
var grid = document.getElementById('staticCanvas');
var ctx = c.getContext('2d');
var gCtx = grid.getContext('2d');
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
function displayGrid() {
  for(var i = 0; i < scale; i++){
    gCtx.beginPath();
    gCtx.strokeStyle = 'blue';
    gCtx.moveTo(i*blockSize, 0);
    gCtx.lineTo(i*blockSize, cHeight);
    gCtx.stroke();
    gCtx.closePath();
  }
  for(var j = 0; j < scale; j++){
    gCtx.beginPath();
    gCtx.strokeStyle = 'blue';
    gCtx.moveTo(0, j*blockSize);
    gCtx.lineTo(cWidth, j*blockSize);
    gCtx.stroke();
    gCtx.closePath();
  }
}

function Block() {
  this.height = blockSize;
  this.width = blockSize;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.posX = Math.floor(Math.random() * scale) * blockSize;
  this.posY = Math.floor(Math.random() * scale) * blockSize;
  this.then = Date.now();
  
  this.update = () => {
    let now = Date.now();
    if(now - this.then > 200){
      this.then = Date.now();
      if(this.isInbounds()) {
        this.posX = this.posX + this.xSpeed;
        this.posY = this.posY + this.ySpeed;
        this.draw();
        showFood();
      } else {
        console.log('you lose!!! Loser');
      }
    }
    requestAnimationFrame(this.update);
  };
    
  this.draw = () => {
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.fillStyle = 'white';
    ctx.fillRect(this.posX, this.posY, blockSize, blockSize);
  };

  this.setDirection = (x, y) => {
    this.xSpeed = x * blockSize;
    this.ySpeed = y * blockSize;
  };
  
  // Checks the boundaries of the canvas against the position of the snake
  this.isInbounds = () => {
    return this.posX + this.width < (cWidth + 1) && this.posX > 0 &&
      this.posY > 0 && this.posY + this.height < (cHeight + 1);
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
}
function showFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(foodPosX, foodPosY, blockSize, blockSize);
}
document.addEventListener('keydown', moveSnake);

var b = new Block();
init();