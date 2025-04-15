import "./styles.css";

const APIKEY = "A9KKD333MB2D2AB75VENM7XQS";
const city = "Cologne";

/* build function */

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Cologne?unitGroup=us&include=current&key=A9KKD333MB2D2AB75VENM7XQS&contentType=json

const temperature = document.querySelector(".temperatureParagraph");

async function getWeather() {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        city +
        "?unitGroup=us&include=current&key=" +
        APIKEY +
        "&contentType=json"
    );
    const weatherData = await response.json();
    const conditions = weatherData.currentConditions;
    console.log("The temperature is: " + conditions.temp + " C");
    temperature.textContent = conditions.temp;
  } catch (error) {
    console.warn(error);
  }
}

getWeather();
