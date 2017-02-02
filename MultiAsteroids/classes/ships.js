function Ship(){
  this.worldPos = createVector(width/2,height/2);
  this.pos = createVector(width/2, height/2);
  this.r = 20;
  this.speed = 0;
  this.vel = createVector(1, 1).mult(0);
  this.heading = 0;
  this.rotation = 0;
  this.isAccelerating = false;
  this.isDecelerating = false;
  this.force = createVector(0,0);
  this.angle = 0;
  this.isRotating = false;

  this.render = function () {
    push();
    fill('#54bd45');
    triangle(this.pos.x-this.r, this.pos.y+this.r,                  // left point
             this.pos.x+this.r, this.pos.y+this.r,                  // right point
             this.pos.x, this.pos.y-(this.r * Math.sqrt(2)));        // top point
    pop();
  };

  this.update = function () {
    if (this.isAccelerating && this.speed < 20){
      this.accelerate();
    } else if (this.isDecelerating && this.speed > 0.2) {
      this.decelerate();
    } else {
      this.worldPos.add(this.vel);
    }

    if (this.worldPos.y < 0) {
      this.worldPos.y = worldHeight + this.worldPos.y;
    } else if (this.worldPos.y > worldHeight) {
      this.worldPos.y = this.worldPos.y - worldHeight;
    }

    if (this.worldPos.x < 0) {
      this.worldPos.x = worldWidth + this.worldPos.x;
    } else if (this.worldPos.x > worldWidth) {
      this.worldPos.x = this.worldPos.x - worldWidth;
    }
  }
}

Ship.prototype.accelerating = function (bool) {
  this.isAccelerating = bool;
};

Ship.prototype.accelerate = function () {
  this.speed += 0.2;
};

Ship.prototype.decelerating = function (bool) {
  this.isDecelerating = bool;
};

Ship.prototype.decelerate = function () {
  if (this.speed < 0.2) {
    this.speed = 0
  } else {
    this.speed -= 0.2;
  }
};

Ship.prototype.rotate = function (change) {
  asteroids.forEach(function (asteroid) {
    asteroid.rotate(change);
  });

  this.turn();
};

Ship.prototype.turn = function () {
  angleMode(DEGREES);
  var d = ship.speed;

  var theta = this.angle;

  var pointA = createVector(0,0);
  var pointB = createVector(0, 0 + this.speed);
  var pointC;

  var lineAB = pointA.dist(pointB);
  var lineAC = lineAB;
  var lineBC = calculateZ(lineAB, lineAC, theta);

  pointC = calculateThirdPoint(lineAB, lineAC, lineBC);

  var quadrant;

  if (theta > 0 && theta <= 90) { // quadrant 1
    quadrant = 1;
    this.vel.x = pointC.x;
    this.vel.y = pointC.y * -1;
    console.log("+,-");
  } else if (theta > 90 && theta <= 180) {    // quadrant 2
    quadrant = 2;
    this.vel.x = pointC.x;
    this.vel.y = pointC.y * -1;
    console.log("+,+");
  } else if (theta > 180 && theta <= 270) {   // quadrant 3
    quadrant = 3;
    this.vel.x = -pointC.x;
    this.vel.y = pointC.y * -1;
    console.log("-,+");
  } else if ((theta > 270 && theta < 360) || theta == 0) {   // quadrant 4
    quadrant = 4;
    this.vel.x = -pointC.x;
    this.vel.y = -pointC.y;
    console.log("-,-");
  }
  console.log(this.worldPos);
};

function calculateZ(ab, ac, theta){
  var z = Math.sqrt(Math.pow(ab, 2) + Math.pow(ac, 2) - (2 * ab * ac * cos(theta)));
  return z;
}

function calculateThirdPoint(ab, ac, bc) {
  var y = (Math.pow(ab, 2) + Math.pow(ac, 2) - Math.pow(bc, 2))/ (2 * ab);
  var x = Math.sqrt(Math.pow(ac, 2) - Math.pow(y, 2));
  return createVector(x, y);
}
