'use strict'

let apiKey = '2679a1068897e9be48c436e6054fa94a';


window.onload = function() {
    let weatherCheckbox = document.getElementById('checkbox-weather');
    let attractionsCheckbox = document.getElementById('checkbox-attractions');
    let filter = document.getElementById('filter');

    let searchButton = document.getElementById('search-button');  
    

    if (searchButton.onclick = function() {
        if (weatherCheckbox.checked == true) {
            if (attractionsCheckbox.checked == true) {
                alert('ERROR');
            }
            else {
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
            weatherVisible();
            attractionsVisible();
        }

        let input = document.getElementById('city-search').value;
        document.getElementById('city-name').innerHTML = input;
        let weatherURL = 'api.openweathermap.org/data/2.5/weather?id=' + input + '&appid=' + apiKey;
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

function printWeather(data) {
    
}