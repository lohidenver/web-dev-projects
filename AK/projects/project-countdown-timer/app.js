console.log("Running");

const slider = document.querySelector("#slider");
const customSlider = document.querySelector(".fill");
const timeLeftText = document.querySelector("#time-left");
const resetButton = document.querySelector("#restart");
let startCount = 5;
let timeLeft = startCount;

//setSliderValue
//-------------------------------//
slider.value = startCount;

//Create Timer Function with self clear/stop
//-------------------------------//
// const timerID = setInterval(() => {
//     timeLeft--;
//     timeLeftText.textContent = timeLeft;
//     slider.value = timeLeft;
//     if (timeLeft <= 0) {
//         clearInterval(timerID);
//         timeLeftText.textContent = "Fin";
//     }
// }, 1000);

//Create Timer Function with self clear/stop with custom slider
//-------------------------------//
function countdown() {
    const customTimerID = setInterval(() => {
        timeLeft--;
        timeLeftText.textContent = timeLeft;
        customSlider.style.width = (timeLeft * 100) / startCount + "%";
        if (timeLeft <= 0) {
            clearInterval(customTimerID);
            timeLeftText.textContent = "Fin";
            surprise();
        }
    }, 1000);
}

countdown();
//Create and animate our confetti
//-------------------------------//

const randomColor = function getRandomColors() {
    let numR = Math.floor(Math.random() * 255);
    let numG = Math.floor(Math.random() * 255);
    let numB = Math.floor(Math.random() * 255);
    let color = `rgba(${numR}, ${numG}, ${numB}, .75)`;
    console.log(color);
    return color;
};

function surprise() {
    for (let i = 0; i < 500; i++) {
        setTimeout(() => {
            const circleElement = document.createElement("div");
            circleElement.classList.add("circle");
            circleElement.style.left = Math.floor(Math.random() * 100) + "%";
            circleElement.style.top = Math.floor(Math.random() * 100) + "%";
            circleElement.style.backgroundColor = randomColor();
            timeLeftText.append(circleElement);
        }, i * 5);
    }
}

function reset() {
    window.location.reload();
}

resetButton.addEventListener("click", reset);