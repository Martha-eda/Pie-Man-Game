//martha edafiaga
//3/17/2020
//Assignment3



//this is the names of the varriables needed
var piemanSize = 90;
var piemanCircle = 40;
var sizePellet = 20;
var circlePellet = sizePellet / 2;
var COLORS = ["pink", "red", "yellow", "green", "black", "orange"];
var sizeColor = 6;
var arrPellet = [];
var countPellet = 0;
// this get the random number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//this is what shows the images
function imageShow(imgURL) {
  var x = document.createElement("IMG");
  x.setAttribute("src", imgURL);
  x.setAttribute("width", "100");
  x.setAttribute("height", "100");
  x.setAttribute("alt", "Pie man lives!!!");
  x.style.position = "absolute";
  document.body.appendChild(x);

  return x;
}
//this moves the man around  
function getKeyAndMove(event) {
  var arrowkeyMove = event.which || event.keyCode;
  switch (arrowkeyMove) {
    case 37: //left arrow key
      pie.updatePosition(-18, 0);
      break;
    case 38: //Up arrow key
      pie.updatePosition(0, -18);
      break;
    case 39: //right arrow key
      pie.updatePosition(18, 0);
      break;
    case 40: //down arrow key
      pie.updatePosition(0, 18);
      break;
  }
}
//this ends the game 
function GameOver() {
  var gameOver = true;

  for (var i = 0; i < arrPellet.length; i++) {
    if (!arrPellet[i].destroyed) {
      gameOver = false;
    }
  }

  if (gameOver) {
    var count = document.getElementById("pellet-count");
    count.innerHTML = "Pellet Count: " + countPellet + " GAME OVER!!!!";
  } else {
    var count = document.getElementById("pellet-count");
    count.innerHTML = "Pellet Count: " + countPellet;
  }
}

class Pieman {
  constructor(x, y, imgURL) {
    this.pie = imageShow(imgURL);

    this.baker = document.createElement("div");
    this.baker.setAttribute("id", "pieman");
    this.baker.style.position = "absolute";
    this.baker.style.width = "100px";
    this.baker.style.height = "100px";
    document.body.appendChild(this.baker);

    $("div").html(this.pie);

    this.baker.style.left = x + "px";
    this.baker.style.top = y + "px";

    this.x = x;
    this.y = y;

    this.dx = 0;
    this.dy = 0;

    this.pelletCOunt = 0;
  }

  setCoordinates(dx, dy) {
    this.baker.style.left = parseInt(this.baker.style.left) + dx + "px";
    this.baker.style.top = parseInt(this.baker.style.top) + dy + "px";
    this.x = parseInt(this.baker.style.left) + dx;
    this.y = parseInt(this.baker.style.top) + dy;
    this.dx = dx;
    this.dy = dy;
  }

  resetCoordinates(x, y) {
    this.baker.style.left = x + "px";
    this.baker.style.top = y + "px";
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
  }
//make the postition 
  updatePosition(dx, dy) {
    if (
      //To keep pieman moving forward (right)
      dx > 0 &&
      dy == 0 &&
      parseInt(this.baker.style.left) < window.innerWidth
    ) {
      this.pie.style.transform = "rotate(0deg)";
      this.setCoordinates(dx, dy);
    }

    if (dx < 0 && dy == 0 && parseInt(this.baker.style.left) > 0) {
      //To keep pieman moving backward (left)
      this.pie.style.transform = "rotate(180deg)";
      this.setCoordinates(dx, dy);
    }

    if (
      dx > 0 &&
      dy == 0 &&
      parseInt(this.baker.style.left) >= window.innerWidth - piemanSize
    ) {
      this.resetCoordinates(window.innerWidth - piemanSize, this.baker.style.top);
    }

    if (dx < 0 && dy == 0 && parseInt(this.baker.style.left) <= 0) {
      this.resetCoordinates(0, this.baker.style.top);
    }

    if (
      dx == 0 &&
      dy > 0 &&
      parseInt(this.baker.style.top) < window.innerHeight
    ) {
      //To keep pieman moving down
      this.pie.style.transform = "rotate(90deg)";
      this.setCoordinates(dx, dy);
    }

    if (dx == 0 && dy < 0 && parseInt(this.baker.style.top) > 0) {
      //To keep pieman moving up
      this.pie.style.transform = "rotate(270deg)";
      this.setCoordinates(dx, dy);
    }

    if (
      dx == 0 &&
      dy > 0 &&
      parseInt(this.baker.style.top) >= window.innerHeight - piemanSize
    ) {
      this.resetCoordinates(
        this.baker.style.left,
        window.innerHeight - piemanSize
      );
    }

    if (dx == 0 && dy < 0 && parseInt(this.baker.style.top) <= 0) {
      this.resetCoordinates(this.baker.style.left, 0);
    }

    this.checkForPellet();
    GameOver();
  }

  checkForPellet() {
    for (var i = 0; i < arrPellet.length; i++) {
      var pellet = arrPellet[i];

      if (
        pellet.x < this.x + piemanSize &&
        pellet.x + sizePellet > this.x &&
        pellet.y < this.y + piemanSize &&
        pellet.y + sizePellet > this.y &&
        !pellet.destroyed
      ) {
        pellet.destroyAndCreate();
        countPellet = countPellet + 1;
      }
    }
  }
}
//colours and timeout left and right
class Pellet {
  constructor(colour, timeout) {
    this.pelletCanvas = document.createElement("canvas");
    this.pelletCanvas.setAttribute("id", "pellet");
    this.pelletCanvas.setAttribute("class", "" + timeout + colour);
    this.pelletCanvas.setAttribute("width", "25px");
    this.pelletCanvas.setAttribute("height", "25px");
    this.pelletCanvas.style.position = "absolute";
    document.body.appendChild(this.pelletCanvas);

    this.x = getRandomInt(0, window.innerWidth - sizePellet);
    this.y = getRandomInt(0, window.innerHeight - sizePellet);

    this.pelletCanvas.style.left = this.x + "px";
    this.pelletCanvas.style.top = this.y + "px";

    this.pelletCTX = this.pelletCanvas.getContext("2d");

    this.colour = colour;
    this.pelletCTX.fillStyle = colour;
    this.pelletCTX.beginPath();
    this.pelletCTX.arc(
      sizePellet / 2,
      sizePellet / 2,
      sizePellet / 2,
      0,
      2 * Math.PI
    );

    this.pelletCTX.fill();

    this.destroyed = false;

    arrPellet.push(this);

    this.timeout = timeout;

    // this.interval = setInterval(this.ifDestroyed(this.timeout, this.colour), 1);

    setTimeout(this.destroy, Math.floor(this.timeout));
  }

  twoarrPellet() {
    pellet = new Pellet(
      COLORS[Math.floor(Math.random() * sizeColor)],
      Math.floor(this.timeout * 0.95)
    );
    pellet = new Pellet(
      COLORS[Math.floor(Math.random() * sizeColor)],
      Math.floor(this.timeout * 0.95)
    );
  }
//this does makes the make and destroy 
  destroyAndCreate() {
    document.body.removeChild(this.pelletCanvas);
    this.destroyed = true;
    this.twoarrPellet();
  }

  destroy() {
    $("#pellet").remove();
    this.destroyed = true;
  }
}

pie = new Pieman(10, 100, "pie.gif");
pellet = new Pellet(COLORS[Math.floor(Math.random() * sizeColor)], 100000);
