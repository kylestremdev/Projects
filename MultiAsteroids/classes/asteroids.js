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

Asteroid.prototype.update = function (vel) {
  if (this.pos.y > worldHeight){
    this.pos.y = this.pos.y + vel.y - worldHeight;
  } else if(this.pos.y < 0) {
    this.pos.y = vel.y + worldHeight;
  }
  if (this.pos.x > worldWidth){
    this.pos.x = this.pos.x + vel.x - worldWidth;
  } else if(this.pos.x < 0) {
    this.pos.x = vel.x + worldWidth;
  }
  this.pos.add(vel);
}

Asteroid.prototype.calculateAngle = function (ship_pos, asteroid_pos) {
  angleMode(RADIANS);

  var p1 = createVector(ship_pos.x, ship_pos.y);
  var p2 = createVector(asteroid_pos.x, asteroid_pos.y);
  var p3 = createVector(asteroid_pos.x, ship_pos.y);

  var p12 = p1.dist(p2);
  var p13 = p1.dist(p3);
  var p23 = p2.dist(p3);

  return acos(((p12 ** 2) + (p13 ** 2) - (p23 ** 2)) / (2 * p12 * p13));
};

Asteroid.prototype.translateAngle = function (angle, ship_pos, r, i) {
  angleMode(RADIANS);

  while (angle > (2 * PI)) {
    angle -= (2 * PI);
  }

  var x = ship.pos.x + (r * cos(angle - (PI/2)));
  var y = ship.pos.y + (r * sin(angle - (PI/2)));
  this.pos.x = x;
  this.pos.y = y;
  console.log(angle, r);
};
