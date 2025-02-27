const apiKey = "T5BUYQ9GK65XWCEV365P2KTAD"; // Replace with your Visual Crossing API key

document.getElementById("weatherForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = document.getElementById("locationInput").value;
    if (location.trim() === "") return;

    document.getElementById("loading").style.display = "block";
    document.getElementById("weatherDisplay").innerHTML = "";

    try {
        const weatherData = await getWeather(location);
        displayWeather(weatherData);
    } catch (error) {
        document.getElementById("weatherDisplay").innerHTML = "<p>Failed to fetch weather data.</p>";
    } finally {
        document.getElementById("loading").style.display = "none";
    }
});

async function getWeather(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return {
        location: data.resolvedAddress,
        temperatureC: data.currentConditions.temp,
        temperatureF: (data.currentConditions.temp * 9/5) + 32,
        condition: data.currentConditions.conditions,
        icon: data.currentConditions.icon
    };
}

function displayWeather(weather) {
    const unitToggle = document.getElementById("unitToggle");
    const temperature = unitToggle.checked ? `${weather.temperatureF.toFixed(1)} °F` : `${weather.temperatureC.toFixed(1)} °C`;

    document.getElementById("weatherDisplay").innerHTML = `
        <h2>${weather.location}</h2>
        <p>${temperature}</p>
        <p>${weather.condition}</p>
        <img src="https://www.visualcrossing.com/img/icons/${weather.icon}.png" alt="${weather.condition}">
    `;

    changeBackground(weather.condition);
}

document.getElementById("unitToggle").addEventListener("change", () => {
    const weatherDisplay = document.getElementById("weatherDisplay");
    if (weatherDisplay.innerHTML.trim() !== "") {
        displayWeather(getCurrentWeatherData());
    }
});

function getCurrentWeatherData() {
    const weatherDisplay = document.getElementById("weatherDisplay");
    return {
        location: weatherDisplay.querySelector("h2").innerText,
        temperatureC: parseFloat(weatherDisplay.querySelector("p").innerText),
        temperatureF: parseFloat(weatherDisplay.querySelector("p").innerText) * 9/5 + 32,
        condition: weatherDisplay.querySelectorAll("p")[1].innerText,
        icon: weatherDisplay.querySelector("img").src.split("/").pop()
    };
}

function changeBackground(condition) {
    let bgColor;
    if (condition.includes("Clear")) bgColor = "linear-gradient(to right, #FFD700, #FF4500)";
    else if (condition.includes("Cloudy")) bgColor = "linear-gradient(to right, #B0C4DE, #708090)";
    else if (condition.includes("Rain")) bgColor = "linear-gradient(to right, #4682B4, #1E90FF)";
    else if (condition.includes("Snow")) bgColor = "linear-gradient(to right, #E0FFFF, #ADD8E6)";
    else bgColor = "linear-gradient(to right, #87CEFA, #4682B4)";

    document.body.style.background = bgColor;
}
