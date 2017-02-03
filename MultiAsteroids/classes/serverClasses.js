function Asteroid (id, x, y, r) {
  this.id = id;
  this.worldPos = createVector(x, y);
  this.r = r;
  this.velocity = p5.Vector.random2D().mult(0.5);
}

function Ship (id, x, y, heading) {
  this.id = id;
  this.worldPos = createVector(x, y);
  this.r = 20;
  this.heading = heading;
  this.velocity = createVector(0,0);
}

function Lasers (id, shipId, x, y) {
  this.id = id;
  this.shipId = shipId;
  this.worldPos = createVector(x, y);
  this.heading = ships[this.shipId].heading;
  this.velocity = ships[this.shipId].velocity.copy().mult(1.5);
}
