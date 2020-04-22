function getPosition(position) {
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
  document.querySelector("#weatherDescrip").innerHTML =
    response.data.weather[0].description;
  let tempMaxRound = Math.round(response.data.main.temp_max);
  let tempMinRound = Math.round(response.data.main.temp_min);
  tempMax.innerHTML = `${tempMaxRound}`;
  tempMin.innerHTML = `${tempMinRound}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.getElementById("searchButton").placeholder = response.data.name;
  document.querySelector("#city").innerHTML = response.data.name;
  console.log(response.data.name);
  dayTimeUpdate();
}

function dayTimeUpdate() {
  let now = new Date();
  let day = days[now.getDay()];
  let hours = now.getHours();
  let min = now.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  document.querySelector("#currentDay").innerHTML = `${day}`;
  document.querySelector("#currentTime").innerHTML = `${hours}:${min} hrs`;
}

function searchCity(city) {
  let apiKey = "b5de5ed43000236f70d3412957f9f340";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchButton").value;
  searchCity(city);
}
function currentCity() {
  dayTimeUpdate();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function fahrenheitUpdate() {
  fahrenheit = (celcius * 9) / 5 + 32;
  fahrenheit = Math.round(fahrenheit);
  document.querySelector("#temperature").innerHTML = `${fahrenheit}`;
  document.querySelector("#metric").innerHTML = "˚F";
}
function celciusUpdate() {
  celcius2 = ((fahrenheit - 32) * 5) / 9;
  celcius2 = Math.round(celcius);
  document.querySelector("#temperature").innerHTML = `${celcius2}`;
  document.querySelector("#metric").innerHTML = "˚C";
}

let celcius;
let celcius2;
let fahrenheit;

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
searchCity("Lisbon");

document.querySelector(".current-box").addEventListener("submit", currentCity);

document
  .querySelector("#fahrenheit")
  .addEventListener("click", fahrenheitUpdate);
document.querySelector("#celcius").addEventListener("click", celciusUpdate);
