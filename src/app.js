function searchCity(city) {
  let apiKey = "b5de5ed43000236f70d3412957f9f340";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showForecast);
}

function currentCity() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLatitudeAndLongitude);
}

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let dayNumber = now.getDate();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];

  return `${day} ${dayNumber} ${month} | ${formatHour(timestamp)} `;
}

function formatHour(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function getLatitudeAndLongitude(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let apiKey = "b5de5ed43000236f70d3412957f9f340";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let tempResult = Math.round(`${response.data.main.temp}`);
  document.querySelector("#temperature").innerHTML = `${tempResult}`;
  celcius = tempResult;
  document.querySelector("#metric").innerHTML = "˚C";
  document.querySelector("#weather-descrip").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#searchButton").value = ``;
  let tempMaxRound = Math.round(response.data.main.temp_max);
  let tempMinRound = Math.round(response.data.main.temp_min);
  tempMax.innerHTML = `${tempMaxRound}`;
  tempMin.innerHTML = `${tempMinRound}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );
  document.querySelector("#time-data").innerHTML = `${formatDate(
    response.data.dt * 1000
  )}`;
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  let varDate = response.data.list[0].dt_txt.substring(0, 10);
  let varTempMax = response.data.list[0].main.temp_max;
  let varTempMin = response.data.list[0].main.temp_min;

  for (let index = 0; index < 40; index++) {
    forecast = response.data.list[index];
    if (varDate === forecast.dt_txt.substring(0, 10)) {
      if (varTempMax < forecast.main.temp_max) {
        varTempMax = forecast.main.temp_max;
      }
      if (varTempMin > forecast.main.temp_min) {
        varTempMin = forecast.main.temp_min;
      }
    } else {
      forecastElement.innerHTML += `
      <div class="col" style="width: 20%">
         <div class="forecast-date"> ${
           months[varDate.substring(6, 7) - 1]
         } ${varDate.substring(8, 10)} </div>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" class="weather-forecast-icons">
          <div class="weather-forecast-temperature">
          <strong >${Math.round(varTempMax)}˚</strong> ${Math.round(
        varTempMin
      )}˚
          </div>
      </div>
     `;
      varDate = forecast.dt_txt.substring(0, 10);
      varTempMax = forecast.main.temp_max;
      varTempMin = forecast.main.temp_min;
    }
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchButton").value;
  if (city === "") {
    currentCity();
  } else {
    searchCity(city);
  }
}

function fahrenheitUpdate(event) {
  event.preventDefault();
  fahrenheit = (celcius * 9) / 5 + 32;
  fahrenheit = Math.round(fahrenheit);
  document.querySelector("#celcius").classList.remove("active");
  document.querySelector("#fahrenheit").classList.add("active");
  document.querySelector("#temperature").innerHTML = `${fahrenheit}`;
  document.querySelector("#metric").innerHTML = "˚F";
}
function celciusUpdate(event) {
  event.preventDefault();
  document.querySelector("#fahrenheit").classList.remove("active");
  document.querySelector("#celcius").classList.add("active");
  document.querySelector("#temperature").innerHTML = `${celcius}`;
  document.querySelector("#metric").innerHTML = "˚C";
}

let celcius = null;
let fahrenheit = null;

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let tempMin = document.querySelector("#temp-min");
let tempMax = document.querySelector("#temp-max");

let latitude = null;
let longitude = null;

document.querySelector(".search-box").addEventListener("submit", handleSubmit);

document.querySelector(".current-box").addEventListener("submit", currentCity);

document
  .querySelector("#fahrenheit")
  .addEventListener("click", fahrenheitUpdate);
document.querySelector("#celcius").addEventListener("click", celciusUpdate);

searchCity("Lisbon");
