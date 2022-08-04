let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formattedDate = `${currentDay}, ${currentHours}:${currentMinutes}`;
  return formattedDate;
}

let currentDayTime = document.querySelector("#current-day-time");
currentDayTime.innerHTML = formatDate(now);

function showWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = `${temperature} `;

  let clouds = response.data.weather[0].main;
  let cloudsElement = document.querySelector("#clouds");
  cloudsElement.innerHTML = clouds;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = feelsLike;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon-now");

  celsiusTemp = response.data.main.temp;
  feelsLikeCelsius = response.data.main.feels_like;

  if (icon === "01d") {
    iconElement.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }

  if (icon === "01n") {
    iconElement.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }

  if (icon === "02d") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
  }

  if (icon === "02n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-moon"></i>`;
  }

  if (icon === "03d" || icon === "03n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  }

  if (icon === "04d" || icon === "04n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  }

  if (icon === "09d" || icon === "09n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
  }

  if (icon === "10d" || icon === "10n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
  }

  if (icon === "11d" || icon === "11n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
  }

  if (icon === "13d" || icon === "13n") {
    iconElement.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
  }

  if (icon === "50d" || icon === "50n") {
    iconElement.innerHTML = `<i class="fa-solid fa-smog"></i>`;
  }
}

function searchCity(city) {
  let apiKey = "f652a8fe769ac19948d6c4ef2bd17e93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let selectedCity = document.querySelector("#city-input");
  searchCity(selectedCity.value);
}

//geolocation button
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f652a8fe769ac19948d6c4ef2bd17e93";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemp(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${Math.round(fahrenheitTemp)} `;

  let feelsLike = document.querySelector("#feels-like");
  let feelsLikeFahrenheit = (feelsLikeCelsius * 9) / 5 + 32;
  feelsLike.innerHTML = Math.round(feelsLikeFahrenheit);

  let unit = document.querySelector("#unit");
  unit.innerHTML = ` °F`;
}

function showCelsiusTemp(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${Math.round(celsiusTemp)} `;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(feelsLikeCelsius);

  let unit = document.querySelector("#unit");
  unit.innerHTML = ` °C`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;
let feelsLikeCelsius = null;

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Paris");
