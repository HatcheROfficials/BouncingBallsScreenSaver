var canvas = document.getElementById("playground");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

if(!canvas.getContext){
  console.log("Not able to play media");
}

var ctx = canvas.getContext("2d");

class ball{
  x;
  y;
  velX;
  velY;
  size;
  color;

  constructor(x,y,velX,velY,radius,color){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.radius = radius;
    this.color = color;
  }

  draw(){
    ctx.beginPath();

    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(){
    this.x += this.velX;
    this.y += this.velY;

    if(this.x >= width || this.x <= 0){
      this.velX = -this.velX;
    }
    if(this.y >= height || this.y <= 0){
      this.velY = -this.velY;
    }
  }
}

// function return random number between num1 and num2
function random(num1,num2){
  return Math.floor(Math.random()*(num2-num1+1) + num1);
}
// function returns a random color
function randomCol(){
  return "rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) + ")";
}

// declaring balls
var balls = new Array(); // array containing each ball object
var numBalls = 10; // number of balls
var minVel = 3;
var maxVel = 15;
var minRadius = 10;
var maxRadius = 20;

// initializing balls
for(let i=0; i<numBalls; i++){
  var x = random(0,width);
  var y = random(0,height);
  var velX = random(minVel,maxVel);
  var velY = random(minVel,maxVel);
  var radius = random(minRadius,maxRadius);
  var color = randomCol();

  var newBall = new ball(x,y,velX,velY,radius,color);
  balls.push(newBall);
}

function loop(){
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for(var i=0; i<numBalls; i++){
    balls[i].update();
    balls[i].draw();
  }
  requestAnimationFrame(loop);
}

loop();




