
// This Day __________________
const searchLocationInput = document.getElementById('searchLocation');
const firstDay = document.getElementById('firstDay');
const dayNumber = document.getElementById('dayNumber');
const monthName = document.getElementById('monthName');
const theCity = document.getElementById('theCity');
const theTemp = document.getElementById('theTemp');
const theIcon = document.getElementById('theIcon');
const weatherCondition = document.getElementById('weatherCondition');
const theHumidity = document.getElementById('theHumidity');
const windKph = document.getElementById('windKph');
const windDirectionSpeed = document.getElementById('windSpeed');
// tomorrow ___________________
const theNextDay =document.getElementById('nextDay');
const theNextMxTemp = document.getElementById('secDayMxTemp');
const secDayIcon = document.getElementById('secDayIcon');
const secDayMinTemp = document.getElementById('secDayMinTemp');
const secDayText = document.getElementById('secDayText');
// After Tomorrow _____________
const theAfterNextDay =document.getElementById('therdDay');
const theAfterNextMxTemp = document.getElementById('therdDayMxTemp');
const therdDayIcon = document.getElementById('therdDayIcon');
const therdDayMinTemp = document.getElementById('therdDayMinTemp');
const therdDayText = document.getElementById('therdDayText');




// get curent position of user
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;
        // console.log(lat , long);
        grtWeatherData(`${lat} , ${long}`)
    }
    );
};

async function grtWeatherData(quary) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${quary}&days=3&key=59bb2b3f085f496abd111027241506`)
    let data = await response.json();
    console.log(data);
    todayWeather(data);
    tomorrowWeather(data);
    afterTomorrowWeather(data);
};

searchLocationInput.addEventListener('input', function (e) {
    let quary = e.target.value;
    grtWeatherData(quary)
});

function todayWeather(data) {
    let todayDate = data.forecast.forecastday[0].date
    let date = new Date(todayDate);
    let FirstDayName = date.toLocaleString('en-US', { weekday: 'long' });
    firstDay.innerHTML = FirstDayName;
    // console.log(FirstDayName);
    let FirstDayNum = date.getDate();
    dayNumber.innerHTML = FirstDayNum;
    let month = date.toLocaleString('en-US', { month: 'long' });
    monthName.innerHTML = month;
    let city = data.location.name;
    theCity.innerHTML = city;
    let temp = data.current.temp_c;
    theTemp.innerHTML = temp + '°C';
    let iconImg = data.current.condition.icon;
    theIcon.src = `https:${iconImg}`
    let condition = data.current.condition.text;
    weatherCondition.innerHTML = condition;
    let humidity = data.current.humidity;
    theHumidity.innerHTML = humidity + '%';
    let wind = data.current.wind_kph;
    windKph.innerHTML = wind + 'Kph';
    let windDirection = data.current.wind_dir;
    windDirectionSpeed.innerHTML = windDirection;
};
// _________________________________________________________________________

function tomorrowWeather(data){
    let tomorrowDate = data.forecast.forecastday[1].date
    let date = new Date(tomorrowDate);
    let SecondDayName = date.toLocaleString('en-US', { weekday: 'long' });
    theNextDay.innerHTML = SecondDayName;
    let SecondDayIcon = data.forecast.forecastday[1].day.condition.icon ;
    secDayIcon.src = `https:${SecondDayIcon}`;
    let SecondDayMaxTemp = data.forecast.forecastday[1].day.maxtemp_c ;
    theNextMxTemp.innerHTML = SecondDayMaxTemp + '°C';
    let SecondDayMinTemp = data.forecast.forecastday[1].day.mintemp_c ;
    secDayMinTemp.innerHTML = SecondDayMinTemp + '°C';
    let SecondDayText = data.forecast.forecastday[1].day.condition.text ;
    secDayText.innerHTML = SecondDayText ;
};
// _________________________________________________________________________

function afterTomorrowWeather(data){
    let afterTomorrowDate = data.forecast.forecastday[2].date
    let date = new Date(afterTomorrowDate);
    let ThirdDayName = date.toLocaleString('en-US', { weekday: 'long' });
    theAfterNextDay.innerHTML = ThirdDayName;
    let ThirdDayIcon = data.forecast.forecastday[2].day.condition.icon ;
    therdDayIcon.src = `https:${ThirdDayIcon}`;
    let ThirdDayMaxTemp = data.forecast.forecastday[2].day.maxtemp_c ;
    theAfterNextMxTemp.innerHTML = ThirdDayMaxTemp + '°C';
    let ThirdDayMinTemp = data.forecast.forecastday[2].day.mintemp_c ;
    therdDayMinTemp.innerHTML = ThirdDayMinTemp + '°C';
    let ThirdDayText = data.forecast.forecastday[2].day.condition.text ;
    therdDayText.innerHTML = ThirdDayText ;
};