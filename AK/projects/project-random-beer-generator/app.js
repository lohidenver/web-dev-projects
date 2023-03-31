console.log("app connected");
//
const beerButton = document.querySelector("#beer-button");
const beerTitle = document.querySelector("#random-beer");
const beerDescription = document.querySelector("#beer-description");
const beerImage = document.querySelector("#beer-image");
//

function getBeerData() {
  fetch("https://api.punkapi.com/v2/beers/random")
    .then((response) => response.json())
    .then((data) => {
      const volumeUnits = data[0].volume.unit;
      const volumeValue = data[0].volume.value;

      beerTitle.textContent =
        data[0].name + " | " + volumeValue + " " + volumeUnits;
      beerDescription.textContent = data[0].description;
      if (data[0].image_url) {
        beerImage.setAttribute("src", data[0].image_url);
      } else {
        beerImage.setAttribute(
          "src",
          "https://c.neevacdn.net/image/fetch/s--PyKsP_ll--/https%3A//sweetclipart.com/multisite/sweetclipart/files/x_mark_red.png?savepath=x_mark_red.png"
        );
      }
    });
}

beerButton.addEventListener("click", getBeerData);

getBeerData();
