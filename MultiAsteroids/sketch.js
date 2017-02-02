var worldHeight = 600;
var worldWidth = 600;
var asteroids = [];
var ship;

function setup() {
  createCanvas(500, 500);
  ship = new Ship();
  for(var i = 0; i < 20; i++){
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background('#3f2f5c');
  //background(255);
  for (var i = 0; i < asteroids.length; i++) {
    asteroids[i].render();
    asteroids[i].update(ship.vel);
  }

  ship.render();
  ship.turn();
  ship.update();
}

function keyReleased() {
  ship.isRotating = false;
  ship.accelerating(false);
  ship.decelerating(false);

}

function keyPressed() {
  if (keyCode == 32) {
    // shoot lasers
  } else if (keyCode == 65 || keyCode == 37) {
    var change = 2;
    ship.angle -= change;
    if (ship.angle >= 360 || ship.angle <= -360) {
      ship.angle %= 360;
    }
    ship.rotate(change);
  } else if (keyCode == 68 || keyCode == 39) {
    var change = -2;
    ship.angle -= change;
    ship.rotate(change);
  } else if (keyCode == 87 || keyCode == 38) {
    ship.accelerating(true);
  } else if (keyCode == 83 || keyCode == 40) {
    ship.decelerating(true);
  }
}
