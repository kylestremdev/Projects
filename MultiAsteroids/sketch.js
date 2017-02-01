var worldHeight = 600;
var worldWidth = 600;
var asteroids = [];
var ship;

function setup() {
  createCanvas(500, 500);
  ship = new Ship();
  for(var i = 0; i < 10; i++){
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background('#3f2f5c');
  //background(255);
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.isRotating) {
      var angle = asteroids[i].calculateAngle(ship.pos, asteroids[i].pos);
      var r = ship.pos.dist(asteroids[i].pos);
      console.log(angle);
      asteroids[i].translateAngle(angle, ship.pos, r, i);
    }
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
    ship.isRotating = true;
    ship.angle -= (PI/45);
    console.log(ship.angle);
  } else if (keyCode == 68 || keyCode == 39) {
    ship.isRotating = true;
    ship.angle += (PI/45);
    console.log(ship.angle);
  } else if (keyCode == 87 || keyCode == 38) {
    ship.accelerating(true);
  } else if (keyCode == 83 || keyCode == 40) {
    ship.decelerating(true);
  }
}
