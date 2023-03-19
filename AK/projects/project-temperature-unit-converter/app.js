console.log("connected");
//
const primaryInput = document.querySelector("#primary-input");
const secondaryInput = document.querySelector("#secondary-input");
const primarySelect = document.querySelector("#primary-units");
const secondarySelect = document.querySelector("#secondary-units");

primaryInput.value = 0;
secondaryInput.value = 0;

function calculate(firstTempUnit, secondTempUnit, temp) {
  const combination = firstTempUnit + "-" + secondTempUnit;
  let result;
  console.log(combination);
  if (firstTempUnit === secondTempUnit) {
    return temp;
  }

  switch (combination) {
    case "fahrenheit-celsius":
      result = ((Number(temp) - 32) * (5 / 9)).toFixed(2);
      break;
    case "celsius-fahrenheit":
      result = (Number(temp) * (9 / 5) + 32).toFixed(2);
      break;
    case "kelvin-fahrenheit":
      result = ((Number(temp) - 273.15) * (9 / 5) + 32).toFixed(2);
      break;
    case "kelvin-celsius":
      result = (Number(temp) - 273.15).toFixed(2);
      break;
    case "fahrenheit-kelvin":
      result = ((Number(temp) - 32) * (5 / 9) + 273.15).toFixed(2);
      break;
    case "celsius-kelvin":
      result = (Number(temp) + 273.15).toFixed(2);
      break;
  }
  return result;
}

function update(e) {
  const elementID = e.target.id;

  if (elementID === "secondary-input") {
    primaryInput.value = calculate(
      secondarySelect.value,
      primarySelect.value,
      secondaryInput.value
    );
  } else {
    secondaryInput.value = calculate(
      primarySelect.value,
      secondarySelect.value,
      primaryInput.value
    );
  }
}

primaryInput.addEventListener("change", update);
primarySelect.addEventListener("change", update);
secondaryInput.addEventListener("change", update);
secondarySelect.addEventListener("change", update);
