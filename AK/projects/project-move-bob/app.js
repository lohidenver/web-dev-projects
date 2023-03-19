console.log("Running");

const bob = document.querySelector(".bob");
const eyes = document.querySelector(".eye-container");
const leftPupil = document.querySelector("#left-eye");
const rightPupil = document.querySelector("#right-eye");

let left = 100;
let bottom = 100;
let eyeLeft = 10;
let eyeBottom = 10;

function moveRight() {
    left += 100;
    bob.style.left = left + "px";
    eyes.style.transform = "rotate(0)";
    eyes.style.left = "60px";
    leftPupil.style.transform = "rotate(0deg)";
    rightPupil.style.transform = "rotate(0deg)";
}

function moveLeft() {
    left -= 100;
    bob.style.left = left + "px";
    eyes.style.transform = "rotate(180deg)";
    eyes.style.left = "-60px";
    leftPupil.style.transform = "rotate(0deg)";
    rightPupil.style.transform = "rotate(0deg)";
}

function moveUp() {
    bottom += 100;
    bob.style.bottom = bottom + "px";
    eyes.style.transform = "rotate(90deg)";
    eyes.style.left = "0px";
    leftPupil.style.transform = "rotate(180deg)";
    rightPupil.style.transform = "rotate(180deg)";
}

function moveDown() {
    bottom -= 100;
    bob.style.bottom = bottom + "px";
    eyes.style.transform = "rotate(-90deg)";
    eyes.style.left = "0px";
    leftPupil.style.transform = "rotate(180deg)";
    rightPupil.style.transform = "rotate(180deg)";
}

function moveBob(e) {
    console.log(e.key);
    if (e.key === "ArrowLeft") {
        moveLeft();
    } else if (e.key === "ArrowRight") {
        moveRight();
    } else if (e.key === "ArrowUp") {
        moveUp();
    } else if (e.key === "ArrowDown") {
        moveDown();
    } else {
        console.log("test");
    }
}
document.addEventListener("keydown", moveBob);