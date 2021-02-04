'use strict'


function showInfo() {
    let weatherCheckbox = document.getElementById('checkbox-weather');
    let attractionsCheckbox = document.getElementById('checkbox-attractions');
    let filter = document.getElementById('filter');
    let searchButton = document.getElementById('search-button');

    if (weatherCheckbox.checked == true) {
        document.getElementById('weather').style.visibility = 'visible';
    }
    else {
        document.getElementById('weather').style.visibility = 'hidden';
    }
    
    if (attractionsCheckbox.checked == true) {
        document.getElementById('attractions-title').style.visibility = 'visible';
        const attractionBoxes = document.querySelectorAll('.attraction-box');
    
        attractionBoxes.forEach(element => {
        element.style.visibility = 'visible';
        })
    }
    else {
        document.getElementById('attractions-title').style.visibility = 'hidden';
        const attractionBoxes = document.querySelectorAll('.attraction-box');
    
        attractionBoxes.forEach(element => {
        element.style.visibility = 'hidden';
        })
    }
    

    
    

}