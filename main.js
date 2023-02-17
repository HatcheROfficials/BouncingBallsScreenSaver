var canvas = document.getElementById("playground");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const killCounter = document.getElementById("counter");
const bulletCounter = document.getElementById("bulletCounter");
const winPrompt = document.getElementById("winPrompt");
var keyPressed = new Array();
winPrompt.style.display = "none";

if (!canvas.getContext) {
  console.log("Not able to play media");
}

var ctx = canvas.getContext("2d");

// Defining Shape Class
class shape {
  x;
  y;
  velX;
  velY;

  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Defining Evil Ball Class
class evilBall extends shape {
  radius;
  color;
  

  constructor(x, y, velX, velY, radius, color) {
    super(x, y, velX, velY);
    this.radius = radius;
    this.color = color;

    window.addEventListener("keydown", (event) => {
      keyPressed[event.keyCode] = event.type == "keydown";
    });
    window.addEventListener("keyup", (event) => {
      keyPressed[event.keyCode] = event.type == "keydown";
    });
  }

  move() {
    // move right
    if (keyPressed[39] == true) {
      this.x += this.velX;
    }
    // move left
    if (keyPressed[37] == true) {
      this.x -= this.velX;
    }
    // move up
    if (keyPressed[38] == true) {
      this.y -= this.velY;
    }
    if (keyPressed[40] == true) {
      this.y += this.velY;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y-5, 30, 10);
    ctx.closePath();
  }

  checkBounds() {
    if (this.x >= width - this.radius) {
      this.x = width - this.radius;
    }
    if (this.x < this.radius) {
      this.x = this.radius;
    }
    if (this.y >= height - this.radius) {
      this.y = height - this.radius;
    }
    if (this.y < this.radius) {
      this.y = this.radius;
    }
  }

  collosion() {
    for (var b of balls) {
      var dx = this.x - b.x;
      var dy = this.y - b.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if ((dist < this.radius + b.radius) || (maxBullets-numBullets <= 0 && balls.length > 0)) {
        winPrompt.textContent = "You Lose !!!";
        winPrompt.style.display = "";
        bulletCounter.textContent = 0;
        // b.exist = 0;
        // b.color = "red";
      }
    }
  }
}

// declaring evil circle
evilBall_body = new evilBall(50, 50, 10, 10, 20, "white");

// defining bullets
class bullet extends shape{
  radius;
  color;
  expended = 0;

  constructor(x,y,velX,velY,radius,color){
    super(x,y,velX,velY);
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move(){
    this.x += this.velX;
  }

  // removing bullets that are out of screen
  expended_check(){
    if(this.x > width){
      this.expended = 1;
    }
  }

  bullet_strike(){
    for(var i=0; i<balls.length; i++){
      for(var j=0; j<bullets.length; j++){
        if(bullets[j].x + bullets[j].radius > balls[i].x - balls[i].radius &&  
          bullets[j].x - bullets[j].radius < balls[i].x + balls[i].radius &&
          bullets[j].y + bullets[j].radius > balls[i].y - balls[i].radius &&
          bullets[j].y - bullets[j].radius < balls[i].y + balls[i].radius){
            bullets[j].expended = 1;
            balls[i].exist = 0;
          }
      }
    }
  }
}

var bullets = [];
var numBullets = 0;
var maxBullets = 30;
bulletCounter.textContent = maxBullets;
// defining bullt
window.addEventListener("keydown", (event) => {
  if(keyPressed[32] == true){
    var bul = new bullet(evilBall_body.x,evilBall_body.y,20,5,10,"red");
    bullets.push(bul);
    numBullets++;
    bulletCounter.textContent = maxBullets - numBullets;
  }
});


// defining balls
class ball extends shape {
  radius;
  color;
  exist;

  constructor(x, y, velX, velY, radius, color) {
    super(x, y, velX, velY);
    this.radius = radius;
    this.color = color;
    this.exist = 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.velX;
    this.y += this.velY;

    if (this.x >= width - this.radius || this.x < this.radius) {
      this.velX = -this.velX;
    }
    if (this.y >= height - this.radius || this.y < this.radius) {
      this.velY = -this.velY;
    }
  }

  collosion() {
    for (var b of balls) {
      if (this.exist && this !== b && b.exist) {
        const dx = this.x - b.x;
        const dy = this.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.radius + b.radius) {
          // b.color = this.color = randomCol();
          b.velX = this.velX + b.velX;
          this.velX = b.velX - this.velX;
          b.velX = b.velX - this.velX;

          b.velY = this.velY + b.velY;
          this.velY = b.velY - this.velY;
          b.velY = b.velY - this.velY;
        }
      }
    }
  }
}

// function return random number between num1 and num2
function random(num1, num2) {
  return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
}
// function returns a random color
function randomCol() {
  return "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
}

// declaring balls
var balls = new Array(); // array containing each ball object
var numBalls = 10; // number of balls
var minVel = -8;
var maxVel = 8;
var minRadius = 10;
var maxRadius = 20;

// initializing balls
for (let i = 0; i < numBalls; i++) {
  var x = random(maxRadius, width - maxRadius);
  var y = random(maxRadius, height - maxRadius);

  var velX = random(minVel, maxVel);
  var velY = random(minVel, maxVel);

  var radius = random(minRadius, maxRadius);
  var color = randomCol();

  var newBall = new ball(x, y, velX, velY, radius, color);
  balls.push(newBall);
}

// update the position of each ball
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (var i = 0; i < balls.length; i++) {
    if (balls[i].exist == 0) {
      balls.splice(i, 1);
      i = 0;
    } else {
      balls[i].update();
      balls[i].draw();
      balls[i].collosion();
    }
  }

  if (numBalls == killCounter.textContent) {
    setTimeout(() => {
      winPrompt.style.display = "";
    }, 1000);
  }

  killCounter.textContent = numBalls - balls.length;

  evilBall_body.draw();
  evilBall_body.move();
  evilBall_body.checkBounds();
  evilBall_body.collosion();

  if(bullets.length > 0){
    for(let i=0; i<bullets.length; i++){
      bullets[i].bullet_strike();
      bullets[i].expended_check();
      if(bullets[i].expended == 0){
        bullets[i].draw();
        bullets[i].move();
      } else{
        bullets.splice(i,1);
        i=0;
      }
    }
  }
  
  requestAnimationFrame(loop);
}

// setInterval(loop,50);
loop();




