console.log("Running");

const mouth = document.querySelector("#mouth");
const emotionElements = document.querySelectorAll(".rating-container div");

function selectEmotion(e) {
  mouth.classList.remove("bad-mouth", "okay-mouth", "great-mouth");
  const chosenEmotion = e.target.id;

  if (chosenEmotion === "bad") {
    console.log("bad emotion");
    mouth.classList.add("bad-mouth");
  } else if (chosenEmotion === "okay") {
    console.log("okay emotion");
    mouth.classList.add("okay-mouth");
  } else {
    console.log("great emotion");
    mouth.classList.add("happy-mouth");
  }
}

emotionElements.forEach((emotionElement) =>
  emotionElement.addEventListener("click", selectEmotion)
);
