console.log("running");
//Variables
//--------------------------------//
const colorsContainers = document.querySelector(".colors-container");
const getSpawnButton = document.querySelector("#spawn-button");
let colorBlocks = ["a", "s", "d", "f", "g"];
//Functions
//--------------------------------//

function getRandomNumber() {
    return Math.floor(Math.random() * 255);
}

function spawn() {
    colorsContainers.innerHTML = "";
    const commonColor = getRandomNumber();
    console.log("Common Color: " + commonColor);

    colorBlocks.forEach((_colorBlock, index) => {
        colorBlocks[index] =
            "rgb(" +
            commonColor +
            "," +
            getRandomNumber() +
            "," +
            getRandomNumber() +
            ")";
    });

    colorBlocks.forEach((colorBlock) => {
        const divElement = document.createElement("div");
        divElement.className = "rgbColor";
        divElement.style.backgroundColor = colorBlock;
        divElement.textContent = colorBlock;
        colorsContainers.append(divElement);

        console.log(colorBlock);

        //--------------------------------//

        //--------------------------------//
    });
}
//Event Listeners
//--------------------------------//
spawn();
getSpawnButton.addEventListener("click", spawn);
document.addEventListener("wheel", spawn);