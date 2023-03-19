console.log("App connected");

const body = document.querySelector("body");

class Heart {
  constructor(color, position, speed, size) {
    this.color = color;
    this.position = position;
    this.speed = speed;
    this.size = size;
  }
  draw() {
    let timerID;
    let top = 0;
    const heartElement = document.createElement("div");
    heartElement.classList.add("heart");
    heartElement.style.left = this.position + "px";
    heartElement.style.top = -5 + "px";
    let humpPosition = this.size * -0.5;
    heartElement.style.setProperty("--c", this.color);
    heartElement.style.setProperty("--s", this.size + "px");
    heartElement.style.setProperty("--hump", humpPosition + "px");
    body.append(heartElement);

    function move() {
      heartElement.style.top = top + "px";
      top += 10;
      if (top >= window.innerHeight) {
        clearInterval(timerID);
        heartElement.remove();
      }
    }
    timerID = setInterval(move, this.speed);
  }
}

function addHeart() {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const randomLeft = Math.floor(Math.random() * window.innerWidth);
  const randomSpeed = Math.floor(Math.random() * 100);

  const randomSize = function (min, max) {
    let heartSize = Math.floor(Math.random() * (max - min) + min);
    console.log(heartSize);
    return heartSize;
  };
  const newHeart = new Heart(
    randomColor,
    randomLeft,
    randomSpeed,
    randomSize(10, 75)
  );
  console.log(newHeart);
  newHeart.draw();
}

setInterval(addHeart, 100);
