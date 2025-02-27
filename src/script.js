const apiKey = "YOUR_API_KEY"; // Your API key Visual Crossing

let currentWeatherData = null;

document.getElementById("weatherForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = document.getElementById("locationInput").value.trim();
    if (!location) return;

    document.getElementById("loading").style.display = "block";
    document.getElementById("weatherDisplay").innerHTML = "";

    try {
        const weatherData = await getWeather(location);
        currentWeatherData = weatherData;
        displayWeather();
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
        temperatureF: (data.currentConditions.temp * 9 / 5) + 32,
        condition: data.currentConditions.conditions
    };
}

function displayWeather() {
    if (!currentWeatherData) return;

    const unitToggle = document.getElementById("unitToggle");
    const temperature = unitToggle.checked
        ? `${currentWeatherData.temperatureF.toFixed(1)} °F`
        : `${currentWeatherData.temperatureC.toFixed(1)} °C`;

    document.getElementById("weatherDisplay").innerHTML = `
        <h2>${currentWeatherData.location}</h2>
        <p class="temp">${temperature}</p>
        <div class="weather-info">
            <img src="../img/${getWeatherIcon(currentWeatherData.condition)}" alt="${currentWeatherData.condition}">
            <p>${currentWeatherData.condition}</p>
        </div>
    `;

    changeBackground(currentWeatherData.condition);
}

document.getElementById("unitToggle").addEventListener("change", displayWeather);

function getWeatherIcon(condition) {
    if (condition.includes("Sunny") || condition.includes("Clear")) return "sunny.png";
    if (condition.includes("Rain") || condition.includes("Showers")) return "rainy.png";
    if (condition.includes("Cloudy") || condition.includes("Partially cloudy") || condition.includes("Overcast")) return "cloudy.png";
    if (condition.includes("Thunderstorm")) return "storm.png";
    if (condition.includes("Snow")) return "snowy.png";
    return "unknown.png";
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