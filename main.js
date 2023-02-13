var canvas = document.getElementById("playground");

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

  move(){
    this.x += this.velX;
    this.y += this.velY;

    if(this.x >= 300 || this.x <= 0){
      this.velX = -this.velX;
    }
    if(this.y >= 150 || this.y <= 0){
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
var balls = new Array(5);

// initializing balls
for(let i=0; i<5; i++){
  var x = random(0,300);
  var y = random(0,150);
  var velX = random(1,5);
  var velY = random(1,5);
  var radius = random(10,15);
  var color = randomCol();
  balls[i] = new ball(x,y,velX,velY,radius,color);
}

function updateBall(){
  // ctx.clearRect(0,0,300,150);

  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, 300, 150);

  for(var i=0; i<5; i++){
    balls[i].move();
    balls[i].draw();
  }

  requestAnimationFrame(updateBall);
}

updateBall();
// setInterval(updateBall,80);



