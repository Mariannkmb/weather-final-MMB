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
  document.querySelector("#weatherDescrip").innerHTML =
    response.data.weather[0].description;
  let tempMaxRound = Math.round(response.data.main.temp_max);
  let tempMinRound = Math.round(response.data.main.temp_min);
  tempMax.innerHTML = `${tempMaxRound}`;
  tempMin.innerHTML = `${tempMinRound}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
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

  dayTimeUpdate();
}

function dayTimeUpdate() {
  let now = new Date();
  let dayNumber = now.getDate();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  let min = now.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  document.querySelector("#currentDay").innerHTML = `${day}`;
  document.querySelector("#currentDayNumber").innerHTML = `${dayNumber}`;
  document.querySelector("#currentMonth").innerHTML = `${month}`;
  document.querySelector("#currentTime").innerHTML = `${hours}:${min} hrs`;
}

function searchCity(city) {
  let apiKey = "b5de5ed43000236f70d3412957f9f340";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function currentCity() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLatitudeAndLongitude);
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
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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

let tempMin = document.querySelector("#tempMin");
let tempMax = document.querySelector("#tempMax");

let latitude;
let longitude;

document.querySelector(".search-box").addEventListener("submit", handleSubmit);

document.querySelector(".current-box").addEventListener("submit", currentCity);

document
  .querySelector("#fahrenheit")
  .addEventListener("click", fahrenheitUpdate);
document.querySelector("#celcius").addEventListener("click", celciusUpdate);

searchCity("Lisbon");
