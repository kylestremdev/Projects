var clientShip;
var clientShipRenderPos;
var origin;

function setup () {
  createCanvas(windowWidth * 0.75, windowHeight * 0.8);

  origin = createVector(width/2, height/2);

  clientShip = createNewShip();

  clientShipRenderPos = clientShip.worldPos.copy().sub(origin);

  generateAsteroids(5);
}

function draw () {
  background('#3f2f5c');

  renderShip();

  renderAsteroids();
  updateAsteroids();



}

function windowResized () {
  resizeCanvas(windowWidth * 0.75, windowHeight * 0.8);

  // console.log("resizing", asteroids[0], clientShip, clientShipRenderPos);
}

function keyPressed() {
  if (keyCode == 32) {
    // shoot lasers
  } else if (keyCode == 65 || keyCode == 37) {
    rotateAsteroids(3);
  } else if (keyCode == 68 || keyCode == 39) {
    rotateAsteroids(-3);
  } else if (keyCode == 87 || keyCode == 38) {
    //ship.accelerating(true);
  } else if (keyCode == 83 || keyCode == 40) {
    //ship.decelerating(true);
  }
}
