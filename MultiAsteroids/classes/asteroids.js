function Asteroid (x, y, r) {
  if (x && y){
    this.pos = createVector(x,y);
  } else {
    this.pos = createVector(Math.floor(random(worldWidth)), Math.floor(random(600)));
  }

  this.worldPos = this.pos.copy();

  if (r) {
    this.r = r;
  } else {
    this.r = random(30, 60);
  }

  this.vel = createVector(0,0);
}

Asteroid.prototype.render = function () {
  push();
  ellipse(this.pos.x, this.pos.y, this.r);
  pop();
}

Asteroid.prototype.update = function (speed) {
  if (this.pos.y > worldHeight){
    this.pos.y = this.pos.y + speed - worldHeight;
  } else if(this.pos.y < 0) {
    this.pos.y = speed + worldHeight;
  } else {
    this.pos.y += speed;
  }
}

Asteroid.prototype.rotate = function (angle) {
  angleMode(DEGREES);
  var angleFromYAxis = this.calculateInitialAngle();
  var angleFromYAxis = angleFromYAxis % 360;
  var theta = angleFromYAxis + angle;
  theta %= 360;

  var d = ship.pos.dist(this.pos);

  var pointA = ship.pos;
  var pointB = createVector(ship.pos.x, ship.pos.y - d);
  var pointC = createVector(0,0);

  var lineAB = d;
  var lineAC = d;
  var lineBC;

  var lineABsquared = Math.pow(lineAB, 2);
  var lineACsquared = Math.pow(lineAC, 2);
  var lineBCsquared;

  lineBC = Math.sqrt(lineABsquared + lineACsquared - (2 * lineAB * lineAC * cos(theta)));
  lineBCsquared = lineBC ** 2;

  pointC.y = (lineABsquared + lineACsquared - lineBCsquared) / (2 * lineAB);
  pointC.x = Math.sqrt(lineABsquared - (pointC.y ** 2));

  var deltaX = pointC.x;
  var deltaY = pointC.y;

  if (theta >= 180){
    this.pos.x = ship.pos.x - deltaX;
  } else if (theta < 0) {
    this.pos.x = ship.pos.x - deltaX
  } else {
    this.pos.x = ship.pos.x + deltaX;
  }
  this.pos.y = ship.pos.y - deltaY;

};

Asteroid.prototype.calculateInitialAngle = function () {
  var quadrant = this.calculateQuadrant();
  var distanceShipToAsteroid = ship.pos.dist(this.pos);

  var point1 = ship.pos;
  var point2 = this.pos;
  var point3 = createVector(ship.pos.x, ship.pos.y - distanceShipToAsteroid);

  var line12 = point1.dist(point2);
  var line13 = point1.dist(point3);
  var line23 = point2.dist(point3);

  var line12SQ = line12 ** 2;
  var line13SQ = line13 ** 2;
  var line23SQ = line23 ** 2;

  var angleFromYAxis = acos((line12SQ + line13SQ - line23SQ) / (2 * line13 * line13));
  if (quadrant > 2) {
    angleFromYAxis = 360 - angleFromYAxis;
  }
  return angleFromYAxis;
};

Asteroid.prototype.calculateQuadrant = function () {
  if (this.pos.x >= ship.pos.x) {       // quadrant 1 or 2
    if (this.pos.x > ship.pos.x && this.pos.y <= ship.pos.y) {    // quadrant 1
      return 1;
    } else if (this.pos.x >= ship.pos.x && this.pos.y > ship.pos.y) {   // quadrant 2
      return 2;
    } else {      // quadrant 4 edge case, if this.pos.x == ship.pos.x && this.pos.y < ship.pos.y
      return 4;
    }
  } else {      // quadrant 3 or 4
    if (this.pos.y >= ship.pos.y) {     // quadrant 3
      return 3;
    } else {    // quadrant 4
      return 4;
    }
  }
};
