'use strict'

window.onload = function () {
    const weatherCheckbox = document.getElementById('checkbox-weather');
    const attractionsCheckbox = document.getElementById('checkbox-attractions');
    const filter = document.getElementById('filter');

    const searchButton = document.getElementById('search-button');
    const cityName = document.getElementById('city-name');
    const input = document.getElementById('city-search');


    if (searchButton.onclick = function () {
        cityName.innerHTML = input.value;
        let city = input.value;
        if (weatherCheckbox.checked == true) {
            if (attractionsCheckbox.checked == true) {
                alert('ERROR');
            }
            else {
                cityName.style.display = 'block';
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
                cityName.style.display = 'block';
                attractionsVisible();
                weatherHidden();
            }
        }
        else {
            cityName.style.display = 'block';
            getWeather(city);
            getAttractions(city);
            weatherVisible();
            attractionsVisible();
        }
    });
}

function weatherVisible() {
    const weather = document.getElementById('weather');
    weather.style.display = 'block';
}

function weatherHidden() {
    const weather = document.getElementById('weather');
    weather.style.display = 'none';
}

function getWeather(cityName) {
    const apiKey = '2679a1068897e9be48c436e6054fa94a';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey + '')
        .then(function (response) { return response.json() })
        .then(function (weatherData) {
            console.log(weatherData);
            printWeather(weatherData);
        })
        .catch(function () {

        });
}

function printWeather(weatherData) {
    const cityName = document.getElementById('city-name');
    const weekday = document.getElementById('weekday');
    const temp = document.getElementById('temp');
    const condition = document.getElementById('condition');

    const day = new Date();
    const weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    // convert farenheit to celcius
    const celsius = Math.round(parseFloat(weatherData.main.temp) - 273.15);

    cityName.innerHTML = weatherData.name;
    weekday.innerHTML = weekdays[day.getDay()];
    temp.innerHTML = celsius + '&deg;';
    condition.innerHTML = weatherData.weather[0].description;
    let icon = weatherData.weather[0].icon;
    document.getElementById('cond-img').src = 'http://openweathermap.org/img/wn/' + icon + "@2x.png";
}

function attractionsVisible() {
    const attractionsTitle = document.getElementById('attractions-title');
    const attractions = document.querySelector('.attractions');

    attractionsTitle.style.display = 'block';
    attractions.style.display = 'grid';
}

function attractionsHidden() {
    const attractionsTitle = document.getElementById('attractions-title');
    const attractions = document.getElementById('attractions');

    attractionsTitle.style.display = 'none';
    attractions.style.display = 'none';
}

function getAttractions(cityName) {
    const clientId = 'UYOWJJN4WOZ5ZIY1QRZHEICMBEYBOCPY32WTFIXLORHA5SOV';
    const clientSecret = 'XUX5YLKCVFZMECQSNNYGM0R1K5R1CPCIRGJXT1XBHWOC4FOR';

    /* i fetchen så skickas en förfrågan till api-urlen - får tillbaka ett svar i form av ett objekt (respons) 
    - sen konverterar det objektet till ett json objekt - attractionData = json objektet */
    //const new URL("")
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + clientId + '&client_secret=' + clientSecret + '&near=' + cityName + '&limit=10&v=20210209')
        .then(function (response) { return response.json() })
        .then(function (attractionData) {
            printAttractions(attractionData);
            console.log(attractionData);
        })
        .catch(function () {

        });
}

function printAttractions(attractionData) {
    let i;
    for (i = 0; i < 10; i++) {
        let box = document.getElementById('attbox' + i);
        if (i < 1) {
            box.style.gridColumnStart = 3;
            box.style.gridColumnEnd = 4;
            box.style.gridRowStart = 0;
            box.style.gridRowEnd = 1;
        }
        else if (i > 0 && i < 4) {
            box.style.gridColumnStart = i + 1;
            box.style.gridColumnEnd = i + 2;
            box.style.gridRowStart = 1;
            box.style.gridRowEnd = 2;
        }
        else if (i > 3 && i < 7) {
            box.style.gridColumnStart = i - 2;
            box.style.gridColumnEnd = i - 1;
            box.style.gridRowStart = 2;
            box.style.gridRowEnd = 3;
        }
        else {
            box.style.gridColumnStart = i - 5;
            box.style.gridColumnEnd = i - 4;
            box.style.gridRowStart = 3;
            box.style.gridRowEnd = 4;
        }


        let h3 = document.getElementById('attbox' + i + '-title');
        h3.innerHTML = attractionData.response.groups[0].items[i].venue.name;
        box.appendChild(h3);

        let p = document.getElementById('attbox' + i + '-adress');
        p.innerHTML = attractionData.response.groups[0].items[i].venue.location.address;
        box.appendChild(p);

        let img = document.getElementById('attbox' + i + '-icon');
        img.src = attractionData.response.groups[0].items[i].venue.categories[0].icon.prefix + "88.png";
        box.appendChild(img);

        document.querySelector('.attractions').appendChild(box);
    }
}

function sortAttractions() {

}
