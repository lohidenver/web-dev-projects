const hamburgerButton = document.querySelector(".hamburger-button");
const hamburgerList = document.querySelector(".hamburger-list-container");

hamburgerButton.addEventListener("click", () => {
    hamburgerList.classList.toggle("hidden");
    hamburgerButton.classList.toggle("change");
});

// function myHamburger(x) {
//     x.classList.toggle("change");
// }