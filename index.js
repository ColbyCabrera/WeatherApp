const button = document.getElementById("submit-btn");
button.addEventListener("click", submitClick);

async function getData(location) {
  let res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=403eb774363e48cb99e161803231207&q=${location}`,
    { mode: "cors" }
  );
  let weatherData = await res.json();
  return weatherData;
}

async function submitClick(event) {
  event.preventDefault();
  const locationInput = document.getElementById("location");
  const location = locationInput.value;
  let weatherData = await getData(location);
  displayData(weatherData);
}

function displayData(weatherData) {
  console.log(weatherData);
  const condition = document.getElementById("condition");
  const currentTemp = document.getElementById("current-temp");
  const feelsLike = document.getElementById("feels-like");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");
  const rainChance = document.getElementById("rain-chance");

  condition.textContent = weatherData.current.condition.text;
  currentTemp.textContent =
    "Current Temperature: " + weatherData.current.temp_f + "°";
  feelsLike.textContent =
    "Feels like: " + weatherData.current.feelslike_f + "°";
  humidity.textContent = "Humidity: " + weatherData.current.humidity + "%";
  windSpeed.textContent = "Wind speed: " + weatherData.current.wind_mph + "mph";
  rainChance.textContent =
    "Rain chance: " +
    weatherData.forecast.forecastday[0].day.daily_chance_of_rain +
    "%";
}

getData("london").then((weatherData) => {
  displayData(weatherData);
});
