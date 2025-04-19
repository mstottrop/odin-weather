import "./styles.css";

const APIKEY = "A9KKD333MB2D2AB75VENM7XQS";
const city = "Cologne";
const currentUnit = "metric";
const weatherObject = {
  temperature: "",
  conditions: "",
};

// build function: https://www.visualcrossing.com/weather-query-builder/

async function getWeather() {
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
  } catch (error) {
    console.warn(error);
  }
}

getWeather();
