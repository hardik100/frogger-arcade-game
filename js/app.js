// Enemies our player must avoid
var Enemy = function (x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = Math.floor((Math.random() * 200) + 100);
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function (dt) {
  if (this.x <= 550) {
    this.x += this.speed * dt;
  }
  else {
    this.x = -2;
  }
  //check collision
  if (player.x >= this.x - 30
    && player.x <= this.x + 30
    && player.y >= this.y - 30
    && player.y <= this.y + 30) {
    player.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Object.prototype.reset = function () {
  player.x = 200;
  player.y = 400;
}

var player = function () {
  this.x = 200;
  this.y = 400;
  this.sprite = "images/char-boy.png";
};

player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.update = function () {
  if (this.x > 0 && this.key == "left") {
    this.x = this.x - 50;
  }
  else if (this.x <= 360 && this.key == "right") {
    this.x = this.x + 50;
  }
  else if (this.key == "up") {
    this.y = this.y - 50;
  }
  else if (this.y <= 400 && this.key == "down") {
    this.y = this.y + 50;
  }
  this.key = null;
  //when player will reach to water after crosssing all the hurdles it will be reset 
  if (this.y < 20) {
    this.reset();
    Score.update();
  }
};

var Score = function () {
  this.Score = 0;
}

Score.prototype.update = function () {
  this.Score += 1;
  document.getElementById('score').innerHTML = this.Score;
}

player.prototype.handleInput = function (e) {
  this.key = e;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-2, 50), new Enemy(-2, 100), new Enemy(-2, 150), new Enemy(-2, 200)];

var player = new player();
var Score = new Score();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
