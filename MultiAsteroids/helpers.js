function createNewShip () {
  var clientShip = new Ship(shipsCounter, worldWidth/2, worldHeight/2, 0);
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
    if (asteroid.rotatedRenderPos) {
      push();
      fill(255);
      ellipse(asteroid.rotatedRenderPos.x, asteroid.rotatedRenderPos.y, asteroid.r);
      pop();
    } else {
      push();
      fill(255);
      ellipse(asteroid.renderPos.x, asteroid.renderPos.y, asteroid.r);
      pop();
    }
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
  // asteroids.push(new Asteroid(0, 400, 600, 30));
  // asteroids[0].renderPos = asteroids[0].worldPos.copy().sub(clientShip.worldPos);
  // console.log(asteroids[0].renderPos, clientShip.heading);

  var numPerRow = Math.ceil(Math.sqrt(numAsteroids));
  var numPerCol = numPerRow;
  for (var y = 0; y < worldHeight; y += (worldHeight / numPerCol)) {
    for (var x = 0; x < worldWidth; x += (worldWidth / numPerRow)) {
      asteroids.push(new Asteroid(asteroidsCounter, x, y, random(20,30)));
      asteroids[asteroidsCounter].renderPos = asteroids[asteroidsCounter].worldPos.copy().sub(clientShip.worldPos);
      asteroidsCounter++;
      if (asteroidsCounter == numAsteroids) {
        return;
      }
    }
  }
}

function calculateInitialAngle(vector) {
  var r = createVector(0,0).dist(vector);

  var pointA = createVector(0,0);
  var pointB = vector;
  var pointC = createVector(0, -r);

  var a = pointB.dist(pointC);
  var b = pointA.dist(pointC);
  var c = r;

  var top = (b ** 2) + (c ** 2) - (a ** 2);
  var bottom = 2 * b * c;
  var angleA = acos(top / bottom);

  if (vector.x < 0) {
    angleA = 360 - angleA;
  }

  return angleA;
}

function rotateAsteroid (asteroid, angle) {
  angleMode(DEGREES);
  var r = createVector(0,0).dist(asteroid.renderPos);
  var initialAngle = calculateInitialAngle(asteroid.renderPos);
  var newAngle;
  if (asteroid.rotatedRenderPos) {
    newAngle = calculateInitialAngle(asteroid.rotatedRenderPos);
  }
  var theta = (initialAngle - angle) % 360;

  if (theta < 0) {
    theta = 360 + theta;
  }

  x = r * cos(theta);
  y = r * sin(theta);


  y = -y;

  asteroid.rotatedRenderPos = createVector(x,y);

  console.log(initialAngle, angle, x, y, theta, newAngle);
}

function rotateAsteroids(angle) {
  asteroids.forEach(function (asteroid) {
    rotateAsteroid(asteroid, angle);
  });
}
