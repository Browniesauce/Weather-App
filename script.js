const apiKey = "{Your_Api_Key}"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const SearchBox = document.querySelector(".search input");
const SearchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".Weather-Icon");

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();

    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        WeatherIcon.src = "src/images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        WeatherIcon.src = "src/images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        WeatherIcon.src = "src/images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        WeatherIcon.src = "src/images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        WeatherIcon.src = "src/images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }   
}


SearchBtn.addEventListener("click" , () => {
    checkWeather(SearchBox.value);
});

SearchBox.addEventListener("keypress" , function(event) {
    if (event.key === "Enter"){
        event.preventDefault();
        checkWeather(SearchBox.value);
    }
});
