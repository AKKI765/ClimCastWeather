console.log("JavaScript Running")


const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const apiURLforecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&";
const apiKey = "9ee4423723f36bcdd8de6e1de1c733ec";

let citySearch = document.querySelector(".searchCity input")
let searchButton = document.querySelector(".searchCity button")
document.querySelector(".cityName").innerHTML = '';

let weatherImage = document.querySelector(".condition");




async function weatherDetail(cityName) {


    const weatherD = await fetch(apiURL + `q=${cityName}` + `&appid=${apiKey}`);
    let data = await weatherD.json();

    console.log(data);

    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".cityName").innerHTML = data.name + "  , " + data.sys.country;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".humid").innerHTML = data.main.humidity + " %";
    document.querySelector(".speed").innerHTML = data.wind.speed + " Km/h";


    if (data.weather[0].main == 'Clear') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        
    }

    else if (data.weather[0].main == 'Clouds') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Rain') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Drizzle') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Snow') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Thunderstorm') {
        weatherImage.src =`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Mist') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Smoke') {
        weatherImage.src =`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Haze') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Dust') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Fog') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Sand') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Ash') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Squall') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else if (data.weather[0].main == 'Tornado') {
        weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    else {
        weatherImage.src = 'images/weather.png'
    }


}


searchButton.addEventListener("click", () => {

    weatherDetail(citySearch.value);

})



citySearch.addEventListener("keypress", function(event) {
    
    if (event.key === "Enter") {
      
      event.preventDefault();

      weatherDetail(citySearch.value);
      
    }
  });




  

const weatherContainer = document.getElementById('weather-container');


async function fetchWeatherData(cityName) {

    const response = await fetch(apiURLforecast + `q=${cityName}` + `&appid=${apiKey}`);
    if (!response.ok) {
        throw new Error('City not found');
    }
    const data = await response.json();
    return data.list;
}

function createWeatherCard(weatherData) {
    const card = document.createElement('div');
    card.classList.add('weather-card');

    const time = new Date(weatherData.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = time;
    card.appendChild(cardTitle);

    const cardImage = document.createElement('img');
    cardImage.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    card.appendChild(cardImage);

    const temp = document.createElement('p');
    temp.textContent = `${Math.round(weatherData.main.temp)} °C`;
    card.appendChild(temp);

    const description = document.createElement('p');
    description.textContent = weatherData.weather[0].description;
    card.appendChild(description);

    return card;
}

function groupByDay(weatherData) {
    const days = {};

    weatherData.forEach(data => {
        const date = new Date(data.dt_txt).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });

        if (!days[date]) {
            days[date] = [];
        }

        days[date].push(data);
    });

    return Object.entries(days);
}

async function updateWeather(cityName) {
    weatherContainer.innerHTML = '';

    try {
        const weatherData = await fetchWeatherData(cityName);
        const days = groupByDay(weatherData);

        days.slice(0, 5).forEach(([date, dayData]) => { 
            const dayGroup = document.createElement('div');
            dayGroup.classList.add('day-group');

            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-header');
            dayHeader.textContent = date;
            dayGroup.appendChild(dayHeader);

            dayData.forEach(data => {
                const card = createWeatherCard(data);
                dayGroup.appendChild(card);
            });

            weatherContainer.appendChild(dayGroup);
        });
    } catch (error) {
        weatherContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

searchButton.addEventListener('click', () => {
    const cityName = citySearch.value.trim();
    if (cityName) {
        updateWeather(cityName);
    }
});

citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});





document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const closeBtn = document.getElementById("closeBtn");

    menuBtn.addEventListener("click", function() {
        navMenu.classList.add("active");
    });

    closeBtn.addEventListener("click", function() {
        navMenu.classList.remove("active");
    });

    
    document.addEventListener("click", function(event) {
        if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
            navMenu.classList.remove("active");
        }
    });
});





