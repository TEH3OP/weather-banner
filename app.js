"use strict"



let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let windSpeed = document.getElementById("wind");
let temperature = document.getElementById("temperature");
let image = document.getElementById("image");
let sky_state = document.getElementById("sky-state");
let time_of_update = document.getElementById("time-of-update");
let city = document.getElementById("city");
// console.log(humidity);
let selectCity = document.getElementById("city-selector");

function updateData() {
    let cityId = selectCity.value;
    console.log(cityId);
    humidity.innerHTML = "---";
    pressure.innerHTML = "---";
    wind.innerHTML = "---";
    temperature.innerHTML = "---";
    sky_state.innerHTML = "---";
    city.innerHTML = "---";

    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
        .then(receivedData => receivedData.json())
        .then(jsonData => {
            humidity.innerHTML = `Humidity: ${jsonData.main.humidity}%`;
            pressure.innerHTML = `Pressure: ${jsonData.main.pressure}hPa`;
            wind.innerHTML = `Wind speed: ${jsonData.wind.speed}m/s`;
            let iconId = jsonData.weather[0].icon;
            let iconAddress = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
            image.setAttribute("src", iconAddress);

            temperature.innerHTML = `${jsonData.main.temp}°C`;
            sky_state.innerHTML = jsonData.weather[0].main;
            time_of_update.innerHTML = formatterDateTime.format(Date.now());
            city.innerHTML = jsonData.name;
        }).catch((e) => {
            city.innerHTML = "Load error";
        });
}

function autoUpdateTime() {
    setTimeout(autoUpdateTime, 60000);
    updateTime();
}


let dateHtml = document.getElementById("date");
let formatterDate = new Intl.DateTimeFormat("en-UK", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
});

let timeHtml = document.getElementById("time");
let formatterTime = new Intl.DateTimeFormat("en-UK", {
    hour: "2-digit",
    minute: "2-digit"
});

let formatterDateTime = new Intl.DateTimeFormat("en-UK", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
});


function updateTime() {
    dateHtml.innerHTML = formatterDate.format(Date.now());
    timeHtml.innerHTML = formatterTime.format(Date.now());
}

let button = document.getElementById("button-update");
button.addEventListener("click", updateData);
selectCity.addEventListener("change", updateData);

updateTime();
updateData();
autoUpdateTime();



// do{
//     setTimeout()
// }while(1);