import "./styles.css";
import Overcast from "./condition_overcast.jpg";
import Sunny from "./condition_sunny.jpg";
import Rainy from "./condition_rainy.jpg";
import PartlyCloudy from "./condition_partly-cloudy.jpg";
import FourOFour from "./404.jpg";

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

const weatherMessage = "";
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
    displayImage(weatherObject.conditions);
  } catch (error) {
    console.warn(error);
    displayImage(weatherObject.conditions);
  }
}

function displayImage(theCondition) {
  backgroundImageDiv.innerHTML = "";
  const infoText =
    "The temperature is " +
    weatherObject.temperature +
    "°C and \n the conditions are " +
    weatherObject.conditions;

  if (theCondition != null) {
    switch (theCondition) {
      case "Partially cloudy":
        setImageAndText(PartlyCloudy, infoText);
        break;
      case "Rainy":
        setImageAndText(Rainy, infoText);
        break;
      case "Sunny":
        setImageAndText(Sunny, infoText);
        break;
      case "Overcast":
        setImageAndText(Overcast, infoText);
        break;
      default:
        setImageAndText(FourOFour, "Something went wrong");
        break;
    }
  } else console.warn("condition not met");
}

function setImageAndText(imageSrc, infoText) {
  const myImage = new Image();
  const informationDiv = document.createElement("h1");
  informationDiv.classList.add("informationDiv");
  myImage.src = imageSrc;
  myImage
    .decode()
    .then(() => {
      backgroundImageDiv.appendChild(myImage);
      informationDiv.textContent = infoText;
      backgroundImageDiv.appendChild(informationDiv);
    })
    .catch((err) => {
      console.error("Something went wrong while loading the image: " + err);
    });
}

citySubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  city = cityInput.value;
  await getWeather(city);
});
