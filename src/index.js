import "./styles.css";
import Overcast from "./condition_overcast.jpg";
import Sunny from "./condition_sunny.jpg";
import Rainy from "./condition_rainy.jpg";
import PartlyCloudy from "./condition_partly-cloudy.jpg";

const APIKEY = "A9KKD333MB2D2AB75VENM7XQS";
const currentUnit = "metric";

const cityInput = document.getElementById("city");
const citySubmitBtn = document.getElementById("cityFormBtn");
const backgroundImageDiv =
  document.getElementsByClassName("backgroundImageDiv")[0];

const weatherObject = {
  temperature: "",
  conditions: "",
};

let city;

// build function: https://www.visualcrossing.com/weather-query-builder/

async function getWeather(city) {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        city +
        "?unitGroup=" +
        currentUnit +
        "&include=current&key=" +
        APIKEY +
        "&contentType=json"
    );
    const weatherData = await response.json();
    console.log(weatherData.currentConditions);

    weatherObject.conditions = weatherData.currentConditions.conditions;
    weatherObject.temperature = weatherData.currentConditions.temp;
    console.log(
      "The temperature is: " +
        weatherObject.temperature +
        " C and the conditions are: " +
        weatherObject.conditions
    );
    displayImage(weatherObject.conditions);
  } catch (error) {
    console.warn(error);
  }
}

function displayImage(theCondition) {
  const myImage = new Image();

  if (theCondition != null) {
    switch (theCondition) {
      case "Partially cloudy":
        myImage.src = PartlyCloudy;
        backgroundImageDiv.appendChild(myImage);
        break;

      default:
        break;
    }
  } else console.warn("condition not met");
}

citySubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  city = cityInput.value;
  await getWeather(city);
});
