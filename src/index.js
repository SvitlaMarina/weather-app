function ucFirst(str) {
    if (str.length > 0) {
        let newStr = str[0].toUpperCase() + str.slice(1);
        return newStr;
    }
    else return "";
   
}
let temperatureBasic = {
    celsius: 15,
    fahrenheit:59
}

function showWeather(response) {
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    temperatureBasic.celsius = temperature;
    temperatureBasic.fahrenheit = Math.round(temperature * 1.8 + 32);
    console.log(temperatureBasic.fahrenheit);
    chngeUnitsC();
    let clouds = document.querySelector("#clouds");
    clouds.innerHTML = ucFirst(response.data.weather[0].description);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`; 
    let wind = document.querySelector("#wind");
    wind.innerHTML =`Wind: ${response.data.wind.speed}m/s`;

  
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
  "Saturday"
];
    let now = new Date();
    let dayOftheWeek = document.querySelector("#dayOftheWeek");
    dayOftheWeek.innerHTML = days[now.getDay()];    
    let date = document.querySelector("#corentDate");
    let curentDate = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
    date.innerHTML = curentDate;
    let time = document.querySelector("#curentTime");
    let minutes;
    if (now.getMinutes() < 10) minutes = `0${now.getMinutes()}`;
    else minutes = now.getMinutes();
    time.innerHTML = `${now.getHours()}:${minutes}`;
}


function chngeUnitsC() {
   
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = temperatureBasic.celsius;
    let fahrenheit = document.querySelector("#fahrenheit-link");
        fahrenheit.classList.remove("selectUnit");
        let celsius = document.querySelector("#celsius-link");
        celsius.classList.add("selectUnit");
    
}
function chngeUnitsF() {
   
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = temperatureBasic.fahrenheit;
    let fahrenheit = document.querySelector("#fahrenheit-link");
    fahrenheit.classList.add("selectUnit");
    let celsius = document.querySelector("#celsius-link");
    celsius.classList.remove("selectUnit");
    
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
  console.log(lat);
  console.log(lon);
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherApi).then(showWeather);
}

function curentCity(){
    navigator.geolocation.getCurrentPosition(handlePosition);
}






curentDate();
let btnCity = document.querySelector("#city-form");
btnCity.addEventListener("submit", changeCity);

let btnCurent = document.querySelector("#enterCurentCity");
btnCurent.addEventListener("click", curentCity);

let unitLinkC = document.querySelector("#celsius-link");
unitLinkC.addEventListener('click', chngeUnitsC);
let unitLinkf = document.querySelector("#fahrenheit-link");
unitLinkf.addEventListener("click", chngeUnitsF);


