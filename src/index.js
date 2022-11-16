function ucFirst(str) {
  if (str.length > 0) {
    let newStr = str[0].toUpperCase() + str.slice(1);
    return newStr;
  } else return "";
}

function getWeatherIcon(icon) {
  icon = icon.slice(0, 2);
  let weatherEmoji;
  switch (icon) {
    case "01":
      weatherEmoji = "☀️";
      break;
    case "02":
      weatherEmoji = "🌤";
      break;
    case "03":
      weatherEmoji = " 🌥";
      break;
    case "04":
      weatherEmoji = "☁️";
      break;
    case "09":
      weatherEmoji = "🌧";
      break;
    case "10":
      weatherEmoji = "🌦";
      break;
    case "11":
      weatherEmoji = "⛈";
      break;
    case "13":
      weatherEmoji = "❄️";
      break;
    case "50":
      weatherEmoji = "🌫";
      break;
    default:
      weatherEmoji = "💧";
  }
  return weatherEmoji;
}

function getDayOfWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";
  let i = 0;
  forecast.forEach(function (dayforecast) {
    let weatherIcon = getWeatherIcon(dayforecast.weather[0].icon);
    let dayOfWeek = getDayOfWeek(dayforecast.dt);
    if (i < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="card border-info mb-3" style="max-width: 14rem">
          <div class="card-header">${dayOfWeek}</div>
          <div class="card-body">
            <h5 class="card-title">${weatherIcon}</h5>
            <p class="card-text">
              <span class="week-weather__max">${Math.round(
                dayforecast.temp.max
              )}° </span>|
              <span class="week-weather__min"> ${Math.round(
                dayforecast.temp.min
              )}°</span>
            </p>
          </div>
        </div>`;
    }
    i++;
  });
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(cordinates) {
  console.log(cordinates.lat);
  let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
  let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.lat}&lon=${cordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(forecastApi).then(displayForecast);
}

function showWeather(response) {
  let clouds;
  let humidity;
  let wind;
  let temperature;
  let city;
  let curentImg;

  city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  console.log("дані" + response.data);
  console.log(response.data);
  temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  clouds = document.querySelector("#clouds");
  clouds.innerHTML = ucFirst(response.data.weather[0].description);
  humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed}m/s`;
  curentImg = document.querySelector("#curent-img");
  curentImg.innerHTML = getWeatherIcon(response.data.weather[0].icon);
  curentDate();
  getForecast(response.data.coord);
}

function setWeather(city) {
  let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(weatherApi).then(showWeather);
}

function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName");
  let strCityName = "" + cityName.value;
  let city = document.querySelector("#city");
  strCityName = ucFirst(strCityName);
  console.log(strCityName);
  if (strCityName.length > 0) {
    city.innerHTML = strCityName;
    setWeather(strCityName);
  }
}

function curentDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  let dayOftheWeek = document.querySelector("#dayOftheWeek");
  dayOftheWeek.innerHTML = days[now.getDay()];
  let date = document.querySelector("#corentDate");
  let curentDate = `${now.getDate()}.${
    now.getMonth() + 1
  }.${now.getFullYear()}`;
  date.innerHTML = curentDate;
  let time = document.querySelector("#curentTime");
  let minutes;
  if (now.getMinutes() < 10) minutes = `0${now.getMinutes()}`;
  else minutes = now.getMinutes();
  time.innerHTML = `${now.getHours()}:${minutes}`;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6b115e6146d232dba59a91769a209348";
  console.log(lat);
  console.log(lon);
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherApi).then(showWeather);
}

function curentCity() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

curentDate();

setWeather("Talske");
let btnCity = document.querySelector("#city-form");
btnCity.addEventListener("submit", changeCity);

let btnCurent = document.querySelector("#enterCurentCity");
btnCurent.addEventListener("click", curentCity);
