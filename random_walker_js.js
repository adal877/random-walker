var strokeW = 2;
var pos = 0;
var frame = 5;
var walkersQtd = 1;
var step = 25;

var coordsPassed = [];
class Walker {
  constructor(x, y) {
    if(x !== null && y !== null) {
      this.x = x;
      this.y = y;
    } else {
      this.x = random(width-(frame-strokeW));
      this.y = random(height-(frame-strokeW));
    }
      this.c = color(random(100, 255), random(100, 200), random(100, 255), 50);
  }
  takeStep(newPosition) {
    switch(newPosition) {
      case 1:
        this.x-=floor(random(-step, step));
        break;
      case 2:
        this.y-=floor(random(-step, step));
        break;
      case 3:
        this.y+=floor(random(-step, step));
        break;
      case 4:
        this.x+=floor(random(-step, step));
        break;
    }// End switch
    this.x = constrain(this.x, frame+2, (width-frame));
    this.y = constrain(this.y, frame+2, (height-frame));
    if(this.x == (width-frame)-strokeW) {
      this.x-=floor(random(-step, step));
    } else if(this.x > 0 && this.x < (frame-strokeW)) {
      this.x+=floor(random(-step, step));
    } else if(this.y  == (height-frame)-strokeW) {
      this.y-=floor(random(-step, step));
    } else if(this.y > 0 && this.y < (frame-strokeW)) {
      this.y+=floor(random(-step, step));
    }
  }// End method drawWalker(int)
  drawWalker() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, 5, 5);
  }
}// End class Walker
var walkers = [];

function drawQtdWalkersFrame() {
  stroke(255);
  strokeWeight(1);
  fill(50);
  rect(10, 10, 70, 70);
  textSize(40);
  textAlign(CENTER);
  strokeWeight(2);
  text(walkers.length, 35, 57);
}
function setup() {
  createCanvas(900, 600);
  for(let i = 0; i < walkersQtd; i++) {
    walkers.push(new Walker(null, null));
  }
  background(50);
  noSmooth();
}

function draw() {
  drawQtdWalkersFrame();
  for(let i = 0; i < walkers.length; i++) {
    walkers[i].takeStep(pos);
    walkers[i].drawWalker();
    pos = floor(random(1, 4));
  }
}
function keyTyped() {
  if(key === "Enter") {
    noLoop();
  }
}
function keyReleased() {
  if(key === "Enter") {
    loop();
  }
}
function mousePressed() {
  walkers.push(new Walker(mouseX, mouseY));
  walkersQtd++;
}
function keyPressed() {
  switch(key) {
    case "ArrowUp":
      walkers.push(new Walker(
                            random(width-(frame-strokeW)),
                            random(height-(frame-strokeW))
                  ));
      walkersQtd++;
      break;
    case "ArrowDown":
      walkers.pop();
      walkersQtd--;
      break;
    case "d":
      background(50);
      while(walkers.length != 1) {
        walkers.pop();
      }
      break;
    case "r":
      background(50);
      break;
    case "s":
      background(50);
      for(let i = 0; i < walkers.length; i++) {
        walkers[i].x = width - frame;
        walkers[i].y = height - frame;
      }
      break;
    case "e":
      background(50);
      while(walkers.length) {
        walkers.pop();
      }
      break;
  }
}
