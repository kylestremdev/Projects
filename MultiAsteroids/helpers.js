function createNewShip () {
  var clientShip = new Ship(shipsCounter, width/2, height/2, 0);
  ships[shipsCounter] = clientShip;
  shipsCounter++;
  return clientShip;
}

function renderShip () {

  origin = createVector(width/2, height/2);

  var r = clientShip.r;

  clientShipRenderPos = createVector(0, 0);

  translate(origin.x, origin.y);

  var pLeft = createVector(0 - (r/2) * Math.sqrt(3), 0 + r/2);
  var pRight = createVector(0 + (r/2) * Math.sqrt(3), 0 + r/2);
  var pTop = createVector(0, 0 - r);

  fill('#54bd45');
  triangle(pTop.x, pTop.y, pRight.x, pRight.y, pLeft.x, pLeft.y);


}

function renderAsteroids () {
  asteroids.forEach(function (asteroid) {

    push();
    fill(255);
    ellipse(asteroid.renderPos.x, asteroid.renderPos.y, asteroid.r);
    pop();

  });
}

function updateAsteroids() {
  // asteroids.forEach(function (asteroid) {
  //
  //   if (asteroid.worldPos.x >= worldWidth) {
  //     asteroid.worldPos.x -= worldWidth;
  //   } else if (asteroid.worldPos.x < 0) {
  //     asteroid.worldPos.x += worldWidth;
  //   }
  //   if (asteroid.worldPos.y >= worldHeight) {
  //     asteroid.worldPos.y -= worldHeight;
  //   } else if (asteroid.worldPos.y < 0) {
  //     asteroid.worldPos.y += worldHeight;
  //   }
  //
  //   asteroid.worldPos.add(asteroid.velocity);
  // });
}

function generateAsteroids(numAsteroids) {
  asteroids.push(new Asteroid(0, 330, 200, 30));
  asteroids[0].renderPos = asteroids[0].worldPos.copy().sub(clientShip.worldPos);

  // var numPerRow = Math.ceil(Math.sqrt(numAsteroids));
  // var numPerCol = numPerRow;
  // for (var y = 0; y < worldHeight; y += (worldHeight / numPerCol)) {
  //   for (var x = 0; x < worldWidth; x += (worldWidth / numPerRow)) {
  //     asteroids.push(new Asteroid(asteroidsCounter, x, y, random(20,30)));
  //     asteroids[asteroidsCounter].renderPos = asteroids[asteroidsCounter].worldPos.copy().sub(clientShip.worldPos);
  //     asteroidsCounter++;
  //     if (asteroidsCounter == numAsteroids) {
  //       return;
  //     }
  //   }
  // }
}

function calculateInitialAngle (asteroid) {
  var quadrant = calculateQuadrant(asteroid);
  var distanceShipToAsteroid = clientShip.worldPos.dist(asteroid.worldPos);

  var point1 = createVector(0,0);
  var point2 = asteroid.renderPos;
  var point3 = createVector(0, 0 - distanceShipToAsteroid);

  var line12 = point1.dist(point2);
  var line13 = point1.dist(point3);
  var line23 = point2.dist(point3);

  var line12SQ = line12 ** 2;
  var line13SQ = line13 ** 2;
  var line23SQ = line23 ** 2;

  var angleFromYAxis = acos((line12SQ + line13SQ - line23SQ) / (2 * line12 * line13));
  if (quadrant > 2) {
    angleFromYAxis = -angleFromYAxis;
  }

  if (angleFromYAxis <= 0) {
    angleFromYAxis = 360 + angleFromYAxis;
  }

  return angleFromYAxis;
}

function calculateQuadrant (asteroid) {
  if (asteroid.renderPos.x >= 0) {       // quadrant 1 or 2
    if (asteroid.renderPos.x > 0 && asteroid.renderPos.y <= 0) {    // quadrant 1
      return 1;
    } else if (asteroid.renderPos.x >= 0 && asteroid.renderPos.y > 0) {   // quadrant 2
      return 2;
    } else {      // quadrant 4 edge case, if this.pos.x == ship.pos.x && this.pos.y < ship.pos.y
      return 4;
    }
  } else {      // quadrant 3 or 4
    if (asteroid.renderPos.y >= 0) {     // quadrant 3
      return 3;
    } else {    // quadrant 4
      return 4;
    }
  }
};

function rotateAsteroid (asteroid, angle) {
  // console.log("rotating", asteroid, clientShip, clientShipRenderPos);
  angleMode(DEGREES);
  var quadrant = calculateQuadrant(asteroid);
  var angleFromYAxis = calculateInitialAngle(asteroid);
  var theta = angleFromYAxis + angle;
  var dir = angle > 0 ? "left" : "right";
  theta %= 360;

  var d = clientShipRenderPos.dist(asteroid.renderPos);

  var pointA = clientShipRenderPos;
  var pointB = createVector(clientShipRenderPos.x, clientShipRenderPos.y - d);
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



  var deltaX = Math.abs(Math.abs(asteroid.renderPos.x) - Math.abs(pointC.x));
  var deltaY = Math.abs(Math.abs(asteroid.renderPos.y) - Math.abs(pointC.y));

  if (dir == "left") {
    if (quadrant == 1) {
      asteroid.renderPos.x += deltaX;
      asteroid.renderPos.y += deltaY;
    } else if (quadrant == 2) {
      asteroid.renderPos.x -= deltaX;
      asteroid.renderPos.y += deltaY;
    } else if (quadrant == 3) {
      asteroid.renderPos.x -= deltaX;
      asteroid.renderPos.y -= deltaY;
    } else if (quadrant == 4) {
      asteroid.renderPos.x += deltaX;
      asteroid.renderPos.y -= deltaY;
    }
  } else {
    if (quadrant == 1) {
      asteroid.renderPos.x -= deltaX;
      asteroid.renderPos.y -= deltaY;
    } else if (quadrant == 2) {
      asteroid.renderPos.x += deltaX;
      asteroid.renderPos.y -= deltaY;
    } else if (quadrant == 3) {
      asteroid.renderPos.x += deltaX;
      asteroid.renderPos.y += deltaY;
    } else if (quadrant == 4) {
      asteroid.renderPos.x -= deltaX;
      asteroid.renderPos.y += deltaY;
    }
  }
}

function rotateAsteroids(angle) {
  asteroids.forEach(function (asteroid) {
    rotateAsteroid(asteroid, angle);
  });
}
