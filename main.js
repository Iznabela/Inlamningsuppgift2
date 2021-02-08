'use strict'

window.onload = function() {
    let weatherCheckbox = document.getElementById('checkbox-weather');
    let attractionsCheckbox = document.getElementById('checkbox-attractions');
    let filter = document.getElementById('filter');

    let searchButton = document.getElementById('search-button');  
    let cityName = document.getElementById('city-name');
    let input = document.getElementById('city-search');
    

    if (searchButton.onclick = function() {
        cityName.innerHTML = input.value;
        let city = input.value;
        if (weatherCheckbox.checked == true) {
            if (attractionsCheckbox.checked == true) {
                alert('ERROR');
            }
            else {
                getWeather(city);
                weatherVisible();
                attractionsHidden();
            }
        }
        else if (attractionsCheckbox.checked == true) {
            if (weatherCheckbox.checked == true) {
                alert('ERROR');
            }
            else {
                attractionsVisible();
                weatherHidden();
            }
        }
        else {
            getWeather(city);
            weatherVisible();
            attractionsVisible();
        }
    });
}

function weatherVisible() {
    let weather = document.getElementById('weather');
    weather.style.visibility = 'visible';
}

function weatherHidden() {
    let weather = document.getElementById('weather');
    weather.style.visibility = 'hidden';
}

function attractionsVisible() {
    let attractionsTitle = document.getElementById('attractions-title');
    let attractionBoxes = document.querySelectorAll('.attraction-box');

    attractionsTitle.style.visibility = 'visible';
    attractionBoxes.forEach(element => {
        element.style.visibility = 'visible';
    });
}

function attractionsHidden() {
    let attractionsTitle = document.getElementById('attractions-title');
    let attractionBoxes = document.querySelectorAll('.attraction-box');

    attractionsTitle.style.visibility = 'hidden';
    attractionBoxes.forEach(element => {
        element.style.visibility = 'hidden';
    });
}

function getWeather(cityName) {
    let apiKey = '2679a1068897e9be48c436e6054fa94a';
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+apiKey+'')
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        printWeather(data);
    })
    .catch(function() {

    });
}

function printWeather(data) {
    let cityName = document.getElementById('city-name');
    let weekday = document.getElementById('weekday');
    let temp = document.getElementById('temp');
    let condition = document.getElementById('condition');

    let day = new Date();
    let weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    // convert farenheit to celcius
    let celsius = Math.round(parseFloat(data.main.temp)-273.15);

    cityName.innerHTML = data.name;
    weekday.innerHTML = weekdays[day.getDay()];
    temp.innerHTML = celsius + '&deg;';
    condition.innerHTML = data.weather[0].description;
}