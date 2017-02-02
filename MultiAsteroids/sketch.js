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
    asteroids[i].update(ship.speed);
  }

  ship.render();
  ship.update();

  // if (keymap[32]) {
  //   // shoot lasers
  // } else if (keymap[65] || keymap[37]) {
  //   ship.setTurning(true, 'left');
  // } else if (keymap[68] || keymap[39]) {
  //   ship.setTurning(true, 'right');
  // } else if (keymap[87] || keymap[38]) {
  //   ship.accelerating(true);
  // } else if (keymap[83] || keymap[40]) {
  //   ship.decelerating(true);
  // }
}

function keyReleased() {
  ship.isRotating = false;
  ship.accelerating(false);
  ship.decelerating(false);
  ship.setTurning(false, undefined);

}

function keyPressed() {
  if (keyCode == 32) {
    // shoot lasers
  } else if (keyCode == 65 || keyCode == 37) {
    ship.setTurning(true, 'left');
  } else if (keyCode == 68 || keyCode == 39) {
    ship.setTurning(true, 'right');
  } else if (keyCode == 87 || keyCode == 38) {
    ship.accelerating(true);
  } else if (keyCode == 83 || keyCode == 40) {
    ship.decelerating(true);
  }
}

// var keymap = []; // You could also use an array
// onkeydown = onkeyup = function(e){
//   e = e || event; // to deal with IE
//   keymap[e.keyCode] = e.type == 'keydown';
//
//
//   console.log(keymap);
// }
