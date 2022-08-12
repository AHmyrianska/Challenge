function getForecast(coordinates) {
  let apiKey = "f652a8fe769ac19948d6c4ef2bd17e93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getDate(coordinates) {
  let apiKey = `ea4a7c572374494aa9f15c89c00a49a3`;
  let apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${coordinates.lat}&long=${coordinates.lon}`;
  axios.get(apiUrl).then(displayDate);
}

function displayDate(response) {
  let day = response.data.date_time_wti.slice(0, -27);

  let time = response.data.time_24.slice(0, -3);
  let correctedDay = "";

  if (day === "Mon" || day === "Mon,") {
    correctedDay = "Monday";
  }

  if (day === "Tue" || day === "Tue,") {
    correctedDay = "Tuesday";
  }

  if (day === "Wed" || day === "Wed,") {
    correctedDay = "Wednesday";
  }

  if (day === "Thu" || day === "Thu,") {
    correctedDay = "Thursday";
  }

  if (day === "Fri" || day === "Fri,") {
    correctedDay = "Friday";
  }

  if (day === "Sat" || day === "Sat,") {
    correctedDay = "Saturday";
  }

  if (day === "Sun" || day === "Sun,") {
    correctedDay = "Sunday";
  }

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `${correctedDay} ${time}`;
}

function showWeather(response) {
  getForecast(response.data.coord);
  getDate(response.data.coord);

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

  celsiusTemp = response.data.main.temp;
  feelsLikeCelsius = response.data.main.feels_like;

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon-now");

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let icon = "";
      if (forecastDay.weather[0].icon === "01d") {
        icon = `<i class="fa-solid fa-sun"></i>`;
      }

      if (forecastDay.weather[0].icon === "01n") {
        icon = `<i class="fa-solid fa-moon"></i>`;
      }

      if (forecastDay.weather[0].icon === "02d") {
        icon = `<i class="fa-solid fa-cloud-sun"></i>`;
      }

      if (forecastDay.weather[0].icon === "02n") {
        icon = `<i class="fa-solid fa-cloud-moon"></i>`;
      }

      if (
        forecastDay.weather[0].icon === "03d" ||
        forecastDay.weather[0].icon === "03n"
      ) {
        icon = `<i class="fa-solid fa-cloud"></i>`;
      }

      if (
        forecastDay.weather[0].icon === "04d" ||
        forecastDay.weather[0].icon === "04n"
      ) {
        icon = `<i class="fa-solid fa-cloud"></i>`;
      }

      if (
        forecastDay.weather[0].icon === "09d" ||
        forecastDay.weather[0].icon === "09n"
      ) {
        icon = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
      }

      if (
        forecastDay.weather[0].icon === "10d" ||
        forecastDay.weather[0].icon === "10n"
      ) {
        icon = `<i class="fa-solid fa-cloud-rain"></i>`;
      }

      if (
        forecastDay.weather[0].icon === "11d" ||
        forecastDay.weather[0].icon === "11n"
      ) {
        icon = `<i class="fa-solid fa-cloud-bolt"></i>`;
      }

      if (
        forecastDay.weather[0].icon === "13d" ||
        forecastDay.weather[0].icon === "13n"
      ) {
        icon = `<i class="fa-solid fa-snowflake"></i>`;
      }

      if (
        forecastDay.weather[0].icon === "50d" ||
        forecastDay.weather[0].icon === "50n"
      ) {
        icon = `<i class="fa-solid fa-smog"></i>`;
      }

      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <h3>${formatDay(forecastDay.dt)}</h3>
              <div id="icon_forecast">${icon}</div>
              <h4><b>${Math.round(forecastDay.temp.max)}°</b> ${Math.round(
          forecastDay.temp.min
        )}°</h4>
            </div>
           `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Paris");
