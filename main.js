'use strict'

window.onload = function () {
    const searchButton = document.getElementById('search-button');

    if (searchButton.onclick = function () {
        const cityInput = document.getElementById('city-search').value;
        document.getElementById('city-name').style.display = 'none';
        document.getElementById('error-msg').innerText = '';
        clearAttractions();
        weatherHidden();
        attractionsHidden();

        getWeather(cityInput);
        getAttractions(cityInput);
    });
}

// WEATHER
function getWeather(cityInput) {
    const apiKey = '2679a1068897e9be48c436e6054fa94a';

    /* i fetchen så skickas en förfrågan till ett API med hjälp av en URL med specifika paramentrar (nycklar och userinput)
        - om allt går som det ska skickas ett svar tillbaka (response) som sedan konverteras från 
        en lång sträng till ett javascript objekt (JSON) och returneras till function-parametern 
        i den sista "then" där vi då kan använda oss av datan vi vill komma åt */
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=' + apiKey + '')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else if (response.status === 400 || response.status === 404) {
                document.getElementById('error-msg').innerText = 'Could not find "' + cityInput + '", did you spell it right?';
            }
            else if (response.status === 500) {
                document.getElementById('error-msg').innerText = 'Could not reach API - internal server error.';
            }
            else {
                document.getElementById('error-msg').innerText = 'Something went wrong... [Error code: ' + response.status + ']';
            }
        })
        .then(function (weatherData) {
            printWeather(weatherData);
            configureSearch();
        })
        .catch(function (error) {
            console.log(error.message);
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

function weatherVisible() {
    const weather = document.getElementById('weather');
    weather.style.display = 'block';
}

function weatherHidden() {
    const weather = document.getElementById('weather');
    weather.style.display = 'none';
}



// ATTRACTIONS
function clearAttractions() {
    for (let i = 0; i < 10; i++) {
        document.getElementById('attbox' + i + '-title').innerHTML = "";
        document.getElementById('attbox' + i + '-adress').innerHTML = "";
        document.getElementById('attbox' + i + '-icon').src = "";
    }
}

function getAttractions(cityInput) {
    const clientId = 'UYOWJJN4WOZ5ZIY1QRZHEICMBEYBOCPY32WTFIXLORHA5SOV';
    const clientSecret = 'XUX5YLKCVFZMECQSNNYGM0R1K5R1CPCIRGJXT1XBHWOC4FOR';

    /* i fetchen så skickas en förfrågan till ett API med hjälp av en URL med specifika paramentrar 
        - om allt går som det ska skickas ett svar tillbaka (response) som sedan konverteras från 
        en lång sträng till ett javascript objekt (JSON) och returneras till function-parametern 
        i den sista "then" där vi då kan använda oss av datan vi vill komma åt */
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + clientId + '&client_secret=' + clientSecret + '&near=' + cityInput + '&limit=10&v=20210209')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else if (response.status === 400 || response.status === 404) {
                document.getElementById('error-msg').innerText = 'Could not find "' + cityInput + '", did you spell it right?';
            }
            else if (response.status === 500) {
                document.getElementById('error-msg').innerText = 'Could not reach API - internal server error.';
            }
            else {
                document.getElementById('error-msg').innerText = 'Something went wrong... Please try again later! [Error code: ' + response.status + ']';
            }
        })
        .then(function (attractionData) {
            printAttractions(attractionData);
            configureSearch();
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

function printAttractions(attractionData) {
    const filter = document.getElementById('filter');

    // get items array and the length of it
    const items = attractionData.response.groups[0].items;
    const venues = [];

    items.forEach(createVenueArray);
    function createVenueArray(item) {
        let venue = item.venue;
        venues.push(venue);
    }

    const length = venues.length;

    console.log(venues);

    if (filter.checked) {
        venues.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        })
    }

    //itemsCopy.sort(sortOn(this.venue.name));
    //console.log(itemsCopy.venue.name);

    // printing the venues info to boxes and placing them in the grid
    for (let i = 0; i < length; i++) {
        let box = document.getElementById('attbox' + i);
        box.style.display = 'grid';
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
        h3.innerHTML = venues[i].name;

        let p = document.getElementById('attbox' + i + '-adress');
        p.innerHTML = venues[i].location.address;
        if (p.innerHTML == 'undefined') {
            p.innerHTML = 'Unknown address';
        }

        let img = document.getElementById('attbox' + i + '-icon');
        img.src = venues[i].categories[0].icon.prefix + "88.png";
    }
}

function attractionsVisible() {
    const attractionsTitle = document.getElementById('attractions-title');
    const attractions = document.getElementById('attractions');

    attractionsTitle.style.display = 'block';
    attractions.style.display = 'grid';
}

function attractionsHidden() {
    document.getElementById('attractions-title').style.display = 'none';
    document.getElementById('attractions').style.display = 'none';

    // hide all attraction boxes
    for (let i = 0; i < 10; i++) {
        document.getElementById('attbox' + i).style.display = 'none';
    }
}

function configureSearch() {
    const weatherCheckbox = document.getElementById('checkbox-weather');
    const attractionsCheckbox = document.getElementById('checkbox-attractions');
    const filter = document.getElementById('filter');
    const input = document.getElementById('city-search').value;
    const errorMsg = document.getElementById('error-msg');
    if (weatherCheckbox.checked == true) {
        if (attractionsCheckbox.checked == true) {
            errorMsg.innerText = 'Please choose "Only Weather" or "Only Attractions" to show only one!';
            weatherHidden();
            attractionsHidden();
        }
        else if (filter.checked == true) {
            errorMsg.innerText = 'Weather is not sortable, please choose attractions or both!';
        }
        else {
            document.getElementById('city-name').style.display = 'block';
            weatherVisible();
            attractionsHidden();
        }
    }
    else if (attractionsCheckbox.checked == true) {
        document.getElementById('city-name').style.display = 'block';
        attractionsVisible();
        weatherHidden();
    }
    else {
        document.getElementById('city-name').innerHTML = input;
        document.getElementById('city-name').style.display = 'block';
        weatherVisible();
        attractionsVisible();
    }

}














