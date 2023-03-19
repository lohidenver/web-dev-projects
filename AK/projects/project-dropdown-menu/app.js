console.log("Running");

const buttonAction = document.querySelector("#dropdown");

const dropdownList = document.querySelector(".nav-links-container");

function toggle() {
  dropdownList.classList.toggle("hidden");
}

buttonAction.addEventListener("click", toggle);
