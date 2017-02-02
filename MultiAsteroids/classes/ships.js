function Ship(){
  this.worldPos = createVector(width/2,height/2);
  this.pos = createVector(width/2, height/2);
  this.r = 20;
  this.vel = createVector(0, 0);
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
    if (this.worldPos.y > worldHeight){
      this.worldPos.y = this.worldPos.y + this.vel.y - worldHeight;
    } else if (this.worldPos.y < 0){
      this.worldPos.y = this.vel.y + worldHeight;
    }
    if (this.worldPos.x > worldWidth){
      this.worldPos.x = this.worldPos.x + this.vel.x - worldWidth;
    } else if (this.worldPos.x < 0){
      this.worldPos.x = this.vel.x + worldWidth;
    }

    if (this.isAccelerating && this.vel.y < 20){
      this.accelerate();
    } else if (this.isDecelerating && this.vel.y > 0.2) {
      this.decelerate();
    } else {
      this.worldPos.add(this.vel);
    }
  }
}

Ship.prototype.setRotation = function (val) {
  this.rotation = val;
};

Ship.prototype.turn = function () {
  this.heading += this.rotation;

};

Ship.prototype.accelerating = function (bool) {
  this.isAccelerating = bool;
};

Ship.prototype.accelerate = function () {
  this.vel.add(createVector(0,0.2));
};

Ship.prototype.decelerating = function (bool) {
  this.isDecelerating = bool;
};

Ship.prototype.decelerate = function () {
  this.vel.sub(createVector(0,0.2));
};

Ship.prototype.rotate = function (change) {
  asteroids.forEach(function (asteroid) {
    asteroid.rotate(change);
  });
};
