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
    const attractionsTitle = document.getElementById('title-container');
    const attractions = document.getElementById('attractions');

    attractionsTitle.style.display = 'inline';
    attractions.style.display = 'grid';
}

function attractionsHidden() {
    const attractionsTitle = document.getElementById('title-container');
    const attractions = document.getElementById('attractions');

    attractionsTitle.style.display = 'none';
    attractions.style.display = 'none';
}

function getAttractions(cityName) {
    const clientId = 'UYOWJJN4WOZ5ZIY1QRZHEICMBEYBOCPY32WTFIXLORHA5SOV';
    const clientSecret = 'XUX5YLKCVFZMECQSNNYGM0R1K5R1CPCIRGJXT1XBHWOC4FOR';

    /* i fetchen så skickas en förfrågan till api-urlen - får tillbaka ett svar i form av ett objekt (respons) 
    - sen konverterar det objektet till ett json objekt - attractionData = json objektet */
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
        let newBox = document.createElement('div');
        newBox.className = 'attraction-box';
        if (i < 1) {
            newBox.style.gridColumnStart = 3;
            newBox.style.gridColumnEnd = 4;
            newBox.style.gridRowStart = 0;
            newBox.style.gridRowEnd = 1;
        }
        else if (i > 0 && i < 4) {
            newBox.style.gridColumnStart = i + 1;
            newBox.style.gridColumnEnd = i + 2;
            newBox.style.gridRowStart = 1;
            newBox.style.gridRowEnd = 2;
        }
        else if (i > 3 && i < 7) {
            newBox.style.gridColumnStart = i - 2;
            newBox.style.gridColumnEnd = i - 1;
            newBox.style.gridRowStart = 2;
            newBox.style.gridRowEnd = 3;
        }
        else {
            newBox.style.gridColumnStart = i - 5;
            newBox.style.gridColumnEnd = i - 4;
            newBox.style.gridRowStart = 3;
            newBox.style.gridRowEnd = 4;
        }


        let newH3 = document.createElement('h3');
        newH3.id = 'attbox' + i + '-title';
        newH3.innerHTML = attractionData.response.groups[0].items[i].venue.name;
        newBox.appendChild(newH3);

        let newP = document.createElement('p');
        newP.id = 'attbox' + i + '-adress';
        newP.innerHTML = attractionData.response.groups[0].items[i].venue.location.address;
        newBox.appendChild(newP);

        let newImg = document.createElement('img');
        newImg.id = 'attbox' + i + '-icon';
        newImg.src = attractionData.response.groups[0].items[i].venue.categories[0].icon.prefix + "88.png";
        newBox.appendChild(newImg);

        document.getElementById('attractions').appendChild(newBox);
    }
}
