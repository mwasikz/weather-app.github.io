window.addEventListener('load', () => {
    let longitude;
    let latitude;

    let temperatureDescription = document.querySelector('.temperatureDescription');
    let temperatureDegree = document.querySelector('.temperatureDegree');
    let locationTimezone = document.querySelector('.locationTimezone');
    let weatherIcon = document.querySelector('.weatherIcon');
    let windSpeedInfo = document.querySelector('.windSpeedInfo');
    let humidityInfo = document.querySelector('.humidityInfo');
    let sunriseInfo = document.querySelector('.sunriseInfo');
    let sunsetInfo = document.querySelector('.sunsetInfo');




    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            apiKey = '0b3503e3d2c3fadb2820a171701c1963';
            const proxy = "https://cors-anywhere.herokuapp.com/"

            const apiCall = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(apiCall)
                .then(response => {
                    return response.json();

                })
                .then(data => {
                    console.log(data);
                    const { temp, humidity } = data.main;
                    const { country, sunrise, sunset } = data.sys;
                    const { icon, description } = data.weather[0];
                    const { speed } = data.wind;


                    const sunriseTime = new Date(sunrise * 1000);
                    const sunriseHour = sunriseTime.getHours();
                    const sunriseMinute = sunriseTime.getMinutes();


                    const formattedSunriseTime = `${sunriseHour} : ${sunriseMinute} AM`;


                    const sunsetTime = new Date(sunset * 1000);
                    const sunsetHour = sunsetTime.getHours();
                    const sunsetMinute = sunriseTime.getMinutes();


                    const formattedSunetTime = `${sunsetHour} : ${sunsetMinute} PM`;


                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimezone.innerHTML = `<img src="icons/flags/${country}.png"> ${data.name}`;


                    weatherIcon.innerHTML = `<img src="icons/${icon}.svg" height="200px" width="200px">`;
                    windSpeedInfo.textContent = `${speed} mph`;
                    humidityInfo.textContent = `${humidity} %`;
                    sunriseInfo.textContent = `Sunrise ${formattedSunriseTime}`;
                    sunsetInfo.textContent = `Sunset ${formattedSunetTime}`;




                })


        });

    }
    else {
        h1.textContent = "Please allow location service"
    }


});


